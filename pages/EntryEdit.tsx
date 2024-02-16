import React, { useEffect,useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AddEntry from './AddEntry';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


type RootStackParamList = {
    AddEntry:undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
  };
type entry = {
    id: string,
    amount: string,
    date: string,
    currency:string,
    name: string,
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
const id = route.params.entryId;


  const fetchEntry = async () => {
    try {
        const response = await axios.get(`https://b9a7-80-208-69-64.ngrok-free.app/entry/${id}`);
        console.log(response.data); // Process the response data as needed
        setCurrentEntry(response.data);
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
    };


  useEffect(()=>{
    fetchEntry();
    
  },[])
    
    console.log(route.params.entryId);
    
    return (
      <SafeAreaView>
        <View>
        <TextInput
        style={styles.input}
        placeholder={currentEntry?.amount.toString()}
        value={(currentEntry?.amount)?.toString()}
        onChangeText={setAmount}
        
      />
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.name}
        value={(currentEntry?.name)?.toString()}
        onChangeText={setName}
        
      />
      <TextInput
        style={styles.input}
        placeholder={currentEntry?.comment.toString()}
        value={(currentEntry?.comment)?.toString()}
        onChangeText={setComment}
        
      />

            <Button onPress={() => navigation.navigate('EntryDelete', { entryId: route.params.entryId } )} title="update"/>
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
     
  }
})