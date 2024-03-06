import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { createCategory, fetchCategories } from "../store/categorySlice";
import { CategoryItem } from "../components/CategoryItem";
import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";

export function Categories() {
  const [text, setText] = React.useState("");
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder={"Category"}
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => dispatch(createCategory(new CreateCategoryDTO(text)))}
        >
          <Text style={styles.buttonText}>Create Category</Text>
        </TouchableOpacity>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryItem name={item.name} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  createButton: {
    display: "flex",
    borderRadius: 20,
    backgroundColor: "#2c6979",
    margin: 10,
  },
  buttonText: {
    padding: 20,
    marginLeft: "20%",
    color: "white",
    fontSize: 30,
  },
});
