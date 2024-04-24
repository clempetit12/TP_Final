import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { accountService } from './accountService';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from './LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails } from '../service/UserDetails';


const LoginPage = () => {
  const BASE_API_URL = "http://10.0.2.2:8090";
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  // const handleLogin = async () => {
  //   try {
  //     await dispatch(login({ email, password }));
  //     // accountService.logout()
  //     // accountService.getToken();
  //     if(accountService.isLogged()){
  //       navigation.navigate('WorkTime');
  //     }
      
  //   } catch (error) {
  //     console.error('Erreur lors de la connexion :', error);
  //     Alert.alert('Erreur lors de la connexion', error.message || 'Une erreur est survenue lors de la connexion');
  //   }
  // };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/loginEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      

      if (data && data.data && data.data.token) {
        // Enregistrement du token dans le local storage
        await accountService.saveToken(data.data.token);
        // await AsyncStorage.setItem('token', data.data.token);
         console.log(getUserDetails());
        navigation.navigate('WorkTime')
      } else {
        throw new Error('Aucun token trouvé dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      Alert.alert('Erreur lors de la connexion', error.message || 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {apiResponse && (
        <Text>API Response: {JSON.stringify(apiResponse)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginPage;

