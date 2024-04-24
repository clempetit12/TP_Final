package org.example.api.entity;

import lombok.Data;

@Data
public class ReportHourWorked {

    private long hourWorkedYear;
    private long hourWorkedMonth;
    private long hourWorkedDay;
    private long overtimeYear;
    private long orvetimeMonth;
    private long overtimeDay;
    private long averageHourWorkedPerDay;
}
