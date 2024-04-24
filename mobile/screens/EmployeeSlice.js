import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../Service/accountService";

const BASE_API_URL = "http://localhost:8090";

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


const employeeSlice = createSlice({
    name:"employee",
    initialState:{
        employees:[],
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(getEmployeeById.fulfilled, (state , action)=>{
            state.selectedEmployee = action.payload
        });
        builder.addCase(getEmployeeByLastName.fulfilled, (state, action) => {
            state.employees = action.payload;
        });
    }
});

export default employeeSlice.reducer