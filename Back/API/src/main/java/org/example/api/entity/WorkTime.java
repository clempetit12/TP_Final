package org.example.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class WorkTime {
    @Id
    private Long id;

    private LocalTime startHour;
    private LocalTime endHour;
    private LocalDate date;



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
