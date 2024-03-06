import axios from "axios";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";
import { BASE_URL } from "../config";

export class EntryAPI {
  static baseUrl = BASE_URL + "/entries";

  static async fetchAllEntries() {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }
  static async createEntry(entry: CreateEntryDTO) {
    const response = await axios.post(this.baseUrl, entry);
    return response.data;
  }

  static async deleteEntry(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    if (response.status === 200)
      return { id }
    else
      return { id: "" }
  }

  static async updateEntry(id: string, entity: any) {
    const response = await axios.put(`${this.baseUrl}/${id}`, entity);
    return response.data;
  }
}
