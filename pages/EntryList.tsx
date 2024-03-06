import React from "react";
import {
  Button,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Entry } from "../entities/entry";
import { EntryItem } from "../components/EntryItem";
import { fetchEntries } from "../store/entrySlice";

type RootStackParamList = {
  AddEntry: undefined;
  EntryEdit: { entryId: number };
  EntryDelete: { entryId: number };
};

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EntryEdit"
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};

const EntryList: React.FC<Props> = ({ navigation }) => {
  const entries = useSelector((state: RootState) => state.entries.entries);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          title="Add Entry"
          onPress={() => navigation.navigate("AddEntry")}
        />

        <FlatList
          data={entries}
          keyExtractor={(item: Entry) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.datastyle}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  navigation.navigate("EntryEdit", { entryId: +item.id })
                }
              >
                <EntryItem
                  name={item?.name}
                  date={new Date().toString().substring(0, 15)}
                  amount={item?.amount}
                  description={item?.description}
                  category={item?.category}
                />
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  datastyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5,
  },
  textStyle: {
    marginRight: 5,
  },
  datestyle: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },

  addButton: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    margin: 10,
  },
});
