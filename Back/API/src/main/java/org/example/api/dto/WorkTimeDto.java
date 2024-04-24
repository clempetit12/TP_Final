package org.example.api.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.api.entity.Clocking;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkTimeDto {

    private Long id;

    private LocalTime hour;
    private LocalDate date;
    private Clocking clocking;


}
