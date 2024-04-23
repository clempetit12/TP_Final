package org.example.api.entity;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

public class DateUtil {

    public static LocalDate getFirstDayOfWeekForYearAndWeekNumber(int year, int weekNumber) {
        LocalDate firstDayOfYear = LocalDate.of(year, 1, 1);
        LocalDate firstDayOfWeekOfYear = firstDayOfYear.with(TemporalAdjusters.firstInMonth(firstDayOfYear.getDayOfWeek()));
        return firstDayOfWeekOfYear.plusWeeks(weekNumber - 1);
    }

    public static void main(String[] args) {
        int year = 2024;
        int weekNumber = 15;
        LocalDate firstDayOfWeek = getFirstDayOfWeekForYearAndWeekNumber(year, weekNumber);
        System.out.println("First day of week " + weekNumber + " of " + year + ": " + firstDayOfWeek);
    }
}
