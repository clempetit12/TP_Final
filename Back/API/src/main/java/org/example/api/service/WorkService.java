package org.example.api.service;

import org.example.api.entity.Clocking;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.example.api.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class WorkService {

    @Autowired
    private WorkRepository workRepository;


    public long getHoursPerWeekForOneEmployee(LocalDate date1, LocalDate date2, Long id) {
       long hours =  sumHoursBetweenDatesForEmployee(date1,date2,id).toHours();
       return hours;
    }

    public long getHoursPerWeekNumberForOneEmployee(LocalDate date1, LocalDate date2, Long id) {
        long hours =sumHoursBetweenDatesForEmployee(date1,date2, id).toHours();
        return hours;
    }

    public long getHoursPerDayForOneEmployee(LocalDate date,Long id) {
        long hours =  workRepository.sumHoursBetweenDatesForEmployee(date, id).toHours();
        return hours;
    }

    public long getOvertimePerDay(LocalDate date,LocalTime clickIn, LocalTime clickOut, Long id) {
        long workDuration = Duration.between(clickIn,clickOut).toHours();
        long regularHoursDuration = getHoursPerDayForOneEmployee(date,id);
        long overtimeDuration = workDuration - regularHoursDuration;
        if(overtimeDuration < 0) {
            overtimeDuration = 0;
        }
        return overtimeDuration;


    }

    public long getOvertimePerWeek(LocalDate date1, LocalDate date2, Long id) {

        long totalWorkDuration = 0;
        LocalDate currentDay = date1;

        while (!currentDay.isAfter(date2)) {
            if (currentDay.getDayOfWeek() != DayOfWeek.SATURDAY && currentDay.getDayOfWeek() != DayOfWeek.SUNDAY) {
                totalWorkDuration += getHoursPerDayForOneEmployee(currentDay, id);
            }
            currentDay = currentDay.plusDays(1);
        }

        long regularHoursDuration = getHoursPerWeekForOneEmployee(date1,date2,id);
        long overtimeDuration = totalWorkDuration - regularHoursDuration;
        if (overtimeDuration < 0) {
            overtimeDuration = 0;
        }

        return overtimeDuration;
    }


    public WorkTime saveWorkTime(WorkTime workTime) {
       return workRepository.save(workTime);
    }

    public Duration sumHoursBetweenDatesForEmployee(LocalDate date1, LocalDate date2, Long id) {
        List<WorkTime> workTimes = workRepository.findByDateBetweenAndEmployeeId(date1, date2, id);

        Duration totalDuration = Duration.ZERO;

        for (WorkTime workTime : workTimes) {
            if (workTime.getClocking() == Clocking.IN) {
                WorkTime nextWorkTime = getNextWorkTime(workTimes, workTime);
                if (nextWorkTime != null && nextWorkTime.getClocking() == Clocking.OUT) {
                    Duration duration = Duration.between(workTime.getHour(), nextWorkTime.getHour());
                    totalDuration = totalDuration.plus(duration);
                }
            }
        }

        return totalDuration;
    }

    private WorkTime getNextWorkTime(List<WorkTime> workTimes, WorkTime currentWorkTime) {
        int currentIndex = workTimes.indexOf(currentWorkTime);
        if (currentIndex < workTimes.size() - 1) {
            return workTimes.get(currentIndex + 1);
        } else {
            return null;
        }
    }

}
