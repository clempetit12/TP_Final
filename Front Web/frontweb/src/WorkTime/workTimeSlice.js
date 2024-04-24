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

// export const getReport = createAsyncThunk(
//     'workTime/Report',
//     async ({selectedYear,employeeId}) => {
//         try {
//             const token = accountService.getToken()
//             console.log("selectedyear"+selectedYear)
//             console.log(token)
            
//             const response = await fetch(`${API_URL}/getTotalHourWorked?$year=${selectedYear}&employeeId=${employeeId}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               },
//             });
//             const data = await response.json(); 
//             console.log("report"+data)
//            return data;
//           } catch (error) {
//             console.error('Erreur lors de la récupération du dernier statut :', error);
//           }
//         }
    
// );


export const getReport = createAsyncThunk(
    "workTime/Report'",
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
           const response = await axios.get(`${API_URL}/getTotalHourWorked?year=${intValue}&month=${intMonth}&day=${intDay}&employeeId=${employeeId}`);
           console.log(response.data)
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
        report: null,
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
            .addCase(getReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReport.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.report = action.payload; 
            })
            .addCase(getReport.rejected, (state, action) => {
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
           
    },
})

export default workTimeSlice.reducer;
