package org.example.api.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private Long id;
    private String lastname;
    private String firstname;
    private String jobTitle;
    private int age;
    private String email;
    private String imageUrl;
    private List<WorkTimeDto> workTimes;
}
