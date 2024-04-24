import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
    return true; // Succès
  } catch (error) {
    console.error('Error saving token:', error);
    return false; // Échec
  }
};

const saveId = async id => {
  try {
    await AsyncStorage.setItem('id', id.toString());
    return true; // Succès
  } catch (error) {
    console.error('Error saving id:', error);
    return false; // Échec
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return true; // Succès
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    return false; // Échec
  }
};

const isLogged = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return !!token; // Renvoie vrai si le token existe, sinon faux
  } catch (error) {
    console.error('Error checking login status:', error);
    return false; // Échec
  }
};

const printToken = async () => {
  try {
    await AsyncStorage.getItem('token').then(value => {
      return value;
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
  }
};

const getId = async () => {
  try {
    await AsyncStorage.getItem('id').then(value => {
      return value;
    });
  } catch (error) {
    console.error('Erreur lors de la récuperation de id:', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token ? {Authorization: 'Bearer ' + token} : {}; // Retourne les en-têtes d'authentification si le token existe
  } catch (error) {
    console.error('Error getting token:', error);
    return {}; // Échec
  }
};

export const accountService = {
  saveToken,
  logout,
  isLogged,
  getToken,
  printToken,
  saveId,
  getId,
};
