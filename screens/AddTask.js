import { Text, View , StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
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
      let newTaskObj = {
        text: task,
        completed: false,
        category: 'none'
      }
      const saveDataPromise = saveData('tasks', JSON.stringify([...tasksArr, newTaskObj]));
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.nameText}>New Task</Text>
        <View style={styles.writeNameWrapper}>
            <TextInput value={task || ''} onChangeText={text => setTask(text)} placeholder="Title" style={styles.textInput} />    
            <TouchableOpacity onPress={handleAddTask}>
              <View style={styles.nextWrapper}>
                  <Text style={styles.addText}>Add</Text>
              </View>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6C63FF',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 40
  },
  addText: {
    fontSize: 20,
    color: '#6C63FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 30,
    top: 80,
    width: 60,
    zIndex: 2
  }, 
  backButton: {
    fontSize: 20,
    color: '#C0C0C0',
  }
});