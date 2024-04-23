import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../Service/accountService";

const BASE_API_URL = "http://localhost:8090";

export const getAllEmpoyees = createAsyncThunk(
    "employee/getAllEmployees",
    async () => {
        try {
          const response = await axios.get(`${BASE_API_URL}/admin/employees`, { headers: accountService.getToken()});
          return response.data;
        } catch (error) {
          throw error;
        }
      }
);

export const getEmployeeById = createAsyncThunk(
    "employee/getEmployeeById",
    async (employeeId) => {
        try {
          const response = await axios.get(`${BASE_API_URL}/admin/employee/${employeeId}`, { headers: accountService.getToken()});
          return response.data;
        } catch (error) {
          throw error;
        }
      }
)

export const getEmployeeByLastName = createAsyncThunk(
    "employee/getEmployeeByLastName",
    async (lastName) => {
        try {
          const response = await axios.get(`${BASE_API_URL}/admin/employee/lastname/${lastName}`, { headers: accountService.getToken()});
          return response.data;
        } catch (error) {
          throw error;
        }
      }
)

export const createEmployee = createAsyncThunk(
    "employee/createEmployee",
    async (newEmployee) => {
        try {
            const response = await axios.post(`${BASE_API_URL}/admin/createEmployee`, newEmployee, { headers: accountService.getToken()});
            return response.data;
          } catch (error) {
            throw error;
          }
    }
)

export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async (updatedEmployee) => {
        try {
            const response = await axios.put(
              `${BASE_API_URL}/admin/updateEmployee/${updatedEmployee.id}`,{ headers: accountService.getToken()},
              updatedEmployee
            );
            return response.data;
          } catch (error) {
            throw error;
          }
    }
)

export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (employeeId) => {
        try {
            await axios.delete(`${BASE_API_URL}/admin/deleteEmployee/${employeeId}`,{ headers: accountService.getToken()});
            return employeeId;
          } catch (error) {
            throw error;
          }
        } 
)

const employeeSlice = createSlice({
    name:"employee",
    initialState:{
        employees:[],
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(getAllEmpoyees.fulfilled, (state , action)=>{
            state.employees = action.payload;
        });
        builder.addCase(getEmployeeById.fulfilled, (state , action)=>{
            state.selectedEmployee = action.payload
        });
        builder.addCase(getEmployeeByLastName.fulfilled, (state, action) => {
            state.employees = action.payload;
        });
        builder.addCase(createEmployee.fulfilled, (state , action)=>{
            state.employees.push(action.payload);
        });
        builder.addCase(updateEmployee.fulfilled, (state , action)=>{
            const index = state.employees.findIndex(
                (employee) => employee.id === action.payload.id
              );
              if (index !== -1) {
                state.employees[index] = action.payload;
              }
        });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.employees = state.employees.filter(
              (employee) => employee.id !== action.payload
            );
        });

        
    }
});

export default employeeSlice.reducer