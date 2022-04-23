import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';

function Task({index, textInput, completed, onSwipeLeft, onSwipeRight}) {
  return (
    <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={ () => swipeFromLeftOpen(index, onSwipeRight) }
        onSwipeableLeftOpen={ () => swipeFromLeftOpen(index, onSwipeLeft) }
    >
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={[styles.circular, completed && {backgroundColor: '#6C63FF'} ]}></TouchableOpacity>
                <Text style={[styles.itemText,completed && {textDecorationLine: 'line-through'}]}>{textInput}</Text>
            </View>
            {/* <View style={styles.circular}></View> */}
        </View>
    </Swipeable>
  )
}

export default Task


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%'
    },
    circular: {
        width: 24,
        height: 24,
        marginRight: 15,
        borderColor: '#6C63FF',
        borderWidth: 3,
        borderRadius: 6,
    },
    itemText: {
        maxWidth: '80%',
        fontSize: 14,
        color:'#595959'
    }
});



const LeftSwipeActions = () => {
    return (
      <View
        style={{ 
            flex: 1, 
            backgroundColor: '#ccffbd', 
            justifyContent: 'center',
            marginBottom: 20,
            borderRadius: 10 
        }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Complete
        </Text>
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          flex: 1, 
          backgroundColor: '#EB343F', 
          justifyContent: 'center',
          marginBottom: 20,
          borderRadius: 10 
        }}
      >
        <Text
          style={{
            color: '#1b1a17',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
            textAlign: 'right'
          }}
        >
          Delete
        </Text>
      </View>
    );
  };
  const swipeFromLeftOpen = (index, onSwipeLeftFun) => {
    onSwipeLeftFun(index);
  };
  const swipeFromRightOpen = (index, onSwipeRightFun) => {
    onSwipeRightFun(index);
  };