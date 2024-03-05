import { Category } from "./category";

export class CreateEntryDTO {
  amount: number;
  date: Date;
  currency: string;
  name: string;
  description: string;
  category: string;

  constructor(
    amount: number,
    date: Date,
    currency: string,
    name: string,
    description: string,
    category: string,
  ) {
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.description = description;
    this.category = category;
  }
}
