import * as Big from "big.js";

export default class Stutz {

    private amount: BigJsLibrary.BigJS;
    private currencyCode: string;

    constructor(currencyCode: string, value: string) {
        this.currencyCode = currencyCode;
        this.amount = new Big(value);
    }

    getAmount(): BigJsLibrary.BigJS {
        return this.amount;
    }
    
    getCurrencyCode(): string {
        return this.currencyCode;
    }

    formatMoney(decimals: number = 2): string {
        return this.currencyCode + " " + this.amount.toFixed(decimals);
    }

}
