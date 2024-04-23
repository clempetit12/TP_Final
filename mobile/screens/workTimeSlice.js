import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "api/v1/workTime";

export const addWorkTime = createAsyncThunk(
    'workTime/addWorkTime',
    async ({ employeeId, clocking }) => {
        const response = await fetch(API_URL + `/addWorkTime/${employeeId}?clocking=${clocking}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    });

const workTimeSlice = createSlice({
    name: 'workTime',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWorkTime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWorkTime.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addWorkTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default workTimeSlice.reducer;
