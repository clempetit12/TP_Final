
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import WorkTimeButton from '../components/WorkTimeButton';

 const WorkTime = () => {

    const getCurrentDate = () => {

    
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };
    
      return (
        <View style={styles.container}>

          <View style={styles.header}>
    

          </View>
    
        
          <Text style={styles.welcomeMessage}>Welcome Bianca</Text>
    
  
          <Text style={styles.date}>{getCurrentDate()}</Text>
    
    
          <View style={styles.buttonsContainer}>
        <WorkTimeButton clocking="IN" />
        <View style={styles.separator} />
        <WorkTimeButton clocking="OUT" />
      </View>
      
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

      }
    });
    
    export default WorkTime;
    


