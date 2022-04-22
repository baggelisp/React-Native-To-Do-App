import { Text, View , StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { saveData, getData } from '../services/storage';
import Toast from 'react-native-toast-message';

const staticImage = require("../assets/undraw_To_do_list_re_9nt7.png");

const AddTask = ({navigation}) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (!task) {
      Toast.show({
        type: 'error',
        text1: 'Please add title!',
      });
      return;
    }
    const tasksPromise = getData('tasks');
    tasksPromise.then( tasks => {
      if (!tasks) tasks = '[]';
      let tasksArr = JSON.parse(tasks);
      const saveDataPromise = saveData('tasks', JSON.stringify([...tasksArr, task]));
      saveDataPromise.then( result => {
        Toast.show({
          type: 'success',
          text1: 'Task added!',
        });
        setTask('');
        setTimeout(() => {
          navigation.goBack(null);
        }
        , 1000)
      }, error =>{
        Toast.show({
          type: 'error',
          text1: 'There was an error..Please try again.',
        });
      })
    }, error => {
      Toast.show({
        type: 'error',
        text1: 'There was an error..Please try again.',
      });
    })

  }

  const goBack = () => {
    navigation.goBack(null);
  }

  return (
    <SafeAreaView style={styles.content}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={goBack}>
          <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Image
        style={styles.stretch}
        source={staticImage}
      />
      <Text style={styles.nameText}>New Task</Text>
      <View style={styles.writeNameWrapper}>
          <TextInput value={task || ''} onChangeText={text => setTask(text)} placeholder="Title" style={styles.textInput} />    
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.nextWrapper}>
                <Text style={styles.addText}>Add</Text>
            </View>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}



export default AddTask


var styles = StyleSheet.create({
  content:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#ffffff',
      paddingBottom: 80
  },
  stretch: {
    width: 300,
    height: 200,
    resizeMode: 'stretch',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#595959',
    textAlign:'left',
    width: '70%'
  },
  writeNameWrapper: {
    paddingTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    width: 300,
  },
  nextWrapper: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 40
  },
  addText: {
    fontSize: 24,
    color: '#C0C0C0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 30,
    top: 30,
    width: '40'
  }, 
  backButton: {
    fontSize: 20,
    color: '#C0C0C0',
  }
});