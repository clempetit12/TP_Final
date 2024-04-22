package org.example.api.mapper;

import org.example.api.dto.EmployeeDto;
import org.example.api.dto.WorkTimeDto;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;

import java.util.List;
import java.util.stream.Collectors;

public class MapperEmployeeDto {
    public static EmployeeDto convertToDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setLastname(employee.getLastname());
        dto.setFirstname(employee.getFirstname());
        dto.setJobTitle(employee.getJobTitle());
        dto.setAge(employee.getAge());
        dto.setEmail(employee.getEmail());
        dto.setImageUrl(employee.getImageUrl());

        List<WorkTimeDto> workTimeDtos = employee.getWorkTimes().stream()
                .map(MapperEmployeeDto::convertWorkTimeToDto)
                .collect(Collectors.toList());
        dto.setWorkTimes(workTimeDtos);

        return dto;
    }

    private static WorkTimeDto convertWorkTimeToDto(WorkTime workTime) {
        WorkTimeDto workTimeDto = new WorkTimeDto();
        workTimeDto.setId(workTime.getId());
//        workTimeDto.setStartHour(workTime.getStartHour());
//        workTimeDto.setEndHour(workTime.getEndHour());
        workTimeDto.setDate(workTime.getDate());
        return workTimeDto;
    }

}
