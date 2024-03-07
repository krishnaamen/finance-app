import React, { useEffect,useState } from 'react';
import { Text,Alert, BackHandler, Button, StyleSheet,TextInput, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AddEntry from './AddEntry';
import EntryList from './EntryList';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../config';


type RootStackParamList = {
    AddEntry:undefined;
    EntryList:undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
  };
type entry = {
    id: string,
    amount: string,
    date: string,
    currency:string,
    name: string,
    category:string,
    description:string
}

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'EntryEdit'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EntryEdit'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const EntryEdit: React.FC<Props> = ({route, navigation}) => {
const [currentEntry, setCurrentEntry] = useState<entry |null>(null)
const [name, setName] = useState('');
const [amount, setAmount] = useState('');
const [description, setDescription] = useState('');
const [category,setCategory] = useState('');
const id = route.params.entryId;


  const fetchEntry = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/entries/${id}`);
        console.log('response from id ',response.data);
        setCurrentEntry(response.data);
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
    };


  useEffect(()=>{
    fetchEntry();
    
  },[])

  const handleDelete = () => {
    Alert.alert('Delete Confirmation', 'Are you sure you want to delete this entry', [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate('EntryList'),
        style: 'cancel'
      },
      {text: 'OK', onPress: async () => {


        try {
          const response = await fetch(`${BASE_URL}/entries/${id}`, {
            method: 'delete',
          });
          navigation.navigate('EntryList');
          }catch(e){
        console.log(e);

      }
      
    }


      }

  ])}
 

  const handleUpdate = async () => {
    // Make sure all fields are filled before updating
    if (amount && name) {
      const updatedEntry = { ...currentEntry, amount: parseFloat(amount), name, description,category };
      try {
        const response = await fetch(`${BASE_URL}/entries/${id}`, {
          method: 'patch',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEntry),
        });
        const data = await response.json();
        Alert.alert("Updated","Data updated successfully click ok to go back to the main page.",[
          { text: 'OK', onPress: () => navigation.navigate('EntryList') }
        ]);
        
        console.log('Updated entry:',data);
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    } else {
      Alert.alert('Please fill in all fields');
    }
  };


    return (
      <SafeAreaView>
        <View>
        <Text style={styles.labelText}>Amount</Text>
        <TextInput
        style={styles.input}
        placeholder={currentEntry?.amount.toString()}
        value={amount}
        onChangeText={setAmount}
        
      />
      <Text style={styles.labelText}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.name}
        value={name}
        onChangeText={setName}
        
      />
      <Text style={styles.labelText}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.category?.name}
        value={category?.name}
        onChangeText={setCategory}
        
      />
      <Text style={styles.labelText}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.description?.toString()}
        value={description}
        onChangeText={setDescription}
        
      />
      

      <TouchableOpacity
                style={styles.createButton}
                onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>

      </TouchableOpacity>

      <TouchableOpacity
                style={styles.createButton}
                onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>

      </TouchableOpacity>




    
          

            {/*<Button onPress={() => navigation.navigate('EntryDelete', { entryId: route.params.entryId } )} title="update"/> */}
        </View>
        </SafeAreaView>
    );
};




export default EntryEdit;
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
     
  },
  buttons:{
    display:'flex',
    flexDirection:'row',
    borderRadius:20,
    margin:10,
    padding:10,
    justifyContent:'space-around'

  },
  updateDeleteBtn:{
    borderRadius:10
  },
  labelText:{
    marginLeft:10,
  },
  createButton:{
    display:'flex',
    margin:10,
    flexDirection:'row',
    borderRadius:20,
    backgroundColor:"#2c6979",
    justifyContent:'space-between',
  
},


})