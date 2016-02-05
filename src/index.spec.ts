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
    var currencyCode = stutz.getCurrencyCode();

    // assert
    expect(currencyCode).toBe("CHF");
  });


  it('should format the currency with fixed decimals', () => {
    // arrange
    let stutz: Stutz = new Stutz("CHF", "100.2000");

    // act
    var formattedMoney = stutz.formatMoney();

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
    var formattedMoney = stutz.formatMoney();

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
    var zFormattedMoney = zStutz.formatMoney();
    var yFormattedMoney = yStutz.formatMoney();

    // assert
    expect(zFormattedMoney).toEqual("ZZZ 123.45679");
    expect(yFormattedMoney).toEqual("YYY 123.46");
  });

});
