
const Home = ({employeeId}) => {

    const getCurrentDate = () => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };
    
      return (
        <View style={styles.container}>

          <View style={styles.header}>
    
            <Image source={require('./path/to/logo.png')} style={styles.logo} />

            <Image source={{ uri: employeeImage }} style={styles.employeeImage} />
          </View>
    
        
          <Text style={styles.welcomeMessage}>Welcome Bianca</Text>
    
  
          <Text style={styles.date}>{getCurrentDate()}</Text>
    
    
          <View style={styles.buttonsContainer}>
            <WorkTimeButton clockingType="IN" employeeId={employeeId} />
            <WorkTimeButton clockingType="OUT" employeeId={employeeId} />
          </View>
    
      
          <Text style={styles.hoursWorked}>Total Hours Worked: XX hours</Text>
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
        marginBottom: 20,
      },
      hoursWorked: {
        fontSize: 18,
        textAlign: 'center',
      },
    });
    
    export default Home;
    


