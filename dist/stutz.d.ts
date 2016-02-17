import BigJS = BigJsLibrary.BigJS;
export interface CurrencyFormatter {
    (amount: BigJsLibrary.BigJS, currencyCode: string, config?: StutzConfig): string;
}
export interface StutzConfig {
}
export interface Stutz {
    getAmount(): BigJsLibrary.BigJS;
    getCurrencyCode(): string;
    formatMoney(locale?: string): string;
}
export declare class ConfigBuilder {
    private locale;
    private currencyCode;
    private config;
    constructor(locale?: string, currencyCode?: string, forceInit?: boolean);
    reset(): void;
    forCurrency(currencyCode?: string): ConfigBuilder;
    useGroupDelimiter(groupDelimiter: string): ConfigBuilder;
    useDecimalDelimiter(decimalDelimiter: string): ConfigBuilder;
    useFormatter(formatter: CurrencyFormatter): ConfigBuilder;
    useDecimalPlaces(decimalPlaces: number): ConfigBuilder;
    useRoundHalfUp(roundHalfUp: boolean): ConfigBuilder;
    useNegativeSign(negativeSign: string): ConfigBuilder;
}
export default class StutzFactory {
    static of(currencyCode: string, value: string | BigJS): Stutz;
    static config(locale?: string, currencyCode?: string): ConfigBuilder;
    static parse(formattedMoney: string, config?: StutzConfig): Stutz;
    static sum(amounts: Array<Stutz>): Array<Stutz>;
}
