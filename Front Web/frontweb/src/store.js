import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Auth/LoginSlice";


const store = configureStore({
  reducer: {
    logins: LoginSlice,
  },
});

export default store;