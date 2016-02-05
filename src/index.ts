import * as Big from "big.js";

export interface CurrencyFormatter {
  (amount: BigJsLibrary.BigJS, currencyCode: string);
}

export class StutzConfig {
  currencies: {[currencyCode:string]:number};
  groupDelimiter: string;
  decimalDelimiter: string;
  formatter: CurrencyFormatter;
}

function addDigitGrouping(amountValue: string, groupDelimiter: string) {
  return amountValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1' + groupDelimiter);
}

let DEFAULT_DECIMAL_DELIMITER: string = ".";
let DEFAULT_GROUP_DELIMITER: string = "'";
let DEFAULT_DECIMALS: number = 2;
let DEFAULT_CURRENCIES: {[currencyCode:string]:number} = {"CHF": 2, "USD": 2};
let DEFAULT_FORMATTER = (currencies, groupDelimiter, decimalDelimiter) => {
  return (amount: BigJsLibrary.BigJS, currencyCode: string) => {
    let decimals = currencies && currencies[currencyCode];
    let amountValue = amount.toFixed(decimals || DEFAULT_DECIMALS);
    return currencyCode + " " + addDigitGrouping(amountValue, groupDelimiter).replace(".", decimalDelimiter);
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
    let groupDelimiter = config && config.groupDelimiter || DEFAULT_GROUP_DELIMITER;
    let decimalDelimiter = config && config.decimalDelimiter || DEFAULT_DECIMAL_DELIMITER;
    let formatter = config && config.formatter || DEFAULT_FORMATTER(currencies, groupDelimiter, decimalDelimiter);
    this.config = {
      currencies: currencies,
      groupDelimiter: groupDelimiter,
      decimalDelimiter: decimalDelimiter,
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

  static from(formattedMoney: string, config?: StutzConfig): Stutz {
    let groupDelimiter: string = config && config.groupDelimiter || DEFAULT_GROUP_DELIMITER;
    let decimalDelimiter: string = config && config.decimalDelimiter || DEFAULT_DECIMAL_DELIMITER;

    let amountValue: string = formattedMoney.replace(new RegExp("[^\\d" + decimalDelimiter + "]", "g"), '');
    if(decimalDelimiter !== DEFAULT_DECIMAL_DELIMITER) {
      amountValue = amountValue.replace(decimalDelimiter, DEFAULT_DECIMAL_DELIMITER);
    }
    let currencyCode: string = formattedMoney.replace(new RegExp("[\\d,'.\\s" + decimalDelimiter + groupDelimiter + "]", "g"), '');

    return new Stutz(currencyCode, amountValue);
  }

}
