import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View,StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddEntry from './AddEntry';

type RootStackParamList = {
    AddEntry: undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
  };

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EntryEdit'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};
type listData = {
    id: string,
    amount: string,
    date: string,
    currency:string,
    name: string,
    comment:string
}



const EntryList: React.FC<Props> = ({navigation}) => {
    const [entries, setEntries] = useState<listData [] | null>([]);

    const baseUrl = 'https://2d0a-80-208-69-64.ngrok-free.app'
    const fetchEntries = async () => {
    try {
        const response = await axios.get(baseUrl + '/entry');
        console.log(response.data); // Process the response data as needed
        setEntries(response.data);
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
    };


    useEffect(() => {
        fetchEntries();
    }, [])




    return (


        <SafeAreaView>
        <View style={styles.container}>
            <Button 
            title='Add Entry'
            onPress={()=>navigation.navigate('AddEntry')}
            />


            <Text>Entry-list</Text>
            <FlatList
                data={entries}
                keyExtractor={(item:listData) => item.id}
                renderItem = {({item})=>(
                    <View style={styles.datastyle}>
                        <Text style={styles.textStyle}>{item.id}</Text>
                        <Text style={styles.textStyle}>{item.date.toString()}</Text>
                        <Text style={styles.textStyle}>{item.name}</Text>
                        <Text style={styles.textStyle}>{item.amount} {item.currency}</Text>
                    </View>
                   
                
    )}
                />
            <Button onPress={() => navigation.navigate('EntryEdit', {entryId: 1 /*test*/})} title="Go edit"/>
        </View>
        </SafeAreaView>
    );
};

export default EntryList;

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'90%'
    },
    datastyle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        margin:5
    },
    textStyle:{
        marginRight:5,
       
    }

})