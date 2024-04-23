package org.example.api;

import org.example.api.controller.WorkTimeRestController;
import org.example.api.entity.Clocking;
import org.example.api.entity.Employee;
import org.example.api.entity.WorkTime;
import org.example.api.service.EmployeeService;
import org.example.api.service.WorkService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.time.LocalDate;
import java.time.LocalTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PostHoursTest {
    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private WorkService workService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testAddClocking() throws Exception {

        Long employeeId = 1L;
        String clockingValue = "OUT";
        Clocking clockingEnum = Clocking.valueOf(clockingValue);
        Employee employee = new Employee();
        WorkTime workTime = WorkTime.builder()
                .employee(employee)
                .hour(LocalTime.now())
                .date(LocalDate.now())
                .clocking(clockingEnum)
                .build();

        when(employeeService.getEmployeeById(employeeId)).thenReturn(employee);

        when(workService.saveWorkTime(any(WorkTime.class))).thenReturn(workTime);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/workTime/addWorkTime/{id}", employeeId)
                        .param("clocking", clockingValue))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(workService).saveWorkTime(any(WorkTime.class));
    }
}
