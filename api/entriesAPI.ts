import axios from 'axios'
import { Entry } from '../entities/entry'
import { CreateEntryDTO } from '../entities/CreateEntryDTO'
import { UpdateEntryDTO } from '../entities/UpdateEntryDTO'
import { BASE_URL } from '../config'

export class EntryAPI {
    static baseUrl = BASE_URL+"/entries";

    static async fetchAllEntries() {
        const response = await axios.get (this.baseUrl);
        return response.data;
    }

    static async fetchSingleEntry(id:number){
        const response = await axios.get(`${this.baseUrl}/${id}`)
    }
    static async createEntry(entry: CreateEntryDTO){
        const response = await axios.post(this.baseUrl, entry);
        return response.data;
    }

    static async deleteEntry(id:number){
        const response = await axios.delete(`${this.baseUrl}/${id}`)
        return response.data
    }

    static async updateEntry(entry:UpdateEntryDTO, id:number){
        const response = await axios.put(`${this.baseUrl}/${id}`, entry )
        return response.data;
    }

    
}