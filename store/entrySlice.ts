import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Entry } from "../entities/entry";
import { EntryAPI } from "../api/entriesAPI";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";

export interface EntryState {
  entries: Entry[];
}

const initialState: EntryState = {
  entries: [],
};

export const fetchEntries = createAsyncThunk(
  "fetchEntries",
  async () => {
    return await EntryAPI.fetchAllEntries();
  },
);

export const createEntry = createAsyncThunk(
  "createEntry",
  async (entry: CreateEntryDTO) => {
    return await EntryAPI.createEntry(entry);
  },
);

export const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.entries = action.payload;
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      state.entries.push(action.payload);
    });
  },
});

export const {} = entrySlice.actions;
export default entrySlice.reducer;
