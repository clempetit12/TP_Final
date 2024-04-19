package org.example.api.service;

import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.example.api.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class WorkService {

    @Autowired
    private WorkRepository workRepository;


    public long getHoursPerWeekForOneEmployee(LocalDate date1, LocalDate date2, Long id) {
       long hours =  workRepository.getHoursWorkedBetweenDatesForEmployee(date1,date2,id).toHours();
       return hours;
    }

    public long getHoursPerWeekNumberForOneEmployee(LocalDate date1, LocalDate date2, Long id) {
        long hours = workRepository.getHoursWorkedBetweenDatesForEmployee(date1,date2, id).toHours();
        return hours;
    }

    public long getHoursPerDayForOneEmployee(LocalDate date,Long id) {
        long hours =  workRepository.getHoursWorkedForEmployeeOnDate(date, id).toHours();
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


    public void saveWorkTime(WorkTime workTime) {
        workRepository.save(workTime);
    }
}
