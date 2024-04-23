package org.example.api.entity;

import lombok.Data;

@Data
public class ReportHourWorked {

    private long hourWorkedYear;
    private long hourWorkedMonth;
    private long hourWorkedDay;
    private long averageHourWorkedPerDay;
}
