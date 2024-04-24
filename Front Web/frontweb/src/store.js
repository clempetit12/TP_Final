import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Auth/LoginSlice";
import EmployeeSlice from "./Employee/EmployeeSlice";
import workTimeSlice from "./WorkTime/workTimeSlice";


const store = configureStore({
  reducer: {
    logins: LoginSlice,
    employees: EmployeeSlice,
    workTime : workTimeSlice
  },
});

export default store;