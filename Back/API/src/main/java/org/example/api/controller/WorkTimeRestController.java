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
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
        List<WorkTime> workTimes = workService.getallWorkTimePerEmployee(firstDayOfWeek, lastDayOfWeek, employeeId);
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

    //Méthode pour récupérer heure du premier clockin d'un employee

    @GetMapping("getClockIn/{employeeId}")
    public LocalTime getClockIn(@PathVariable Long employeeId, LocalDate date) {
       return workService.getfirstClockIn(Clocking.IN,date,employeeId).getHour();
    }

    //Méthode pour récupérer heure du dernier clockout d'un employee
    @GetMapping("getClockOut/{employeeId}")
    public LocalTime getClockOut(@PathVariable Long employeeId,@RequestParam LocalDate date) {
        return workService.getLastClockOut(Clocking.OUT,date,employeeId).getHour();
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
    @GetMapping("/allWorkTimePerEmployee")
    public List<WorkTime> getAllWorkTimePerEmployee (@RequestParam Long employeeId, @RequestParam LocalDate date1, @RequestParam LocalDate date2) {
        return workService.getallWorkTimePerEmployee(date1,date2, employeeId);
    }

    @GetMapping("/allWorkTime")
    public List<WorkTime> getAllWorkTime () {
        return workService.getallWorkTime();
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
        System.out.println("hello");
        System.out.println(employeeId);
        ReportHourWorked reportHourWorked = new ReportHourWorked();
            System.out.println(year);
            if(day != null) {
                LocalDate date = LocalDate.of(year, month, day);
                reportHourWorked.setOvertimeDay(workService.getOvertimePerDay(date, employeeId));
                reportHourWorked.setHourWorkedDay(workService.getHoursPerDayForOneEmployee(date, employeeId));
            }
            if (month != null) {
                YearMonth yearMonth = YearMonth.of(year, month);
                reportHourWorked.setOrvetimeMonth(workService.getTotalOvertimeForMonth(yearMonth, employeeId));
                reportHourWorked.setHourWorkedMonth(workService.getTotalHourWorkedForMonth(yearMonth, employeeId));
            }
            if (year != null) {
                System.out.println("year"+year);
                Year year1 = Year.of(year);
                System.out.println("year" +year1);
                reportHourWorked.setHourWorkedYear(workService.getTotalHourWorkedForYear(year1, employeeId));
                reportHourWorked.setOvertimeYear(workService.getTotalOvertimeForYear(year1, employeeId));
                long numberOfWorkingDays = calculateNumberOfWorkingDays(year1);
                if (numberOfWorkingDays > 0) {
                    long averageHourWorkedPerDay = reportHourWorked.getHourWorkedYear() / numberOfWorkingDays;
                    System.out.println(averageHourWorkedPerDay);
                    reportHourWorked.setAverageHourWorkedPerDay(averageHourWorkedPerDay);
                } else {

                    reportHourWorked.setAverageHourWorkedPerDay(0);
                }
            }


        return reportHourWorked;


    }

    //Requete pour envoyer heures travaillées par année pour un employee
    @GetMapping("/getTotalHourWorkedYear")
    public ReportHourWorked getTotalHourWorkedYear(@RequestParam Integer year, @RequestParam Long employeeId) {
        System.out.println("year");
        System.out.println(employeeId);
        ReportHourWorked reportHourWorked = new ReportHourWorked();
        System.out.println(year);
        if (year != null) {
            System.out.println("year"+year);
            Year year1 = Year.of(year);
            System.out.println("year" +year1);
            reportHourWorked.setHourWorkedYear(workService.getTotalHourWorkedForYear(year1, employeeId));
            reportHourWorked.setOvertimeYear(workService.getTotalOvertimeForYear(year1, employeeId));
            long numberOfWorkingDays = calculateNumberOfWorkingDays(year1);
            if (numberOfWorkingDays > 0) {
                long averageHourWorkedPerDay = reportHourWorked.getHourWorkedYear() / numberOfWorkingDays;
                System.out.println(averageHourWorkedPerDay);
                reportHourWorked.setAverageHourWorkedPerDay(averageHourWorkedPerDay);

            } else {

                reportHourWorked.setAverageHourWorkedPerDay(0);
            }
        }


        return reportHourWorked;


    }

    //Requete pour envoyer heures travaillées par mois pour un employee
    @GetMapping("/getTotalHourWorkedMonth")
    public ReportHourWorked getTotalHourWorkedMonth(@RequestParam Integer year,
                                               @RequestParam Integer month
                                            , @RequestParam Long employeeId) {
        System.out.println("hello");
        System.out.println(employeeId);
        ReportHourWorked reportHourWorked = new ReportHourWorked();
        if (month != null) {
            YearMonth yearMonth = YearMonth.of(year, month);
            reportHourWorked.setOrvetimeMonth(workService.getTotalOvertimeForMonth(yearMonth, employeeId));
            reportHourWorked.setHourWorkedMonth(workService.getTotalHourWorkedForMonth(yearMonth, employeeId));

                reportHourWorked.setAverageHourWorkedPerDay(0);

        }


        return reportHourWorked;


    }
    //Requete pour envoyer heures travaillées par jour pour un employee
    @GetMapping("/getTotalHourWorkedDay")
    public ReportHourWorked getTotalHourWorkedDay(@RequestParam(required = false) Integer year,
                                               @RequestParam(required = false) Integer month,
                                               @RequestParam(required = false) Integer day, @RequestParam Long employeeId) {
        System.out.println("hello");
        System.out.println(employeeId);
        ReportHourWorked reportHourWorked = new ReportHourWorked();
        System.out.println(year);
        if(day != null) {
            LocalDate date = LocalDate.of(year, month, day);
            reportHourWorked.setOvertimeDay(workService.getOvertimePerDay(date, employeeId));
            reportHourWorked.setHourWorkedDay(workService.getHoursPerDayForOneEmployee(date, employeeId));


                reportHourWorked.setAverageHourWorkedPerDay(0);
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

    public static long calculateNumberOfWorkingDays(Year year) {
        long numberOfWorkingDays = 0;
        LocalDate startDate = year.atDay(1);
        LocalDate endDate = year.atDay(1).plusYears(1).minusDays(1); // Dernier jour de l'année

        // Itérer sur chaque jour de l'année
        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
            DayOfWeek dayOfWeek = date.getDayOfWeek();
            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                numberOfWorkingDays++;
            }
        }

        return numberOfWorkingDays;
    }

}
