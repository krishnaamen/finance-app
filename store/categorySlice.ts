import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../entities/category";
import { CategoriesAPI } from "../api/categoriesAPI";
import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

// create the thunk to make async call, the whole react toolkit is synchronous.
export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (thunkAPI) => {
    return await CategoriesAPI.fetchAll();
  },
);

export const createCategory = createAsyncThunk(
  "createCategory",
  async (category: CreateCategoryDTO, thunkAPI) => {
    return await CategoriesAPI.createCategory(category);
  },
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
