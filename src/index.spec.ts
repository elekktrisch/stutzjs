import * as Big from "big.js";
import Money from "./index";
import {Stutz} from "./index";

describe('Stutz', () => {

  beforeEach(() => {
    Money.config().reset();
  });

  it('should parse string to BigDecimal value', () => {
    // arrange
    let stutz: Stutz = Money.of("CHF", "100.2000");

    // act
    let amount: BigJsLibrary.BigJS = stutz.getAmount();

    // assert
    expect(amount.toJSON()).toEqual("100.2");
  });


  it('should store the currency code', () => {
    // arrange
    let stutz: Stutz = Money.of("CHF", "100.2000");

    // act
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(currencyCode).toBe("CHF");
  });


  it('should format the currency with fixed decimals', () => {
    // arrange
    Money.config();
    let stutz: Stutz = Money.of("CHF", "100.2000");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 100.20");
  });


  it('should allow for custom formatter', () => {
    // arrange
    Money.config().useFormatter((amount: BigJsLibrary.BigJS, currencyCode: string) => {
      return amount.toFixed(3) + " extremely customized format " + currencyCode;
    });
    let stutz: Stutz = Money.of("CHF", "123.456789");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("123.457 extremely customized format CHF");
  });


  it('should respect the number of decimals per currency', () => {
    // arrange
    Money.config().forCurrency("ZZZ").useDecimalPlaces(5);

    let zStutz: Stutz = Money.of("ZZZ", "123.456789123");
    let yStutz: Stutz = Money.of("YYY", "123.456789123");

    // act
    let zFormattedMoney = zStutz.formatMoney();
    let yFormattedMoney = yStutz.formatMoney();

    // assert
    expect(zFormattedMoney).toEqual("ZZZ 123.45678");
    expect(yFormattedMoney).toEqual("YYY 123.45");
  });


  it('should format negative values', () => {
    // arrange
    let stutz: Stutz = Money.of("CHF", "-100.2000");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF -100.20");
  });


  it('should format negative values with custom negative-sign', () => {
    // arrange
    Money.config().useNegativeSign("N");
    let stutz: Stutz = Money.of("CHF", "-100.2000");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF N100.20");
  });


  it('should format negative values with bracket negative-sign', () => {
    // arrange
    Money.config().useNegativeSign("()");
    let stutz: Stutz = Money.of("CHF", "-100.2000");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF (100.20)");
  });


  it('should parse negative values', () => {
    // arrange
    let stutz: Stutz = Money.parse("CHF -12'345.68");

    // act
    let amountValue = stutz.getAmount();
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(amountValue.toFixed(2)).toEqual("-12345.68");
    expect(currencyCode).toEqual("CHF");
  });


  it('should parse negative values with bracket format', () => {
    // arrange
    let stutz: Stutz = Money.parse("CHF (12'345.68)");

    // act
    let amountValue = stutz.getAmount();
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(amountValue.toFixed(2)).toEqual("-12345.68");
    expect(currencyCode).toEqual("CHF");
  });


  it('should format values with digits grouping for large amounts', () => {
    // arrange
    let stutz: Stutz = Money.of("CHF", "1234654987.123");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 1'234'654'987.12");
  });


  it('should allow for custom group delimiter', () => {
    // arrange
    Money.config().useGroupDelimiter(",");
    let stutz: Stutz = Money.of("CHF", "1234654987.123");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 1,234,654,987.12");
  });


  it('should allow for custom decimal delimiter', () => {
    // arrange
    Money.config().useDecimalDelimiter(",");
    let stutz: Stutz = Money.of("CHF", "12345.678");

    // act
    let formattedMoney = stutz.formatMoney();

    // assert
    expect(formattedMoney).toEqual("CHF 12'345,67");
  });


  it('should parse an amount value correctly', () => {
    // arrange
    let stutz: Stutz = Money.parse("CHF 12'345.68");

    // act
    let amountValue = stutz.getAmount();
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(amountValue.toFixed(2)).toEqual("12345.68");
    expect(currencyCode).toEqual("CHF");
  });


  it('should parse an amount value with custom decimal delimiter correctly', () => {
    // arrange
    Money.config().useDecimalDelimiter(",");
    let stutz: Stutz = Money.parse("CHF 12'345,68");

    // act
    let amountValue = stutz.getAmount();
    let currencyCode = stutz.getCurrencyCode();

    // assert
    expect(amountValue.toFixed(2)).toEqual("12345.68");
    expect(currencyCode).toEqual("CHF");
  });


  it('should parse an amount value with custom decimal delimiter and custom group delimiter correctly', () => {
    // arrange
    Money.config().useGroupDelimiter(".").useDecimalDelimiter(",");
    let stutz = Money.parse("USD 123.456,79");

    // assert
    expect(stutz.getAmount().toFixed(2)).toEqual("123456.79");
  });


  it('should allow for different configs based on locales', () => {
    // arrange
    Money.config("de_DE").useGroupDelimiter("-").useDecimalDelimiter("=");
    Money.config("de_CH").useGroupDelimiter("'").useDecimalDelimiter(".");
    Money.config("de_AU").useGroupDelimiter(".").useDecimalDelimiter(",");
    let stutz = Money.of("CHF", "123456.79");

    // assert
    expect("de: " + stutz.formatMoney("de_DE")).toEqual("de: CHF 123-456=79");
    expect("ch: " + stutz.formatMoney("de_CH")).toEqual("ch: CHF 123'456.79");
    expect("au: " + stutz.formatMoney("de_AU")).toEqual("au: CHF 123.456,79");
  });


  it('should allow for different configs based on currencies', () => {
    // arrange
    Money.config().forCurrency("EUR").useGroupDelimiter("-").useDecimalDelimiter("=");
    Money.config().forCurrency("CHF").useGroupDelimiter("_").useDecimalDelimiter(".");
    let eur = Money.of("EUR", "123456.79");
    let chf = Money.of("CHF", "123456.79");

    // assert
    expect(eur.formatMoney()).toEqual("EUR 123-456=79");
    expect(chf.formatMoney()).toEqual("CHF 123_456.79");
  });


  it('should allow for round-half-up', () => {
    // arrange
    Money.config().useRoundHalfUp(true);
    let chf = Money.of("CHF", "123456.795");

    // assert
    expect(chf.formatMoney()).toEqual("CHF 123'456.80");
  });

});
