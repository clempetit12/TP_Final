
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import WorkTimeButton from '../components/WorkTimeButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkTime, getLastStatus, getWeekNumber } from './workTimeSlice';

 const WorkTime = () => {

  const API_URL = "http://10.0.2.2:8090/api/v1/workTime";
const dispatch = useDispatch();
const lastStatus = useSelector(state => state.workTime.lastStatus);
const weekNumber = useSelector(state => state.workTime.weekNumber);
const [employeeId, setEmployeeId] = useState(1)
const laststatus = useSelector(state => state.workTime.lastStatus);
const [isClockInDisabled, setIsClockInDisabled] = useState(false)
const [isClockOutDisabled, setIsClockOutDisabled] = useState(false)



    useEffect(() => {
      dispatch(getLastStatus(employeeId,currentDateValue))
      console.log(currentDateValue)
      console.log(employeeId)
    }, [dispatch,employeeId,currentDateValue]);
     

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
const[currentDateValue, setCurrenDateValue] = useState(getCurrentDate());


const handleClockInPress = () => {
  setIsClockInDisabled(true);
  setIsClockOutDisabled(false);

};

const handleClockOutPress = () => {
  setIsClockOutDisabled(true);
  setIsClockInDisabled(false);

};


useEffect(() => {
  console.log("currentdate"+currentDateValue)
  dispatch(getLastStatus());
  dispatch(getWeekNumber(currentDateValue));


  console.log("weeknumber"+weekNumber)
  console.log("status"+ lastStatus)
}, [dispatch,lastStatus,weekNumber]);





  
    
      return (
        <View style={styles.container}>

          <View style={styles.header}>
    

          </View>
    
        
          <Text style={styles.welcomeMessage}>Welcome Bianca</Text>
    
  
          <Text style={styles.date}>{getCurrentDate()}</Text>

          <Text style={styles.weekNumber}>Week Number : {weekNumber}</Text>
    
          <View style={styles.buttonsContainer}>
      
          <TouchableOpacity
                style={[styles.button, { backgroundColor: "red", opacity: isClockInDisabled ? 0.5 : 1 }]}
                onPress={handleClockInPress}
                disabled={isClockInDisabled}
            >
                <Text style={styles.buttonText}>ClockIn</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "green", opacity: isClockOutDisabled ? 0.5 : 1 }]}
                onPress={handleClockOutPress}
                disabled={isClockOutDisabled}
            >
                <Text style={styles.buttonText}>ClockOut</Text>
            </TouchableOpacity>
        
      </View>

      <View style={styles.bottomBorder}></View>
      
          <Text style={styles.hoursWorked}>Total Hours Worked</Text>
          <Text style={styles.hours}> XX hours</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      logo: {
        width: 50,
        height: 50,
      },
      employeeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      welcomeMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      date: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
      },
      weekNumber: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
      },
      buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 40,
      },
      hoursWorked: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
      },
      hours : {
        fontSize: 20,
        textAlign: 'center',

      },
      bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'black', 
        marginBottom: 10, 
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 100,
        borderRadius: 10,
        marginBottom : 20
      },
      buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      }
    });
    
    export default WorkTime;
    


