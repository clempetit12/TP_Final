import { configureStore } from "@reduxjs/toolkit";
import workTimeSlice from "../screens/workTimeSlice";





export default configureStore({
    reducer : {
        workTime: workTimeSlice
    }
})