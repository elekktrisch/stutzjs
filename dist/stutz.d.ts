import Big from 'big.js';

interface CurrencyFormatter {
    (amount: Big, currencyCode: string, config?: StutzConfig): string;
}
interface StutzConfig {
}
interface Stutz {
    getAmount(): Big;
    getCurrencyCode(): string;
    formatMoney(locale?: string): string;
}
declare class ConfigBuilder {
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
declare class StutzFactory {
    static of(currencyCode: string, value: string | Big): Stutz;
    static config(locale?: string, currencyCode?: string): ConfigBuilder;
    static parse(formattedMoney: string, config?: StutzConfig): Stutz;
    static sum(amounts: Array<Stutz>): Array<Stutz>;
}

export { ConfigBuilder, type CurrencyFormatter, type Stutz, type StutzConfig, StutzFactory as default };
