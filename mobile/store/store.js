import { configureStore } from "@reduxjs/toolkit";
import workTimeSlice from "../screens/workTimeSlice";
import LoginSlice from "../screens/LoginSlice";
import EmployeeSlice from "../screens/EmployeeSlice";


export default configureStore({
    reducer : {
        workTime: workTimeSlice,  
        logins: LoginSlice,
        employees:EmployeeSlice

    }
})