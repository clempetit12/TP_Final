package org.example.api.controller;

import org.example.api.entity.*;
import org.example.api.service.EmployeeService;
import org.example.api.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/workTime")
public class WorkTimeRestController {

    @Autowired
    private WorkService workService;

    @Autowired
    private EmployeeService employeeService;


    // Méthode qui renvoie un objet json avec les heures travailles, les clockIn les clockOut pour une semaine pour un employé donné
    @GetMapping("/weeklySummary")
    public WeeklySummary getWeeklySummary(@RequestParam int weekNumber, @RequestParam Long employeeId) {
        LocalDate firstDayOfWeek = DateUtil.getFirstDayOfWeekForYearAndWeekNumber(2024, weekNumber);
        LocalDate lastDayOfWeek = firstDayOfWeek.plusDays(6);
        LocalDate day = firstDayOfWeek;
        List<DaySummary> daySummaries = new ArrayList<>();
        for (int i = 0; i < 7; i++) {

            DaySummary daySummary = new DaySummary();
            daySummary.setDay(day.getDayOfWeek().toString());

            LocalTime startTime = getFirstClockIn(Clocking.IN,day,employeeId);
            LocalTime endTime = getLastClockOut(Clocking.OUT,day,employeeId);
            if (startTime != null) {
                daySummary.setStartTime(startTime.toString());
            } else {
                daySummary.setStartTime("");
            }
            if (endTime != null) {
                daySummary.setEndTime(endTime.toString());
            } else {
                daySummary.setEndTime("");
            }

            long totalHour = workService.getHoursPerDayForOneEmployee(day,employeeId);
            long totalOverTime = workService.getOvertimePerDay(day,employeeId);
            daySummary.setTotalHour(totalHour);
            daySummary.setTotalOvertime(totalOverTime);
            daySummaries.add(daySummary);
            day = day.plusDays(1);


        }
        List<WorkTime> workTimes = workService.getallWorkTime(firstDayOfWeek, lastDayOfWeek, employeeId);
        long totalWorkHours = workService.calculateTotalWorkHours(workTimes).toHours();
        long totalOvertimeHours = workService.calculateTotalOvertimeHours(workTimes).toHours();


        WeeklySummary weeklySummary = new WeeklySummary();
        weeklySummary.setDaySummaries(daySummaries);
        weeklySummary.setTotalWorkHours(totalWorkHours);
        weeklySummary.setTotalOvertimeHours(totalOvertimeHours);

        return weeklySummary;
    }

    //Méthode pour renvoyer numéro de semaines
    @GetMapping("/getWeekNumber")
    public int getWeekNumber(LocalDate date) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(date.getYear(),date.getMonth().getValue(),date.getDayOfWeek().getValue());
        int weekNumber = calendar.get(Calendar.WEEK_OF_YEAR);
        System.out.println("Numéro de semaine : " + weekNumber);
        return weekNumber;
    }

    // Méthode pour récupérer le nombre d'heures travaillées entre deux dates
    @GetMapping("/hoursByDate")
public long getHourPerBetweenTwoDates(@RequestParam Long employeeId, @RequestParam  LocalDate date1, @RequestParam  LocalDate date2) {
        return workService.getHoursPerWeekForOneEmployee(date1,date2,employeeId);

    }

    // Méthode pour récupérer le nombre d'heures travaillées selon un numéro de semaine
    @GetMapping("/hoursPerWeekNumber")
    public long getHourPerWeekNumber(@RequestParam Long employeeId,@RequestParam  int weekNumber) {
        return workService.getHoursPerWeekNumberForOneEmployee(2024, weekNumber,employeeId);
    }


    // Méthode pour ajouter un WorkTime (clickIN ou clickOUT)
    @PostMapping("/addWorkTime")
    public WorkTime addClocking (@RequestParam Long employeeId, @RequestParam String clocking) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        LocalTime currentTime = LocalTime.now();
        LocalDate currentDate = LocalDate.now();
        Clocking clockingEnum = Clocking.valueOf(clocking);
        WorkTime workTime = WorkTime.builder().employee(employee).date(currentDate).clocking(clockingEnum).hour(currentTime).build();
      return workService.saveWorkTime(workTime);
    }

    //Méthode pour récupérer la liste des workTime d'un employé entre deux date (les horaires)
    @GetMapping("/allWorkTilePerEmployee")
    public List<WorkTime> getAllWorkTime (@RequestParam Long employeeId, @RequestParam LocalDate date1, @RequestParam LocalDate date2) {
        return workService.getallWorkTime(date1,date2, employeeId);
    }

    //Méthode pour connaître dernier état enregistré par employee (IN ou OUT)
    @GetMapping("/lastStatusEmployee")
    public Clocking getLastClocking(@RequestParam Long id, @RequestParam LocalDate date) {
        if (workService.getLastClocking(id,date) != null) {
            return workService.getLastClocking(id,date).getClocking();
        }else {
            return null;
        }
    }

    //Méthode pour renvoyer heure travaillée par année, mois et jour
    //Renvoie un objet ReportHourWorked pour un employee
    //{
    //    "hourWorkedYear": 35,
    //    "hourWorkedMonth": 35,
    //    "hourWorkedDay": 7,
    //    "averageHourWorkedPerDay": 8
    //}
    @GetMapping("/getTotalHourWorked")
    public ReportHourWorked getTotalHourWorked(@RequestParam(required = false) Integer year,
                                   @RequestParam(required = false) Integer month,
                                   @RequestParam(required = false) Integer day, @RequestParam Long employeeId) {
        ReportHourWorked reportHourWorked = new ReportHourWorked();
        if (year != null && month != null && day != null) {
            LocalDate date = LocalDate.of(year, month, day);
            reportHourWorked.setHourWorkedDay(workService.getHoursPerDayForOneEmployee(date, employeeId));
            YearMonth yearMonth = YearMonth.of(year, month);
            reportHourWorked.setHourWorkedMonth(workService.getTotalHourWorkedForMonth(yearMonth, employeeId));
            Year year1 = Year.of(year);
            reportHourWorked.setHourWorkedYear(workService.getTotalHourWorkedForYear(year1, employeeId));
            long averageHourWorkedPerDay = reportHourWorked.getHourWorkedMonth()/ 4;
            reportHourWorked.setAverageHourWorkedPerDay(averageHourWorkedPerDay);
        }

        if (year != null && month != null) {
            Year year1 = Year.of(year);
            reportHourWorked.setHourWorkedYear(workService.getTotalHourWorkedForYear(year1, employeeId));
            YearMonth yearMonth = YearMonth.of(year, month);
            reportHourWorked.setHourWorkedMonth(workService.getTotalHourWorkedForMonth(yearMonth, employeeId));
        }

        if (year != null) {
            Year year1 = Year.of(year);
            reportHourWorked.setHourWorkedYear(workService.getTotalHourWorkedForYear(year1, employeeId));
        }
        return reportHourWorked;


    }


    public LocalTime getFirstClockIn (Clocking clocking,LocalDate date, long employeeId) {
        WorkTime workTime = workService.getfirstClockIn(clocking,date,employeeId);
        if (workTime != null){
            return workTime.getHour();
        }else {
            return null;
        }
    }
    public LocalTime getLastClockOut (Clocking clocking,LocalDate date, long employeeId) {
        WorkTime workTime = workService.getLastClockOut(clocking,date,employeeId);
        if (workTime != null){
            return workTime.getHour();
        }else {
            return null;
        }    }


}
