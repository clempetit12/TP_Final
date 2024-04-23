import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Auth/LoginSlice";
import EmployeeSlice from "./Employee/EmployeeSlice";


const store = configureStore({
  reducer: {
    logins: LoginSlice,
    employees: EmployeeSlice
  },
});

export default store;