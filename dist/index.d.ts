export interface CurrencyFormatter {
    (amount: BigJsLibrary.BigJS, currencyCode: string): any;
}
export declare class StutzConfig {
    currencies: {
        [currencyCode: string]: number;
    };
    groupDelimiter: string;
    decimalDelimiter: string;
    formatter: CurrencyFormatter;
}
export default class Stutz {
    private amount;
    private currencyCode;
    private config;
    constructor(currencyCode: string, value: string, config?: StutzConfig);
    getAmount(): BigJsLibrary.BigJS;
    getCurrencyCode(): string;
    formatMoney(): string;
}
