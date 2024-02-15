import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import EntryList from './pages/EntryList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EntryEdit from './pages/EntryEdit';
import EntryDelete from './pages/EntryDelete';
import AddEntry from './pages/AddEntry';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './pages/Profile';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './pages/About';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function App() {
  type RootStackParamList = {
    AddEntry: undefined;
    EntryList: undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
  };

  const Stack = createStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();
  // const Drawer = createDrawerNavigator(); // This generates an error???

  function StackNavigationEntry() {
    return (
      <Stack.Navigator initialRouteName="EntryList">
          <Stack.Screen name="EntryList" component={EntryList} />
          <Stack.Screen name="EntryEdit" component={EntryEdit} />
          <Stack.Screen name="AddEntry" component={AddEntry} />

          <Stack.Screen name="EntryDelete" component={EntryDelete} 
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => Alert.alert('For real? :-o')}
                  title="DELETE"
                  color="red"
                />
              ),
            })}
          />
        </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'Entries') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'alert'; // Default icon, make sure this is valid
          }

          // Now iconName is explicitly a valid icon key, no error should be thrown
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Entries" component={StackNavigationEntry} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>


        {/* <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={EntryList} />
         <Drawer.Screen name="About" component={About} />
       </Drawer.Navigator> */}

        {/* <Text>Open up App.js to start working on your app!</Text>
        <EntryList />
        <StatusBar style="auto" /> */}
      {/* </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

