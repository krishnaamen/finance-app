import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../entities/entry";
import { EntryAPI } from "../api/entriesAPI";
import { CreateEntryDTO} from "../entities/CreateEntryDTO";
import { UpdateEntryDTO } from "../entities/UpdateEntryDTO";


export interface EntryState {
    entries: Entry [];
    

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
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchEntries.fulfilled,(state,action)=>{
            state.entries = action.payload;
        }),
        builder.addCase(createEntry.fulfilled,(state,action)=>{
            state.entries.push(action.payload);
        }),
        builder.addCase(updateEntry.fulfilled,(state,action)=>{
            const updatedEntry = action.payload;
            const index = state.entries.findIndex((entry) => entry.id === updatedEntry.id);
            if (index !== -1) {
                state.entries[index] = updatedEntry;
              }
            state.entries = state.entries
            .map((entry)=>{
            
              if(entry.id === action?.payload.id){
                entry = action.payload
              }
              return entry;
            })

        })



    }

})

export const {} = entrySlice.actions
export default entrySlice.reducer;
