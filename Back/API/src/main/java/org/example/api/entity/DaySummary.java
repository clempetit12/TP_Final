package org.example.api.entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class DaySummary {
    private String day;
    private String startTime;
    private String endTime;
    private long totalHour;
    private long totalOvertime;



}
