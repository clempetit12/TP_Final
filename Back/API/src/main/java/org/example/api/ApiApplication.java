package org.example.api;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.example.api.entity.Employee;
import org.example.api.entity.PasswordTempory;
import org.example.api.entity.Role;
import org.example.api.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.SecretKey;

@SpringBootApplication
public class ApiApplication {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	public CommandLineRunner createAdminEmployee(EmployeeRepository employeeRepository) {
		return args -> {
			if (employeeRepository.findByEmail("admin@example.com").isEmpty()) {
				Employee admin = new Employee();
				admin.setFirstname("Admin");
				admin.setLastname("Admin");
				admin.setJobTitle("Administrator");
				admin.setAge(30);
				admin.setEmail("admin@example.com");
				admin.setPassword(passwordEncoder.encode("admin"));
				admin.setPasswordTemporary(PasswordTempory.DISABLE);
				admin.setRole(Role.ROLE_ADMIN);

				employeeRepository.save(admin);

				System.out.println("Admin Employee created successfully.");
			} else {
				System.out.println("Admin Employee already exists.");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
//		SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//		String base64Key = Encoders.BASE64.encode(key.getEncoded());
//
//		System.out.println(base64Key);

	}

}
