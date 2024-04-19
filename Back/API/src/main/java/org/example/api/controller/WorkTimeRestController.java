package org.example.api.controller;

import org.example.api.entity.Clocking;
import org.example.api.entity.DateUtil;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.example.api.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/workTime")
public class WorkTimeRestController {

    @Autowired
    private WorkService workService;


    @GetMapping("/hoursPerWeek/{id}")
public long getHourPerWeek(@PathVariable Long id, LocalDate date1, LocalDate date2) {
        return workService.getHoursPerWeekForOneEmployee(date1,date2,id);


    }

    @GetMapping("/hoursPerWeekNumber/{id}")
    public long getHourPerWeekNumber(@PathVariable Long id,int weekNumber) {
        LocalDate firstDayOfWeek = DateUtil.getFirstDayOfWeekForYearAndWeekNumber(Year.now().getValue(), weekNumber);
        LocalDate lastDayOfWeek = firstDayOfWeek.plusDays(6);
        return workService.getHoursPerWeekNumberForOneEmployee(firstDayOfWeek, lastDayOfWeek, id);
    }


    @GetMapping("/hoursPerDay/{id}")
    public long getHourPerDay(@PathVariable Long id,LocalDate date) {
        return workService.getHoursPerDayForOneEmployee(date,id);
    }

    @GetMapping("/overtimePerday/{id}")
    public long getOvertimePerDay (@PathVariable Long id,LocalDate date,LocalTime clickIn,LocalTime clickOut) {
        return workService.getOvertimePerDay(date,clickIn, clickOut, id);
    }

    @GetMapping("/overtimePerWeek/{id}")
    public long getOvertimePerWeek (@PathVariable Long id, LocalDate date1,LocalDate date2) {
        return workService.getOvertimePerWeek(date1,date2, id);
    }

    @PostMapping("/addWorkTime/{id}")
    public void addClocking (@PathVariable Long id, LocalDate date, LocalTime time, Clocking clocking) {

        WorkTime workTime = WorkTime.builder().id(id).date(date).clocking(clocking).hour(time).build();
        workService.save(workTime);
    }




}
