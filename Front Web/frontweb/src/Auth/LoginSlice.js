import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = "http://localhost:8090";


export const postConnexion = createAsyncThunk(
  "login/admin",
  async (newLogin) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/loginAdmin`, newLogin);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


const LoginSlice = createSlice({
  name: "login",
  initialState: {
    logins: [],
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(postConnexion.fulfilled, (state, action) => {
        state.logins.push(action.payload);
        console.log(action.payload)
    });

  },
});

export default LoginSlice.reducer;