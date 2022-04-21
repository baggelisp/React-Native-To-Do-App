import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function Task({textInput}) {
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.circular}></TouchableOpacity>
            <Text style={styles.itemText}>{textInput}</Text>
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
        flexWrap: 'wrap'
    },
    circular: {
        width: 24,
        height: 24,
        marginRight: 15,
        borderColor: '#55BCF6',
        borderWidth: 3,
        borderRadius: 12,
    },
    itemText: {
        maxWidth: '80%',
    }
});