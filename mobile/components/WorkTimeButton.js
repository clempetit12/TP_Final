import { addWorkTime } from "../screens/workTimeSlice";
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { View, Button, ActivityIndicator } from 'react-native';


export default  WorkTimeButton =({ clocking, employeeId}) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.workTime.loading);

    const handlePress = () => {
        dispatch(addWorkTime({employeeId,clocking}))
    }
    const buttonColor = clocking === 'IN' ? 'green' : 'red';

    return (
        <View style={styles.container}>
        <Button title={`Clock ${clocking}`} onPress={handlePress}color={buttonColor}/>
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
      </View>

    );
}