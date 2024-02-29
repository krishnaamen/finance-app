export class Entry {

    id: number;
    amount: number;
    currency: string;
    name: string;
    description: string;
    category: number;


    constructor(id: number, amount: number, currency: string, name: string, description: string, category: number) {
        this.id = id;
        this.amount = amount;
        this.currency = currency;
        this.name = name;
        this.description = description;
        this.category = category;
    }

}