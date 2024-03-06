import axios from "axios";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";
import { BASE_URL } from "../config";

export class EntryAPI {
  static baseUrl = BASE_URL + "/entries";

  static async fetchAllEntries() {
    //const response = await axios.get(this.baseUrl);
    return [{
      id: 1,
      date: '2024-03-05 20:40',
      amount: 100,
      currency: '1billion danish kroners',
      name: 'Veselin Ivanov',
      description: 'description',
      category: 'category',
    }];
  }
  static async createEntry(entry: CreateEntryDTO) {
    const response = await axios.post(this.baseUrl, entry);
    return response.data;
  }
}
