import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
      return 'ok'
    } catch(e) {
        return 'error'
    }
}


export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value;
    } catch(e) {
      // error reading value
    }
  }