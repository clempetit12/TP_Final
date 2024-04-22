package org.example.api.controller;

import org.example.api.dto.AuthenticationDto;
import org.example.api.dto.BaseResponseDto;
import org.example.api.entity.PasswordTempory;
import org.example.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/loginAdmin")
    public BaseResponseDto loginAdmin(@RequestBody AuthenticationDto authenticationDto) {
        if (employeeService.checkUserNameExists(authenticationDto.getEmail())) {
            if (employeeService.verifyAdmin(authenticationDto.getEmail(), authenticationDto.getPassword())) {
                PasswordTempory passwordTemporary = employeeService.checkPasswordTempory(authenticationDto.getEmail());
                Map<String, Object> data = new HashMap<>();
                data.put("token", employeeService.generateToken(authenticationDto.getEmail(), authenticationDto.getPassword()));
                data.put("passwordTemporary", passwordTemporary);
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
                PasswordTempory passwordTemporary = employeeService.checkPasswordTempory(authenticationDto.getEmail());
                Map<String, Object> data = new HashMap<>();
                data.put("token", employeeService.generateToken(authenticationDto.getEmail(), authenticationDto.getPassword()));
                data.put("passwordTemporary", passwordTemporary);
                return new BaseResponseDto("success", data);
            } else {
                return new BaseResponseDto("wrong password");
            }
        } else {
            return new BaseResponseDto("user not exist");
        }
    }
}