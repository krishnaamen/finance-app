import { RouteProp, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddEntry from './AddEntry';
import { BASE_URL } from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


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
    currency: string,
    name: string,
    category: string,
    description: string
}

const EntryList: React.FC<Props> = ({ navigation }) => {
    const [entries, setEntries] = useState<listData[]>([]);


    const fetchEntries = async () => {
        try {
            const response = await axios.get(BASE_URL + '/entries');
            console.log(response.data);
            const data = await response.data; // Process the response data as needed
            setEntries(data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };


    useFocusEffect(
        useCallback(() => {
            fetchEntries()
        }, []))




    return (


        <SafeAreaView >

            <View style={styles.container}>
                <Button
                    title='Add Entry'
                    onPress={() => navigation.navigate('AddEntry')}
                />


                <Text>Entry-list</Text>
                <FlatList
                    data={entries}
                    keyExtractor={(item: listData) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.datastyle}>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate('EntryEdit', { entryId: +item.id })}>

                                <Text style={styles.datestyle}>{item?.date?.toString().substring(0, 10)}</Text>
                                <Text style={styles.textStyle}>{item?.name}</Text>
                                <Text style={styles.textStyle}>{item?.amount} {item.currency}</Text>

                                <Ionicons name="trash" size={22} color="red" />
                                <FontAwesome name="edit" size={22} color="blue" />


                            </TouchableOpacity>

                        </View>


                    )}
                />
            </View>

        </SafeAreaView>
    );
};

export default EntryList;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    datastyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5
    },
    textStyle: {
        marginRight: 5,

    },
    datestyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 5
    },

    addButton: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        margin: 10
    }

})