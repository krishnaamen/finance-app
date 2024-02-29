import axios from 'axios'
import { Entry } from '../entities/entry'
import { entryDTO } from '../entities/CreateEntryDTO'
import { BASE_URL } from '../config'

export class EntryAPI {
    static baseUrl = BASE_URL+"/entries";

    static async fetchAllEntries() {
        const response = await axios.get (this.baseUrl);
        return response.data;
    }
    static async createEntry(entry: entryDTO){
        const response = await axios.post(this.baseUrl, entry);
        return response.data;
    }
}