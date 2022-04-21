import { Text, View , StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'

const staticImage = require("../assets/undraw_Swipe_profiles_re_tvqm.png");

const AddName = () => {
  const [name, setName] = useState('');

  const handleAddName = () => {
    console.log(name)
  }

  return (
      <View style={styles.content}>
        <Image
          style={styles.stretch}
          source={staticImage}
        />
        <Text style={styles.nameText}>Your Name: </Text>
        <View style={styles.writeNameWrapper}>
            <TextInput value={name} onChangeText={text => setName(text)} placeholder="Your name!" style={styles.textInput} />    
            <TouchableOpacity onPress={handleAddName}>
              <View style={styles.nextWrapper}>
                  <Text style={styles.addText}>Next</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
  )
}

export default AddName


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
    fontWeight: 'bold'
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
  nextIcon: {
    color: '#C0C0C0',
    fontSize: 20,
    backgroundColor: '#C0C0C0'
  }
});
