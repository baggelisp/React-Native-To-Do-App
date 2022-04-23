import {SafeAreaView, StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react'
import Task from '../components/Task';
import { getData, saveData } from '../services/storage';
import Toast from 'react-native-toast-message';
import { useIsFocused } from "@react-navigation/native";

export default function Home({navigation}) {
    const isFocused = useIsFocused();
    const [taskItems, setTaskItems] = useState([])
    const [username, setUsername] = useState('');

    // Load Username
    useEffect( () => {
      const savedNamePromise = getData('username');
      savedNamePromise.then( username => {
        if (!username ||  username == 'error'){
          navigation.navigate('AddName');
        }
        setUsername(username);
      })
    }, [])
    
    // Load tasks
    useEffect( () => {
      if (!isFocused) return;
      const tasksPromise = getData('tasks');
      tasksPromise.then( tasks => {
        if (!tasks) tasks = '[]';
        let tasksArr = JSON.parse(tasks);
        setTaskItems([...tasksArr])
      })
    }, [isFocused])
    
    const handleAddTask = () => {
        navigation.navigate('AddTask');
    }

    const completeTask = (index) => {
      let completedTask = {
        category: taskItems[index].category || 'none',
        completed: !taskItems[index].completed,
        text: taskItems[index].text || ''
      }
      let itemsCopy = [...taskItems];
      itemsCopy[index] = {...completedTask}
      setTaskItems(itemsCopy);
      const saveDataPromise = saveData('tasks', JSON.stringify([...itemsCopy]));
      saveDataPromise.then( result => {
        Toast.show({
          type: 'success',
          text1: `Task ${taskItems[index].completed ? 'uncompleted' : 'completed'}!`,
        });
      });
    }

    const deleteTask = (index) => {
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
      const saveDataPromise = saveData('tasks', JSON.stringify([...itemsCopy]));
      saveDataPromise.then( result => {
        Toast.show({
          type: 'success',
          text1: 'Task deleted!',
        });
      });
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
                          <Task textInput={item.text} completed={item.completed}/> 
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

            <TouchableOpacity style={styles.addWrapper} onPress={handleAddTask}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>

        </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F3F3',
    },
    tasksWrapper: {
      paddingTop: 40,
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
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#6C63FF',
      borderWidth: 1,
      position: 'absolute',
      bottom: 30,
      right: 30
    }, 
    addText: {
      fontSize: 24,
      color: '#6C63FF',
      fontWeight: 'bold'
    },
  });
  