package org.example.api.repository;

import org.example.api.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

     Optional<Employee> findById(Long id);
}
