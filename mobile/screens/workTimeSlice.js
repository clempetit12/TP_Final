import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "http://10.0.2.2:8090/api/v1/workTime";


export const addWorkTime = createAsyncThunk(
    'workTime/addWorkTime',
    async ({ clocking }) => {
        const employeeId = 1;
        console.log("add");
        try {
            const response = await fetch(`${API_URL}/addWorkTime?employeeId=${employeeId}&clocking=${clocking}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response", response);
            const data = await response.json();
            console.log("data", data);
            return data;
        } catch (error) {
            console.error("Error adding work time:", error);
            throw error;
        }
    }
);
const getCurrentDate = () => {
  const date = new Date();
  console.log("date" + date)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0'); 
  console.log("day"+day)
  const currentDate = `${year}-${month}-${day}`
  return currentDate;
};


export const getLastStatus = createAsyncThunk(
    'workTime/lastStatus',
    async () => {
        try {
            const employeeId = 1;
            const currentDate = getCurrentDate();
            console.log("currentdate"+currentDate)
            const response = await fetch(`${API_URL}/lastStatusEmployee?id=${employeeId}&date=${currentDate}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json(); 
            console.log("status"+data)
           return data;
          } catch (error) {
            console.error('Erreur lors de la récupération du dernier statut :', error);
          }
        }
    
);

export const getWeekNumber = createAsyncThunk(
    'workTime/WeekNumber',
    async () => {
        try {
            const currentDate = getCurrentDate();
            console.log("currentdate");
            console.log("currentdate"+currentDate)
            const response = await fetch(`${API_URL}/getWeekNumber?date=${currentDate}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json(); 
            console.log("weeknumber"+data)
           return data;
          } catch (error) {
            console.error('Erreur lors de la récupération du dernier statut :', error);
          }
        }
    
);

export const getWeeklySummary = createAsyncThunk(
  'workTime/weeklySummary',
  async ({selectedWeek}) => {
      try {
        console.log("weeklySummary")
          const employeeId = 1;
          console.log("selectedw weekly" + selectedWeek)
          const response = await fetch(`${API_URL}/weeklySummary?weekNumber=${selectedWeek}&employeeId=${employeeId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json(); 
          console.log("weekly summary"+data)
          console.table("weekdate"+data);
         return data;
        } catch (error) {
          console.error('Erreur lors de la récupération du dernier statut :', error);
        }
      }
  
);




export const getHoursPerWeek = createAsyncThunk(
    'workTime/HoursPerWeek',
    async () => {
        try {
            const employeeId = 1;
            const currentDate = getCurrentDate();
            console.log("currentdate"+currentDate)
            const response = await fetch(`${API_URL}/weeklySummary?id=${employeeId}&date=${currentDate}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json(); 
            console.log("status"+data)
           return data;
          } catch (error) {
            console.error('Erreur lors de la récupération du dernier statut :', error);
          }
        }
    
);








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
            })
            .addCase(getLastStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLastStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.lastStatus = action.payload; 
            })
            .addCase(getLastStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getWeekNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWeekNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.weekNumber = action.payload; 
            })
            .addCase(getWeekNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getWeeklySummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWeeklySummary.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.weeklySummary = action.payload; 
            })
            .addCase(getWeeklySummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
})

export default workTimeSlice.reducer;
