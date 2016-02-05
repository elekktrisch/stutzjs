var index_1 = require("./index");
require("jasmine");
describe('Stutz', function () {
    it('should parse string to BigDecimal value', function () {
        // arrange
        var stutz = new index_1.default("CHF", "100.2000");
        // act
        var amount = stutz.getAmount();
        // assert
        expect(amount.toJSON()).toEqual("100.2");
    });
    it('should store the currency code', function () {
        // arrange
        var stutz = new index_1.default("CHF", "100.2000");
        // act
        var currencyCode = stutz.getCurrencyCode();
        // assert
        expect(currencyCode).toBe("CHF");
    });
    it('should format the currency with fixed decimals', function () {
        // arrange
        var stutz = new index_1.default("CHF", "100.2000");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 100.20");
    });
    it('should allow for custom formatter', function () {
        // arrange
        var config = {
            formatter: function (amount, currencyCode) {
                return amount.toFixed(3) + " extremely customized format " + currencyCode;
            }
        };
        var stutz = new index_1.default("CHF", "123.456789", config);
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("123.457 extremely customized format CHF");
    });
    it('should respect the number of decimals per currency', function () {
        // arrange
        var config = {
            currencies: { "YYY": 2, "ZZZ": 5 }
        };
        var zStutz = new index_1.default("ZZZ", "123.456789123", config);
        var yStutz = new index_1.default("YYY", "123.456789123", config);
        // act
        var zFormattedMoney = zStutz.formatMoney();
        var yFormattedMoney = yStutz.formatMoney();
        // assert
        expect(zFormattedMoney).toEqual("ZZZ 123.45679");
        expect(yFormattedMoney).toEqual("YYY 123.46");
    });
    it('should format negative values', function () {
        // arrange
        var stutz = new index_1.default("CHF", "-100.2000");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF -100.20");
    });
    it('should format values with digits grouping for large amounts', function () {
        // arrange
        var stutz = new index_1.default("CHF", "1234654987.123");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 1'234'654'987.12");
    });
    it('should allow for custom group delimiter', function () {
        // arrange
        var config = {
            groupDelimiter: ","
        };
        var stutz = new index_1.default("CHF", "1234654987.123", config);
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 1,234,654,987.12");
    });
    it('should allow for custom decimal delimiter', function () {
        // arrange
        var config = {
            decimalDelimiter: ","
        };
        var stutz = new index_1.default("CHF", "12345.678", config);
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 12'345,68");
    });
});
//# sourceMappingURL=index.spec.js.map