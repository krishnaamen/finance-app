import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";
import { createEntry } from "../store/entrySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

function AddEntry() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeAreaView>
      <View>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Food" value="1" />
          <Picker.Item label="Transport" value="2" />
          <Picker.Item label="Entertainment" value="3" />
          <Picker.Item label="Bills" value="4" />
          <Picker.Item label="Others" value="5" />
        </Picker>

        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enty name"
        />

        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          value={amount}
          placeholder="Amount"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Comment"
          maxLength={40}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            dispatch(
              createEntry(
                new CreateEntryDTO(
                  Number(amount),
                  new Date(),
                  "DKK",
                  name,
                  description,
                  category,
                ),
              ),
            )
          }
        >
          <Text style={styles.buttonText}>Create Entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AddEntry;

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  addButton: {
    display: "flex",
    borderRadius: 20,
    backgroundColor: "#2c6979",
    margin: 10,
  },
  buttonText: {
    padding: 20,
    marginLeft: "25%",
    color: "white",
    fontSize: 30,
  },
});
