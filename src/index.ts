import * as Big from "big.js";
import "core-js/modules/es6.object.assign";

export interface CurrencyFormatter {
  (amount: BigJsLibrary.BigJS, currencyCode: string, config?: StutzConfig): string;
}

export interface StutzConfig {
}

class StutzConfigImpl implements StutzConfig {

  locale: string;
  currencyCode: string;
  decimalPlaces: number;
  groupDelimiter: string;
  decimalDelimiter: string;
  formatter: CurrencyFormatter;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.locale = DEFAULT_LOCALE;
    this.currencyCode = FALLBACK_CURRENCY_CODE;
    this.decimalPlaces = DEFAULT_DECIMAL_PLACES;
    this.groupDelimiter = DEFAULT_GROUP_DELIMITER;
    this.decimalDelimiter = DEFAULT_DECIMAL_DELIMITER;
    this.formatter = DEFAULT_FORMATTER;
  }

  static from(other: StutzConfigImpl) {
    var newConfig = Object.assign(new StutzConfigImpl(), other);
    newConfig.formatter = other.formatter;
    return newConfig;
  }

}

function addDigitGrouping(amountValue: string, groupDelimiter: string) {
  return amountValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1' + groupDelimiter);
}

function replaceDecimalDelimiter(groupedAmountValue: string, decimalDelimiter: string) {
  let idx = groupedAmountValue.lastIndexOf(".");
  return groupedAmountValue.substring(0, idx) + decimalDelimiter + groupedAmountValue.substring(idx + 1);
}

const FALLBACK_CURRENCY_CODE: string = "-$-";
const DEFAULT_DECIMAL_DELIMITER: string = ".";
const DEFAULT_GROUP_DELIMITER: string = "'";
const DEFAULT_DECIMAL_PLACES: number = 2;
const DEFAULT_FORMATTER = (amount: BigJsLibrary.BigJS, currencyCode: string, config: StutzConfig) => {
  let _config: StutzConfigImpl = <StutzConfigImpl>config || CONFIG_REPOSITORY.configFor(DEFAULT_LOCALE, currencyCode);

  let amountValue = amount.toFixed(_config.decimalPlaces || DEFAULT_DECIMAL_PLACES);
  var groupedAmountValue = addDigitGrouping(amountValue, _config.groupDelimiter);
  var formattedAmount = replaceDecimalDelimiter(groupedAmountValue, _config.decimalDelimiter);

  return `${currencyCode} ${formattedAmount}`;
};
const DEFAULT_LOCALE = "_default_locale";

class ConfigRepository {

  private configs: {[locale:string]:{[currencyCode:string]:StutzConfigImpl}} = {};

  constructor() {
    this.reset();
  }

  reset() {
    this.configs[DEFAULT_LOCALE] = {};
    this.configs[DEFAULT_LOCALE][FALLBACK_CURRENCY_CODE] = new StutzConfigImpl();
  }

  configFor(locale?: string, currencyCode?: string, forceInit?: boolean): StutzConfigImpl {
    let _locale: string = locale || DEFAULT_LOCALE;
    let _currencyCode: string = currencyCode || FALLBACK_CURRENCY_CODE;
    let isNewLocale: boolean = false;

    if (!this.configs[_locale]) {
      this.configs[_locale] = {};
      isNewLocale = true;
    }

    if (forceInit || isNewLocale) {
      let newConfig: StutzConfigImpl = new StutzConfigImpl();
      this.configs[_locale][_currencyCode] = newConfig;
    } else if (!this.configs[_locale][_currencyCode]) {
      let newConfig: StutzConfigImpl = StutzConfigImpl.from(this.configFor(_locale, FALLBACK_CURRENCY_CODE));
      newConfig.locale = locale;
      newConfig.currencyCode = currencyCode;
      this.configs[_locale][_currencyCode] = newConfig;
    }

    return this.configs[_locale][_currencyCode];
  }

}

const CONFIG_REPOSITORY: ConfigRepository = new ConfigRepository();

export interface Stutz {
  getAmount(): BigJsLibrary.BigJS;
  getCurrencyCode(): string;
  formatMoney(locale?: string): string;
}

class StutzImpl implements Stutz {

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

  formatMoney(locale?: string): string {
    let _locale: string = locale || DEFAULT_LOCALE;
    let _config: StutzConfigImpl = CONFIG_REPOSITORY.configFor(_locale, this.currencyCode);

    return _config.formatter(this.amount, this.currencyCode, _config);
  }

}

export class ConfigBuilder {

  private locale: string;
  private currencyCode: string;
  private config: StutzConfigImpl;

  constructor(locale?: string, currencyCode?: string, forceInit?: boolean) {
    this.locale = locale || DEFAULT_LOCALE;
    this.currencyCode = currencyCode || FALLBACK_CURRENCY_CODE;
    this.config = CONFIG_REPOSITORY.configFor(this.locale, this.currencyCode, forceInit);
  }

  reset() {
    CONFIG_REPOSITORY.reset();
  }

  forCurrency(currencyCode?: string): ConfigBuilder {
    return new ConfigBuilder(this.locale, currencyCode, true);
  }

  useGroupDelimiter(groupDelimiter: string): ConfigBuilder {
    this.config.groupDelimiter = groupDelimiter;
    return this;
  }

  useDecimalDelimiter(decimalDelimiter: string): ConfigBuilder {
    this.config.decimalDelimiter = decimalDelimiter;
    return this;
  }

  useFormatter(formatter: CurrencyFormatter): ConfigBuilder {
    this.config.formatter = formatter;
    return this;
  }

  useDecimalPlaces(decimalPlaces: number): ConfigBuilder {
    this.config.decimalPlaces = decimalPlaces;
    return this;
  }

}

export default class StutzFactory {

  static of(currencyCode: string, value: string): Stutz {
    return new StutzImpl(currencyCode, value);
  }

  static config(locale?: string, currencyCode?: string): ConfigBuilder {
    return new ConfigBuilder(locale, currencyCode, true);
  }

  static parse(formattedMoney: string, config?: StutzConfig): Stutz {
    let _config: StutzConfigImpl = <StutzConfigImpl>config || CONFIG_REPOSITORY.configFor();

    let amountValue: string = formattedMoney.replace(new RegExp("[^\\d" + _config.decimalDelimiter + "]", "g"), '');
    if (_config.decimalDelimiter !== DEFAULT_DECIMAL_DELIMITER) {
      amountValue = amountValue.replace(_config.decimalDelimiter, DEFAULT_DECIMAL_DELIMITER);
    }
    let currencyCode: string = formattedMoney.replace(new RegExp("[\\d,'.\\s" + _config.decimalDelimiter + _config.groupDelimiter + "]", "g"), '');

    return new StutzImpl(currencyCode, amountValue);
  }

}