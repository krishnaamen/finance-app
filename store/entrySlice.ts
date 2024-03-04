import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../entities/entry";
import { EntryAPI } from "../api/entriesAPI";
import { CreateEntryDTO} from "../entities/CreateEntryDTO";
import { UpdateEntryDTO } from "../entities/UpdateEntryDTO";


export interface EntryState {
    entries: Entry [];

}

export interface EntryState1 {
    entry: Entry;
}


const initialState: EntryState = {
    entries: [],

}

export const fetchEntries = createAsyncThunk(
    'fetchEntries',
    async (thunkAPI) =>{
        return await EntryAPI.fetchAllEntries();

    }
)

export const createEntry = createAsyncThunk(
    'createEntry',
    async (entry:CreateEntryDTO,thunkAPI)=>{
        
        return await EntryAPI.createEntry(entry)
    }
)
export const fetchSingleEntry = createAsyncThunk(
    "fetchSingleEntry",
    async(id:number,thunkAPI)=>{
        return await EntryAPI.fetchSingleEntry(id);
    }
)


export const updateEntry = createAsyncThunk(
    'updateEntry',
    async (entry:UpdateEntryDTO,thunkAPI) =>{
        const {id, ...fields} = entry;
        return await EntryAPI.updateEntry(entry,id);
    }
)

export const entrySlice = createSlice({
    name:'entry',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchEntries.fulfilled,(state,action)=>{
            state.entries = action.payload;
        }),
        builder.addCase(createEntry.fulfilled,(state,action)=>{
            state.entries.push(action.payload);
        })

        builder.addCase(fetchSingleEntry.fulfilled,(state,action)=>{
            state.entry  = action.payload;
        })
    }

})

export const {} = entrySlice.actions
export default entrySlice.reducer;
