import axios from "axios";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";
import { BASE_URL } from "../config";
import { Entry } from "../entities/entry";

export class EntryAPI {
  static baseUrl = BASE_URL + "/entries";

  static async fetchAllEntries() {
    const response = await axios.get(this.baseUrl);
    return [new Entry(
      1,
      '2024-03-05 20:40',
      100,
      '1billion danish kroners',
      'Veselin Ivanov j0',
      'description',
      'categoryj',
    )];
  }
  static async createEntry(entry: CreateEntryDTO) {
    const response = await axios.post(this.baseUrl, entry);
    return response.data;
  }
}
