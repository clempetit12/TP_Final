import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountService } from '../Service/accountService';
import axios from 'axios';

const API_URL = "http://localhost:8090/api/v1/workTime";



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
                "access-control-allow-origin" : "*",
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


export const getHourWorkedYear = createAsyncThunk(
    "workTime/ReportYear'",
    async ({selectedYear, employeeId }) => {
      const intValue = parseInt(selectedYear, 10);
      console.log(accountService.getToken())
        try {
            if (Number.isInteger(selectedYear)) {
                console.log("La valeur est un entier (Integer).");
                console.log(selectedYear)
              } else {
                console.log("La valeur n'est pas un entier (Integer).");
              }
           const response = await axios.get(`${API_URL}/getTotalHourWorkedYear?year=${intValue}&employeeId=${employeeId}`,{ headers: accountService.getToken()});
           console.log(response.data)
            return response.data;
          } catch (error) {
            throw error;
          }
    }
)

export const getHourWorkedMonth = createAsyncThunk(
  "workTime/ReportMonth'",
  async ({selectedYear, selectedMonth, employeeId }) => {
      try {
          console.log(employeeId)
          console.log("selec" +selectedYear)
          const intValue = parseInt(selectedYear, 10);
          const intMonth = parseInt(selectedMonth, 10);
          console.log(intMonth)
     
          if (Number.isInteger(intValue)) {
              console.log("La valeur est un entier (Integer).");
              console.log(intValue)
            } else {
              console.log("La valeur n'est pas un entier (Integer).");
            }
         const response = await axios.get(`${API_URL}/getTotalHourWorked?year=${intValue}&month=${intMonth}&employeeId=${employeeId}`,{ headers: accountService.getToken()});
         console.log(response.data)
          return response.data;
        } catch (error) {
          throw error;
        }
  }
)

export const getHourWorkedDay = createAsyncThunk(
  "workTime/ReportDay'",
  async ({selectedYear, selectedMonth, selectedDay, employeeId }) => {
      try {
          console.log(employeeId)
          console.log("selec" +selectedYear)
          const intValue = parseInt(selectedYear, 10);
          const intMonth = parseInt(selectedMonth, 10);
          console.log(intMonth)
          const intDay = parseInt(selectedDay, 10);
          console.log(intDay)
          if (Number.isInteger(intValue)) {
              console.log("La valeur est un entier (Integer).");
              console.log(intValue)
            } else {
              console.log("La valeur n'est pas un entier (Integer).");
            }
         const response = await axios.get(`${API_URL}/getTotalHourWorked?year=${intValue}&month=${intMonth}&day=${intDay}&employeeId=${employeeId}`,{ headers: accountService.getToken()});
         console.log(response.data)
          return response.data;
        } catch (error) {
          throw error;
        }
  }
)

export const getClockIn = createAsyncThunk(
  'workTime/getClockIn',
  async (employeeId,currentDate) => {
      try {
        const currentDate = new Date().toISOString().split('T')[0]; 
console.log(currentDate);
          const response = await axios.get(`${API_URL}/getClockIn/${employeeId}?date=${currentDate}`);
          console.log("in"+response.data);
          return response.data;
      } catch (error) {
          throw error;
      }
  }
)

export const getClockOut = createAsyncThunk(
  'workTime/getClockOut',
  async (employeeId,currentDate) => {
  
      try {
        const currentDate = new Date().toISOString().split('T')[0]; 
          const response = await axios.get(`${API_URL}/getClockOut/${employeeId}?date=${currentDate}`);
          return response.data;
      } catch (error) {
          throw error;
      }
  }
)

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




export const getAllWorkTime = createAsyncThunk(
    'workTime/AllWorkTime',
    async () => {
        try {
            const response = await fetch(`${API_URL}/allWorkTime`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json(); 
            console.log("allworktime"+data)
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
        hourWorkedYear : null,
        hourWorkedMonth : null,
        hourWorkedDay : null,
        clockIn: null, 
    clockOut: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            .addCase(getAllWorkTime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllWorkTime.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allWorkTime = action.payload; 
            })
            .addCase(getAllWorkTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getClockIn.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(getClockIn.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              state.clockIn = action.payload; 
          })
          .addCase(getClockIn.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })
          .addCase(getClockOut.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getClockOut.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clockOut = action.payload; 
        })
        .addCase(getClockOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getHourWorkedYear.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(getHourWorkedYear.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.hourWorkedYear = action.payload; 
      })
      .addCase(getHourWorkedYear.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(getHourWorkedMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getHourWorkedMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.hourWorkedMonth = action.payload; 
    })
    .addCase(getHourWorkedMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(getHourWorkedDay.pending, (state) => {
      state.loading = true;
      state.error = null;
  })
  .addCase(getHourWorkedDay.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.hourWorkedDay = action.payload; 
  })
  .addCase(getHourWorkedDay.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
  })
         
           
    },
})

export default workTimeSlice.reducer;
