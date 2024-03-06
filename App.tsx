import { StatusBar } from "expo-status-bar";
import { Alert, Button } from "react-native";
import EntryList from "./pages/EntryList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EntryEdit from "./pages/EntryEdit";
import EntryDelete from "./pages/EntryDelete";
import AddEntry from "./pages/AddEntry";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Categories } from "./pages/Categories";

type RootStackParamList = {
  AddEntry: undefined;
  EntryList: undefined;
  EntryEdit: { entryId: number };
  EntryDelete: { entryId: number };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function StackNavigationEntry() {
  return (
    <Stack.Navigator
      initialRouteName="EntryList"
      screenOptions={({ route }) => ({
        headerTitle: {
          AddEntry: 'Add Entry',
          EntryList: 'Entry List',
          EntryEdit: 'Entry Edit',
          EntryDelete: 'Entry Delete'
        }[route.name]
      })}>
      <Stack.Screen name="EntryList" component={EntryList} />
      <Stack.Screen name="EntryEdit" component={EntryEdit} />
      <Stack.Screen name="AddEntry" component={AddEntry} />

      <Stack.Screen
        name="EntryDelete"
        component={EntryDelete}
        options={() => ({
          headerRight: () => (
            <Button
              onPress={() => Alert.alert("For real? :-o")}
              title="DELETE"
              color="red"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: React.ComponentProps<typeof Ionicons>["name"];

              switch (route.name) {
                case "Entries": {
                  iconName = focused ? "cash" : "cash-outline";
                  break
                }
                case "Profile": {
                  iconName = focused ? "settings" : "settings-outline";
                  break
                }
                default: {
                  throw new Error("unknown route")
                }
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            headerShown: false
          })}
        >
          <Tab.Screen name="Entries" component={StackNavigationEntry} />
          <Tab.Screen name="Profile" component={Categories} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
