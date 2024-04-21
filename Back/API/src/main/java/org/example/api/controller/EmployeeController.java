package org.example.api.controller;



import org.example.api.dto.AuthenticationDto;
import org.example.api.dto.BaseResponseDto;
import org.example.api.entity.Employee;
import org.example.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


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

    @PostMapping("/loginAdmin")
    public BaseResponseDto loginAdmin(@RequestBody AuthenticationDto authenticationDto) {
        if(employeeService.checkUserNameExists(authenticationDto.getEmail())) {
            if(employeeService.verifyAdmin(authenticationDto.getEmail(), authenticationDto.getPassword())) {
                Map<String, Object> data = new HashMap<>();
                data.put("token", employeeService.generateToken(authenticationDto.getEmail(), authenticationDto.getPassword()));
                return new BaseResponseDto("success", data);
            } else {
                return new BaseResponseDto("wrong password");
            }
        } else {
            return new BaseResponseDto("user not exist");
        }
    }



    @PostMapping("/loginEmployee")
    public BaseResponseDto loginEmployee(@RequestBody AuthenticationDto authenticationDto){
        if(employeeService.checkUserNameExists(authenticationDto.getEmail())){
            if(employeeService.verifyUser(authenticationDto.getEmail(),authenticationDto.getPassword())){
                Map<String, Object> data = new HashMap<>();
                data.put("token", employeeService.generateToken(authenticationDto.getEmail(), authenticationDto.getPassword()));
                return new BaseResponseDto("success", data);
            }else {
                return new BaseResponseDto("wrong password");
            }
        }else{
            return new BaseResponseDto("user not exist");
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

}
