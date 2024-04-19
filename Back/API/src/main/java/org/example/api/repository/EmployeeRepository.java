package org.example.api.repository;

import org.example.api.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Long, Employee> {

    Employee findById(Long id);
}
