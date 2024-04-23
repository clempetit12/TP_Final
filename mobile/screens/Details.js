import { StyleSheet, View,Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getWeekNumber } from './workTimeSlice';


const Details = () => {
    const DateFormat = "DD/MM/YYYY";
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(moment().format(DateFormat));
    const [endDate, setEndDate] = useState(moment().add(1, 'year').format(DateFormat));
    const [dateVisible, setDateVisible] = useState(false);
    const [calendarDate, setCalendarDate] = useState(new Date());

    const weekNumber = useSelector(state => state.workTime.weekNumber);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || calendarDate;
        setCalendarDate(currentDate);
        setStartDate(moment(currentDate).format(DateFormat));
        setDateVisible(false);
    };


    const openDatePicker = () => {
        setDateVisible(true);
    };

    useEffect(() => {
        const formattedStartDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        console.log("formattedStartDate", formattedStartDate);
        
        dispatch(getWeekNumber({ date: formattedStartDate })).then((action) => {
            console.log("weeknumber", action.payload);
        });
    
    }, [dispatch, startDate]);
    
    

    return (
        <View style={styles.container}>
            <DatePicker
                modal
                mode="date"
                display="spinner"
                value={calendarDate}
                isVisible={dateVisible}
                onChange={onDateChange}
                onCancel={() => setDateVisible(false)}
                minimumDate={new Date()}
            />
            <TouchableOpacity onPress={openDatePicker}>
                <Text>{startDate}</Text>
            </TouchableOpacity>
        
            <Text style={styles.weekNumber}>Week Number : {weekNumber}</Text>
        </View>



        


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    
});

export default Details;
