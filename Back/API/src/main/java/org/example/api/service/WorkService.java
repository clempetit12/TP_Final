package org.example.api.service;

import org.example.api.entity.Clocking;
import org.example.api.entity.DateUtil;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.example.api.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
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



    public List<WorkTime> getallWorkTime() {
        return workRepository.findAll();
    }

    public List<WorkTime> getallWorkTimePerEmployee(LocalDate date1, LocalDate date2, Long id) {
        return workRepository.findByDateBetweenAndEmployeeId(date1,date2,id);
    }

    public Duration calculateTotalWorkHours(List<WorkTime> workTimes) {
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

    public Duration calculateTotalOvertimeHours(List<WorkTime> workTimes) {
        Duration totalOvertimeDuration = Duration.ZERO;

        for (WorkTime workTime : workTimes) {
            if (workTime.getClocking() == Clocking.IN) {
                WorkTime nextWorkTime = getNextWorkTime(workTimes, workTime);
                if (nextWorkTime != null && nextWorkTime.getClocking() == Clocking.OUT) {
                    Duration duration = Duration.between(workTime.getHour(), nextWorkTime.getHour());
                    // Vérifier si la durée dépasse 7 heures (heures régulières)
                    if (duration.toHours() > 7) {
                        // Ajouter les heures supplémentaires au total
                        totalOvertimeDuration = totalOvertimeDuration.plus(duration.minusHours(7)); // Heures supplémentaires = Durée - 7 heures régulières
                    }
                }
            }
        }

        return totalOvertimeDuration;
    }

    private WorkTime getNextWorkTime(List<WorkTime> workTimes, WorkTime currentWorkTime) {
        int currentIndex = workTimes.indexOf(currentWorkTime);
        if (currentIndex < workTimes.size() - 1) {
            return workTimes.get(currentIndex + 1);
        } else {
            return null;
        }
    }

    public WorkTime getfirstClockIn(Clocking clocking,LocalDate date, long employeeId) {
        return workRepository.findTopByClockingAndDateAndEmployeeIdOrderByHourAsc(clocking,date,employeeId).orElse(null);
    }

    public WorkTime getLastClockOut(Clocking clocking,LocalDate date, long employeeId) {
        return workRepository.findTopByClockingAndDateAndEmployeeIdOrderByHourDesc(clocking,date,employeeId).orElse(null);
    }

    public WorkTime getLastClocking(Long id, LocalDate date) {
        return workRepository.findTopByEmployeeIdAndDateOrderByHourDesc(id,date).orElse(null);
    }

    public long getTotalHourWorkedForMonth(YearMonth yearMonth, long employeeId) {
        LocalDate firstDayOfMonth = yearMonth.atDay(1);
        LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
      Duration duration = sumHoursBetweenDatesForEmployee(firstDayOfMonth,lastDayOfMonth,employeeId);
        System.out.println("mont"+duration);

        return duration.toHours();
    }

    public long getTotalOvertimeForMonth(YearMonth yearMonth, long employeeId) {
        long totalOvertime = 0;
        LocalDate firstDayOfMonth = yearMonth.atDay(1);
        int lastDayOfMonth = yearMonth.lengthOfMonth();

        // Parcours de chaque jour du mois
        for (int day = 1; day <= lastDayOfMonth; day++) {
            LocalDate date = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), day);
            long overtimePerDay = getOvertimePerDay(date, employeeId);
            totalOvertime += overtimePerDay;
        }
        System.out.println("overtime" +totalOvertime);
        return totalOvertime;
    }


    public long getTotalHourWorkedForYear(Year year, long employeeId) {
        LocalDate firstDayOfMonth = year.atDay(1);
        LocalDate lastDayOfYear = year.atDay(1).plusYears(1).minusDays(1);
        List<WorkTime> workTimes = workRepository.findByDateBetweenAndEmployeeId(firstDayOfMonth, lastDayOfYear,employeeId);
        Duration duration = sumHoursBetweenDatesForEmployee(firstDayOfMonth,lastDayOfYear,employeeId);
        System.out.println("year"+duration);
        return duration.toHours();
    }

    public long getTotalOvertimeForYear(Year year, Long employeeId) {
        long totalOvertime = 0;
        LocalDate firstDayOfYear = year.atDay(1);
        LocalDate lastDayOfYear = year.atDay(1).plusYears(1).minusDays(1);


        for (LocalDate date = firstDayOfYear; date.isBefore(lastDayOfYear.plusDays(1)); date = date.plusDays(1)) {
            long overtimePerDay = getOvertimePerDay(date, employeeId);
            totalOvertime += overtimePerDay;
        }

        return totalOvertime;
    }

}
