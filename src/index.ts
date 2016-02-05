import * as Big from "big.js";

export interface CurrencyFormatter {
  (amount: BigJsLibrary.BigJS, currencyCode: string);
}

export class StutzConfig {
  currencies: {[currencyCode:string]:number};
  formatter: CurrencyFormatter;
}

export let DEFAULT_DECIMALS: number = 2;
export let DEFAULT_CURRENCIES: {[currencyCode:string]:number} = {"CHF": 2, "USD": 2};
export let DEFAULT_FORMATTER = (currencies) => {
  return (amount: BigJsLibrary.BigJS, currencyCode: string) => {
    var decimals = currencies && currencies[currencyCode];
    return currencyCode + " " + amount.toFixed(decimals || DEFAULT_DECIMALS);
  }
};


export default class Stutz {

  private amount: BigJsLibrary.BigJS;
  private currencyCode: string;
  private config: StutzConfig;

  constructor(currencyCode: string, value: string, config?: StutzConfig) {
    this.currencyCode = currencyCode;
    this.amount = new Big(value);

    let currencies = config && config.currencies || DEFAULT_CURRENCIES;
    let formatter = config && config.formatter || DEFAULT_FORMATTER(currencies);
    this.config = {
      currencies: currencies,
      formatter: formatter
    };
  }

  getAmount(): BigJsLibrary.BigJS {
    return this.amount;
  }

  getCurrencyCode(): string {
    return this.currencyCode;
  }

  formatMoney(): string {
    return this.config.formatter(this.amount, this.currencyCode);
  }

}
