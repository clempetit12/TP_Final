import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = "http://localhost:8090";

export const login = createAsyncThunk("login/admin", async (newLogin) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/loginAdmin`, newLogin);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    logins: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.logins.push(action.payload);
      if (action.payload.data && action.payload.data.token) {
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      }
    });
  },
});

export default LoginSlice.reducer;
