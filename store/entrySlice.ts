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
export const deleteEntry = createAsyncThunk(
  "deleteEntry",
  async (id : string) => {
    return await EntryAPI.deleteEntry(id);
  },
);
export const updateEntry = createAsyncThunk(
  "updateEntry",
  async ({id, entity} : any) => {
    return await EntryAPI.updateEntry(id, entity);
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
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      state.entries = state.entries.filter(
        (entry) => String(entry.id) !== action.payload.id
        );
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
        state.entries = state.entries.map((entry) => {
            if (String(entry.id) === action.payload.id) {
            return action.payload;
            }
            return entry;
        });
    });
  }
});

export const {} = entrySlice.actions;
export default entrySlice.reducer;
