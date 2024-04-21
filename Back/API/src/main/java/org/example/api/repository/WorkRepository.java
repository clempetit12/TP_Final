package org.example.api.repository;

import org.example.api.entity.Clocking;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<WorkTime, Long> {



    List<WorkTime> findByDateBetweenAndEmployeeId(LocalDate date1, LocalDate date2, Long id);

   Optional<WorkTime>  findTopByClockingAndDateAndEmployeeIdOrderByHourAsc(Clocking clocking, LocalDate date, Long employeeId);
    Optional<WorkTime>  findTopByClockingAndDateAndEmployeeIdOrderByHourDesc(Clocking clocking, LocalDate date, Long employeeId);}
