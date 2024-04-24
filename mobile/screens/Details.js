import { StyleSheet, View,Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getWeekNumber, getWeeklySummary } from './workTimeSlice';
import { Picker } from '@react-native-picker/picker';



const Details = () => {
    const DateFormat = "DD/MM/YYYY";
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(moment().format(DateFormat));
    const [endDate, setEndDate] = useState(moment().add(1, 'year').format(DateFormat));
    const [dateVisible, setDateVisible] = useState(false);
    const [calendarDate, setCalendarDate] = useState(new Date());
    const weeklySummary = useSelector(state => state.workTime.weeklySummary);

    const weekNumber = useSelector(state => state.workTime.weekNumber);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || calendarDate;
        setCalendarDate(currentDate);
        setStartDate(moment(currentDate).format(DateFormat));
        setDateVisible(false);
    };

    const [selectedWeek, setSelectedWeek] = useState(1);

    const handleWeekChange = (inputText) => {
        const weekNumber = parseInt(inputText);
        if (!isNaN(weekNumber) && weekNumber >= 1 && weekNumber <= 52) {
          setSelectedWeek(weekNumber);
        }
      };

    const openDatePicker = () => {
        setDateVisible(true);
    };

  

    useEffect(() => {
        const formattedStartDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        console.log("formattedStartDate", formattedStartDate);
        
        dispatch(getWeekNumber({ date: formattedStartDate })).then((action) => {
            console.log("weeknumber", action.payload);
            
           console.log("selectedweek" + selectedWeek)
      
            dispatch(getWeeklySummary({selectedWeek }));

            console.table(weeklySummary);
            console.log("weekly summary - key1:", weeklySummary.key1);
console.log("weekly summary - key2:", weeklySummary.key2);


        });
    }, [dispatch, startDate]);

    
    const renderRow = (daySummary) => {
        return (
            <View style={styles.row}>
                <Text style={[styles.cell,styles.dayWeek]}>{daySummary.day}</Text>
                <Text style={styles.cell}>{daySummary.startTime}</Text>
                <Text style={styles.cell}>{daySummary.endTime}</Text>
                <Text style={[styles.cell,styles.boldText]}>{daySummary.totalHour}</Text>
                <Text style={[styles.cell,styles.redText]}>{daySummary.totalOvertime}</Text>
            </View>
        );
        };
    return (
        <View style={styles.container}>
 <View style={styles.container}>
      <Text>Sélectionnez une semaine :</Text>
      <Picker
        selectedValue={selectedWeek}
        onValueChange={(itemValue, itemIndex) => handleWeekChange(itemValue)}
      >
        {[...Array(52).keys()].map((week) => (
          <Picker.Item key={week} label={`Semaine ${week + 1}`} value={week + 1} />
        ))}
      </Picker>
        
    

            <View style={styles.container}>
            <Text style={styles.heading}>Weekly Summary</Text>
                <View style={styles.headerCell}>
                    <Text style={styles.heading}>Day</Text>
                    <Text style={styles.heading}>Start Time</Text>
                    <Text style={styles.heading}>End Time</Text>
                    <Text style={styles.heading}>Total Hour</Text>
                    <Text style={styles.heading}>Total Overtime</Text>
                </View>
                {weeklySummary ? (
        <FlatList
          data={weeklySummary.daySummaries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderRow(item)}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
            </View>

            <View style={styles.bottomBorder}></View>
            {weeklySummary && (
      <>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Work Hours:</Text>
          <Text style={styles.totalText}>{weeklySummary.totalWorkHours}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Overtime Hours:</Text>
          <Text style={styles.totalText}>{weeklySummary.totalOvertimeHours}</Text>
        </View>
      </>
    )}
        </View> 
        </View> 
     
        


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerCell: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10
    },
    heading:{
        flex:1
    },
    row : {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:8,
        marginHorizontal: 2,
        elevation: 1,
        borderRadius: 3,
        borderColor: "#fff",
        padding: 10,
        backgroundColor:  "#fff",
        alignItems: "center", 
    },
    cell : {
        fontSize: 15,
        flex:1,
        alignItems : "center"
       
    },
    redText : {
        color : "red",
        fontWeight: "bold",
        fontSize: 20,
    },
    boldText : {
        fontWeight: "bold",
        fontSize: 20,
    },
    dayWeek : {
        fontWeight: "bold",
        fontSize: 12,
    },
    totalRow : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom : 5,
        textAlign: 'center'
    },
    totalLabel : {
        fontSize : 25
    },
    totalText : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'black', 
        marginBottom: 10, 
      }
    
});

export default Details;
