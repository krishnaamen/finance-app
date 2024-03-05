import { Category } from "./category";

export class Entry {
  id: number;
  date: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  category: string;

  constructor(
    id: number,
    date: string,
    amount: number,
    currency: string,
    name: string,
    description: string,
    category: string,
  ) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.currency = currency;
    this.name = name;
    this.description = description;
    this.category = category;
  }
}
