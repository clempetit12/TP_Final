package org.example.api.controller;

import org.example.api.entity.Clocking;
import org.example.api.entity.DateUtil;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.example.api.service.EmployeeService;
import org.example.api.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/workTime")
public class WorkTimeRestController {

    @Autowired
    private WorkService workService;

    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/hoursByDate/{id}")
public long getHourPerBetweenTwoDates(@PathVariable Long id, @RequestParam  LocalDate date1, @RequestParam  LocalDate date2) {
        return workService.getHoursPerWeekForOneEmployee(date1,date2,id);


    }

    @GetMapping("/hoursPerWeekNumber/{id}")
    public long getHourPerWeekNumber(@PathVariable Long id,@RequestParam  int weekNumber, @RequestParam int year) {
        return workService.getHoursPerWeekNumberForOneEmployee(year, weekNumber,id);
    }


    @GetMapping("/hoursPerDay/{id}")
    public long getHourPerDay(@PathVariable Long id,@RequestParam  LocalDate date) {
        return workService.getHoursPerDayForOneEmployee(date,id);
    }

    @GetMapping("/overtimePerday/{id}")
    public long getOvertimePerDay (@PathVariable Long id,@RequestParam  LocalDate date) {
        return workService.getOvertimePerDay( date, id);
    }

    @GetMapping("/overtimePerWeek/{id}")
    public long getOvertimePerWeek (@PathVariable Long id, @RequestParam LocalDate date1, @RequestParam LocalDate date2) {
        return workService.getOvertimePerWeek(date1,date2, id);
    }

    @PostMapping("/addWorkTime/{id}")
    public WorkTime addClocking (@PathVariable Long id, @RequestParam String clocking) {
        Employee employee = employeeService.getEmployeeById(id);

        LocalTime currentTime = LocalTime.now();
        LocalDate currentDate = LocalDate.now();

        Clocking clockingEnum = Clocking.valueOf(clocking);

        WorkTime workTime = WorkTime.builder().employee(employee).date(currentDate).clocking(clockingEnum).hour(currentTime).build();
      return workService.saveWorkTime(workTime);
    }




}
