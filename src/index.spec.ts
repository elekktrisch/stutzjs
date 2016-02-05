import * as Big from "big.js";
import Stutz from "./index";
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

});
