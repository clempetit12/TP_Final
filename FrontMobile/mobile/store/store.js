import { configureStore } from "@reduxjs/toolkit";
import WorkTimeSlice from "../screens/WorkTimeSlice";



export default configureStore({
    reducer : {
        workTimes: WorkTimeSlice
    }
})