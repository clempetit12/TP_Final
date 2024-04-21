package org.example.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime hour;
    @Enumerated(EnumType.STRING)
    private Clocking clocking;
    private LocalDate date;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String

    toString() {
        return "WorkTime{" +
                "id=" + id +
                ", hour=" + hour +
                ", clocking=" + clocking +
                ", date=" + date +
                ", employee=" + employee.getEmail() +
                '}';
    }
}
