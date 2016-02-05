import * as Big from "big.js";
import Stutz from "./index";
import {StutzConfig} from "./index";
import "jasmine";

describe('Stutz', () => {

  it('should parse string to BigDecimal value', () => {
    // arrange
    let stutz: Stutz = new Stutz("CHF", "100.2000");

    // act
    let amount: BigJsLibrary.BigJS = stutz.getAmount();

    // assert
    expect(amount.toJSON()).toEqual("100.2");
  });


  it('should store the currency code', () => {
    // arrange
    let stutz: Stutz = new Stutz("CHF", "100.2000");

    // act
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(currencyCode).toBe("CHF");
  });


  it('should format the currency with fixed decimals', () => {
    // arrange
    let stutz: Stutz = new Stutz("CHF", "100.2000");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 100.20");
  });


  it('should allow for custom formatter', () => {
    // arrange
    let config: any = {
      formatter: (amount: BigJsLibrary.BigJS, currencyCode: string) => {
        return amount.toFixed(3) + " extremely customized format " + currencyCode;
      }
    };

    let stutz: Stutz = new Stutz("CHF", "123.456789", config);

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("123.457 extremely customized format CHF");
  });


  it('should respect the number of decimals per currency', () => {
    // arrange
    let config: any = {
      currencies: {"YYY": 2, "ZZZ": 5}
    };

    let zStutz: Stutz = new Stutz("ZZZ", "123.456789123", config);
    let yStutz: Stutz = new Stutz("YYY", "123.456789123", config);

    // act
    let zFormattedMoney = zStutz.formatMoney();
    let yFormattedMoney = yStutz.formatMoney();

    // assert
    expect(zFormattedMoney).toEqual("ZZZ 123.45679");
    expect(yFormattedMoney).toEqual("YYY 123.46");
  });


  it('should format negative values', () => {
    // arrange
    let stutz: Stutz = new Stutz("CHF", "-100.2000");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF -100.20");
  });


  it('should format values with digits grouping for large amounts', () => {
    // arrange
    let stutz: Stutz = new Stutz("CHF", "1234654987.123");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 1'234'654'987.12");
  });


  it('should allow for custom group delimiter', () => {
    // arrange
    let config: any = {
      groupDelimiter: ","
    };
    let stutz: Stutz = new Stutz("CHF", "1234654987.123", config);

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 1,234,654,987.12");
  });


  it('should allow for custom decimal delimiter', () => {
    // arrange
    let config: any = {
      decimalDelimiter: ","
    };
    let stutz: Stutz = new Stutz("CHF", "12345.678", config);

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 12'345,68");
  });


  it('should parse an amount value correctly', () => {
    // arrange
    let stutz: Stutz = Stutz.from("CHF 12'345.68");

    // act
    let amountValue = stutz.getAmount();
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(amountValue.toFixed(2)).toEqual("12345.68");
    expect(currencyCode).toEqual("CHF");
  });


  it('should parse an amount value with custom decimal delimiter correctly', () => {
    // arrange
    let config: any = {
      decimalDelimiter: ","
    };
    let stutz: Stutz = Stutz.from("CHF 12'345,68", config);

    // act
    let amountValue = stutz.getAmount();
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(amountValue.toFixed(2)).toEqual("12345.68");
    expect(currencyCode).toEqual("CHF");
  });

});
