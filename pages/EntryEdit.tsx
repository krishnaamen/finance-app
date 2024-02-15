import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AddEntry from './AddEntry';


type RootStackParamList = {
    AddEntry:undefined;
    
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
  };

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'EntryEdit'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EntryEdit'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const EntryEdit: React.FC<Props> = ({route, navigation}) => {
    
    console.log(route.params.entryId);
    
    return (
        <View>
            <Text>Here you can edit the entry</Text>
            <Button onPress={() => navigation.navigate('EntryDelete', { entryId: route.params.entryId } )} title="Delete it!"/>
        </View>
    );
};

export default EntryEdit;
