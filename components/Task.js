import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function Task({textInput, completed}) {
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <TouchableOpacity style={[styles.circular, completed && {backgroundColor: '#6C63FF'} ]}></TouchableOpacity>
            <Text style={[styles.itemText,completed && {textDecorationLine: 'line-through'}]}>{textInput}</Text>
        </View>
        {/* <View style={styles.circular}></View> */}
    </View>
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