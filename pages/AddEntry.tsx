import React, { useState } from 'react'
import { View,Text,SafeAreaView,StyleSheet,TextInput,TouchableOpacity, Alert } from 'react-native'

function AddEntry() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [category,setCategory] = useState('');
    
    const addEntry = async() => {
        const amt = amount;
        const amountfinal = Number(amount);

        //https://b9a7-80-208-69-64.ngrok-free.app

      try{
        const response = await fetch("https://2563-80-208-69-64.ngrok-free.app/entry",{
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount:amountfinal,
                comment:comment,
                currency:"DKK",
                date:new Date().toISOString(),
                category: category,
                name:name
            })
        })
        const newresponse = await response.json();
        console.log(newresponse);

      } 
      catch (error) {
        console.error('Error updating entry:', error);
      }
        
        


      navigation.navigate('EntryList')
        console.log(name,amount,comment);
        setName("");
        setAmount("");
        setComment("");
        setCategory("");

    }

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
        onChangeText={setCategory}
        value={category}
        placeholder="Enty Category"
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
      <TouchableOpacity
      style={styles.addButton}
      onPress={addEntry}
      >
    <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>
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
    addButton:{
        display:'flex',
        borderRadius:20,
        backgroundColor:"#2c6979",
        margin:10
    },
    buttonText:{
        padding:20,
        marginLeft:'25%',
        color:'white',
        fontSize:30,
       
    }
})