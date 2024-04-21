package org.example.api.entity;

import lombok.Data;

import java.util.List;

@Data
public class WeeklySummary {

    private List<DaySummary> daySummaries;
    private long totalWorkHours;
    private long totalOvertimeHours;


}
