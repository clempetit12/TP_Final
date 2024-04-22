package org.example.api.controller;



import org.example.api.dto.AuthenticationDto;
import org.example.api.dto.BaseResponseDto;
import org.example.api.dto.EmployeeDto;
import org.example.api.entity.Employee;
import org.example.api.mapper.MapperEmployeeDto;
import org.example.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(path = "/admin/createEmployee")
    public BaseResponseDto addEmployee(@RequestBody Employee newEmployee){
        if( employeeService.createEmployee(newEmployee)){
            return new BaseResponseDto("success");
        }else{
            return new BaseResponseDto("failed");
        }
    }

    @GetMapping("/admin/employee/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        EmployeeDto employeeDto = MapperEmployeeDto.convertToDto(employee);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping("/admin/employees")
    public List<EmployeeDto> getAllEmployees() {
        List<EmployeeDto> employeeDtos = employeeService.getAllEmployees().stream()
                .map(MapperEmployeeDto::convertToDto)
                .collect(Collectors.toList());

        return employeeDtos;
    }

    @GetMapping("/admin/employee/lastname/{lastName}")
    public ResponseEntity<?> getEmployeesByLastName(@PathVariable String lastName) {
        Optional<Employee> employeeOptional = employeeService.getEmployeeByLastName(lastName);
        if (employeeOptional.isPresent()) {
            EmployeeDto employeeDto = MapperEmployeeDto.convertToDto(employeeOptional.get());
            return ResponseEntity.ok(employeeDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/admin/deleteEmployee/{id}")
    public BaseResponseDto deleteEmployee(@PathVariable Long id) {
        if (employeeService.deleteEmployeeById(id)) {
            return new BaseResponseDto("success");
        } else {
            return new BaseResponseDto("failed");
        }
    }

    @PutMapping("/admin/updateEmployee/{id}")
    public BaseResponseDto updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        if (employeeService.updateEmployeeById(id, updatedEmployee)) {
            return new BaseResponseDto("success");
        } else {
            return new BaseResponseDto("failed");
        }
    }

    @PutMapping("/updatePassword")
    public BaseResponseDto updatePassword(@RequestBody AuthenticationDto authenticationDto) {
        if(employeeService.checkUserNameExists(authenticationDto.getEmail())) {
                if(employeeService.updatePassword(authenticationDto.getEmail(), authenticationDto.getPassword())) {
                    return new BaseResponseDto("success", "Password updated successfully");
                } else {
                    return new BaseResponseDto("failed", "Failed to update password");
                }

        } else {
            return new BaseResponseDto("failed", "User not found");
        }
    }
}
