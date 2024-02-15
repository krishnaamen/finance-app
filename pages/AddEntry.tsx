import React, { useState } from 'react'
import { View,SafeAreaView,StyleSheet,TextInput } from 'react-native'

function AddEntry() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');


  return (
    <SafeAreaView>
    <View>
    <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enty name"
      />
       <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        placeholder="Amount"
        keyboardType='numeric'
      />
       <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
        placeholder="Comment"
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
      />



    </View>


    </SafeAreaView>
    
  )
}

export default AddEntry

const styles = StyleSheet.create({
    container:{

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})