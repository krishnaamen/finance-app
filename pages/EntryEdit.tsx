import React, { useEffect,useState } from 'react';
import { Alert, Button, StyleSheet,TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AddEntry from './AddEntry';
import EntryList from './EntryList';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


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
    comment:string
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
const [comment, setComment] = useState('');
const [category,setCategory] = useState('');
const id = route.params.entryId;


  const fetchEntry = async () => {
    try {
        const response = await axios.get(`https://2563-80-208-69-64.ngrok-free.app/entry/${id}`);
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
          const response = await fetch(`https://2563-80-208-69-64.ngrok-free.app/entry/${id}`, {
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
    if (amount && name && comment) {
      const updatedEntry = { ...currentEntry, amount: parseFloat(amount), name, comment,category };
      try {
        const response = await fetch(`https://2563-80-208-69-64.ngrok-free.app/entry/${id}`, {
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
        
        console.log('Updated entry:');
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
        <TextInput
        style={styles.input}
        placeholder={currentEntry?.amount.toString()}
        value={amount}
        onChangeText={setAmount}
        
      />
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.name}
        value={name}
        onChangeText={setName}
        
      />
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.category}
        value={category}
        onChangeText={setCategory}
        
      />
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.comment.toString()}
        value={comment}
        onChangeText={setComment}
        
      />
      <View style={styles.buttons}>
      <Button onPress={handleUpdate} title='update Now' />
      <Button onPress={handleDelete} title='Delete' />
      </View>
          

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
    justifyContent:'space-around'

  },
  updateDeleteBtn:{
    borderRadius:10
  }
})