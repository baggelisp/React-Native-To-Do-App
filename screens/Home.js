import {SafeAreaView, StyleSheet, Text, View , Platform, TouchableOpacity, Keyboard, KeyboardAvoidingView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react'
import Task from '../components/Task';
import { getData } from '../services/storage';

export default function Home({navigation}) {

    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([])
    const [username, setUsername] = useState('');

    useEffect( () => {
      const savedNamePromise = getData('username');
      savedNamePromise.then( username => {
        if (!username) return;
        if (username == 'error') {
          navigation.navigate('AddName');
        }
        setUsername(username);
      })
    }, [])
    
    const handleAddTask = () => {
        navigation.navigate('AddTask');
        return;
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]);
        setTask('');
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }

  return (
        <SafeAreaView style={styles.container}>
            {/* Today's tasks */}
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>What's up{username && `, ${username}`}!</Text>
                <View style={styles.items}>
                {
                    taskItems.map((item, index) => {
                    return (
                        <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                          <Task textInput={item} /> 
                        </TouchableOpacity>
                    )
                    })
                }
                {
                  !taskItems.length && (<Text>No task yet! </Text>)
                }
                </View>
            </View>

            {/* White a task */}

            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
            >
                <TextInput value={task} onChangeText={text => setTask(text)} placeholder="Write a task!" style={styles.textInput} />

                <TouchableOpacity onPress={handleAddTask}>
                  <View style={styles.addWrapper}>
                      <Text style={styles.addText}>+</Text>
                  </View>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>

        </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F3F3',
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color:'#595959'
    },
    items: {
      marginTop: 30
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    textInput: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    }, 
    addText: {
      fontSize: 24,
      color: '#C0C0C0'
    }
  });
  