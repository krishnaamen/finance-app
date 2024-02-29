import React, { useState } from 'react'
import { View,Text,SafeAreaView,StyleSheet,TextInput,TouchableOpacity, Alert} from 'react-native'
import { BASE_URL,CategoryEnum} from '../config';
import {Picker} from '@react-native-picker/picker';


function AddEntry() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [category,setCategory] = useState('');
    const [catId, setCatId] = useState(5)
    
    const addEntry = async() => {
        const amt = amount;
        const amountfinal = Number(amount);

        

      try{
        const response = await fetch(`${BASE_URL}/entries`,{
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount:amountfinal,
                description:comment,
                currency:"DKK",
                date:new Date().toISOString(),
                category: catId,
                name:name
            })
        })
        const newresponse = await response.json();
        console.log(newresponse);

      } 
      catch (error) {
        console.error('Error updating entry:', error);
      }
        
        


      //navigation.navigate('EntryList')
        console.log(name,amount,comment);
        setName("");
        setAmount("");
        setComment("");
        setCategory("");

    }


    // const categoryItems = Object.keys(CategoryEnum).map((key,i) => {
    //   const categoryId:any = CategoryEnum[key as keyof typeof CategoryEnum];
    //   setCatId(categoryId);
    
    //   return <Picker.Item key={categoryId} label={key} value={categoryId} />;
    // });



  return (
    <SafeAreaView>
    <View>

     <Picker
      selectedValue={category}
      onValueChange={(itemValue) => setCategory(itemValue)}>
      <Picker.Item label="Food" value="1" />
          <Picker.Item label="Transport" value="2" />
          <Picker.Item label="Entertainment" value="3" />
          <Picker.Item label="Bills" value="4" />
          <Picker.Item label="Others" value="5" />
    </Picker>

          {/*<Picker.Item label="Food" value="1" />
          <Picker.Item label="Transport" value="2" />
          <Picker.Item label="Entertainment" value="3" />
          <Picker.Item label="Bills" value="4" />
          <Picker.Item label="Others" value="5" />
          */}
        

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