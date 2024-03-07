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


import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Entry } from '../entities/entry';
import { EntryItem} from '../components/EntryItem'
import { createEntry, fetchEntries } from '../store/entrySlice';
import { CreateEntryDTO } from '../entities/CreateEntryDTO';



type RootStackParamList = {
    AddEntry: undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EntryEdit'>;

type Props = {
    navigation: DetailsScreenNavigationProp;
};


const EntryList: React.FC<Props> = ({ navigation }) => {
    const entries = useSelector(
        (state: RootState) => state.entries.entries)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchEntries())
    }, [])

console.log("entries",entries)


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
                    keyExtractor={(item: Entry) => item.id.toString()}
                    renderItem={({ item }) => (
                        
                        <View style={styles.datastyle}>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate('EntryEdit', { entryId: +item.id })}>
                                   
                                <EntryItem name={item?.name} date={new Date().toString().substring(0,15)} amount={item?.amount} categoryname={item?.category?.name} description={item?.description}   />
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
        justifyContent: 'center',
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
        margin: 20,
    }

})