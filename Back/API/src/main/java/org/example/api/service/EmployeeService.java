package org.example.api.service;


import org.example.api.entity.Employee;
import org.example.api.entity.PasswordTempory;
import org.example.api.entity.Role;
import org.example.api.repository.EmployeeRepository;
import org.example.api.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService implements UserDetailsService {


    @Autowired
    private EmployeeRepository employeeRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public boolean verifyAdmin(String email, String password) {
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail(email);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            if (employee.getRole() == Role.ROLE_ADMIN) {
                return passwordEncoder.matches(password, employee.getPassword());
            }
        }

        return false;
    }

    public boolean verifyUser(String email, String password) {
        return employeeRepository.findByEmail(email)
                .map(employee -> passwordEncoder.matches(password, employee.getPassword()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public PasswordTempory checkPasswordTempory(String email){
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail(email);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            return employee.getPasswordTemporary();
        }
        return PasswordTempory.ENABLE;
    }

    public Employee getEmployeeById(Long id) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        return optionalEmployee.orElse(null);
    }



    public boolean checkUserNameExists(String email){
        return employeeRepository.findByEmail(email).isPresent();
    }

    public String generateToken(String email, String password){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);
        return token;
    }

    public boolean createEmployee(Employee employee){
        String defaultPassword = employee.getLastname()+employee.getFirstname();
        employee.setPassword(passwordEncoder.encode(defaultPassword));
        employeeRepository.save(employee);
        return true;
    }

    public Optional<Employee> getEmployeeByLastName(String lastName) {
        return employeeRepository.findByLastname(lastName);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

//     Génère un mot de passe aléatoire de 10 caractères
//    public boolean createEmployee(Employee employee){
//        String defaultPassword = RandomStringUtils.randomAlphanumeric(10);
//        employee.setPassword(defaultPassword);
//        employee.setPassword(passwordEncoder.encode(defaultPassword));
//        employeeRepository.save(employee);
//        return true;
//    }

    public boolean deleteEmployeeById(Long id) {
            Optional<Employee> optionalEmployee = employeeRepository.findById(id);
            if (optionalEmployee.isPresent()) {
                employeeRepository.deleteById(id);
                return true;
            } else {
                return false;
            }

    }

    public boolean updateEmployeeById(Long id, Employee updatedEmployee) {

            Optional<Employee> optionalEmployee = employeeRepository.findById(id);
            if (optionalEmployee.isPresent()) {
                Employee existingEmployee = optionalEmployee.get();
                existingEmployee.setLastname(updatedEmployee.getLastname());
                existingEmployee.setFirstname(updatedEmployee.getFirstname());
                existingEmployee.setJobTitle(updatedEmployee.getJobTitle());
                existingEmployee.setAge(updatedEmployee.getAge());
                existingEmployee.setEmail(updatedEmployee.getEmail());
                existingEmployee.setImageUrl(updatedEmployee.getImageUrl());
                existingEmployee.setRole(updatedEmployee.getRole());
                employeeRepository.save(existingEmployee);
                return true;
            }else{
                return false;
            }
    }

    public boolean updatePassword(String email, String newPassword) {
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail(email);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setPasswordTemporary(PasswordTempory.DISABLE);
            employee.setPassword(passwordEncoder.encode(newPassword));
            employeeRepository.save(employee);
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return employeeRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found with email: \" + email"));

    }
}
