package org.example.api.service;

import org.example.api.entity.Clocking;
import org.example.api.entity.DateUtil;
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

    public long getHoursPerWeekNumberForOneEmployee(int year, int weekNumber, Long id) {
        LocalDate firstDayOfWeek = DateUtil.getFirstDayOfWeekForYearAndWeekNumber(year, weekNumber);
        LocalDate lastDayOfWeek = firstDayOfWeek.plusDays(6);
        return getHoursPerWeekForOneEmployee(firstDayOfWeek, lastDayOfWeek, id);
    }

    public long getHoursPerDayForOneEmployee(LocalDate date,Long id) {
        LocalDate startDate = date.atStartOfDay().toLocalDate();
        long hours = sumHoursBetweenDatesForEmployee(startDate, startDate, id).toHours();
        return hours;
    }

    public long getOvertimePerDay(LocalDate date, Long id) {
        long hours = getHoursPerDayForOneEmployee(date, id);
        long overtimeDuration = hours - 7 ;
        if(overtimeDuration < 0) {
            overtimeDuration = 0;
        }
        return overtimeDuration;


    }

    public long getOvertimePerWeek(LocalDate date1, LocalDate date2, Long id) {
            long totalOvertime = 0;

            LocalDate currentDate = date1;
            while (!currentDate.isAfter(date2)) {
                long overtime = getOvertimePerDay(currentDate, id);
                totalOvertime += overtime;

                currentDate = currentDate.plusDays(1);
            }

            return totalOvertime;
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

    public List<WorkTime> getallWorkTime(LocalDate date1, LocalDate date2, Long id) {
        return workRepository.findByDateBetweenAndEmployeeId(date1,date2,id);
    }
}
