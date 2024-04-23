import React from 'react';
import { useDispatch } from 'react-redux';
import { addWorkTime } from '../screens/workTimeSlice';
import { FontAwesome5 } from '@expo/vector-icons';


import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'

const WorkTimeButton = ({ clocking }) => {
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(addWorkTime({ clocking }));
        
    };

 
    const buttonColor = clocking === 'IN' ? 'red' : 'green';
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handlePress}>
        <Text style={styles.buttonText}>{`Clock ${clocking}`} </Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
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
    },
  });
  
  export default WorkTimeButton;