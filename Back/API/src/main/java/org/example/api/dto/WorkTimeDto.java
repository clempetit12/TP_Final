package org.example.api.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkTimeDto {

    private Long id;

    private LocalTime startHour;
    private LocalTime endHour;
    private LocalDate date;


}
