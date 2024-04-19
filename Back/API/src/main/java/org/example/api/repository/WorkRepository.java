package org.example.api.repository;

import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<WorkTime, Long> {



    List<WorkTime> findByDateBetweenAndEmployeeId(LocalDate date1, LocalDate date2, Long id);

}
