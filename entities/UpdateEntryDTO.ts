import { Category } from "./category";

export class UpdateEntryDTO {
    id: number;
    amount: number;
    date: string;
    currency: string;
    name: string;
    description: string;
    category: number;

    constructor(
        id: number,
        amount: number,
        date: string,
        currency: string,
        name: string,
        description: string,
        category: number
    ) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.currency = currency;
        this.name = name;
        this.description = description;
        this.category = category
    }
}