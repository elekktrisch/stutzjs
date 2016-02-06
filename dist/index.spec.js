var index_1 = require("./index");
require("jasmine");
describe('Stutz', function () {
    beforeEach(function () {
        index_1.default.config().reset();
    });
    it('should parse string to BigDecimal value', function () {
        // arrange
        var stutz = index_1.default.of("CHF", "100.2000");
        // act
        var amount = stutz.getAmount();
        // assert
        expect(amount.toJSON()).toEqual("100.2");
    });
    it('should store the currency code', function () {
        // arrange
        var stutz = index_1.default.of("CHF", "100.2000");
        // act
        var currencyCode = stutz.getCurrencyCode();
        // assert
        expect(currencyCode).toBe("CHF");
    });
    it('should format the currency with fixed decimals', function () {
        // arrange
        index_1.default.config();
        var stutz = index_1.default.of("CHF", "100.2000");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 100.20");
    });
    it('should allow for custom formatter', function () {
        // arrange
        index_1.default.config().useFormatter(function (amount, currencyCode) {
            return amount.toFixed(3) + " extremely customized format " + currencyCode;
        });
        var stutz = index_1.default.of("CHF", "123.456789");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("123.457 extremely customized format CHF");
    });
    it('should respect the number of decimals per currency', function () {
        // arrange
        index_1.default.config().forCurrency("ZZZ").useDecimalPlaces(5);
        var zStutz = index_1.default.of("ZZZ", "123.456789123");
        var yStutz = index_1.default.of("YYY", "123.456789123");
        // act
        var zFormattedMoney = zStutz.formatMoney();
        var yFormattedMoney = yStutz.formatMoney();
        // assert
        expect(zFormattedMoney).toEqual("ZZZ 123.45679");
        expect(yFormattedMoney).toEqual("YYY 123.46");
    });
    it('should format negative values', function () {
        // arrange
        var stutz = index_1.default.of("CHF", "-100.2000");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF -100.20");
    });
    it('should format values with digits grouping for large amounts', function () {
        // arrange
        var stutz = index_1.default.of("CHF", "1234654987.123");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 1'234'654'987.12");
    });
    it('should allow for custom group delimiter', function () {
        // arrange
        index_1.default.config().useGroupDelimiter(",");
        var stutz = index_1.default.of("CHF", "1234654987.123");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 1,234,654,987.12");
    });
    it('should allow for custom decimal delimiter', function () {
        // arrange
        index_1.default.config().useDecimalDelimiter(",");
        var stutz = index_1.default.of("CHF", "12345.678");
        // act
        var formattedMoney = stutz.formatMoney();
        // assert
        expect(formattedMoney).toEqual("CHF 12'345,68");
    });
    it('should parse an amount value correctly', function () {
        // arrange
        var stutz = index_1.default.parse("CHF 12'345.68");
        // act
        var amountValue = stutz.getAmount();
        var currencyCode = stutz.getCurrencyCode();
        // assert
        expect(amountValue.toFixed(2)).toEqual("12345.68");
        expect(currencyCode).toEqual("CHF");
    });
    it('should parse an amount value with custom decimal delimiter correctly', function () {
        // arrange
        index_1.default.config().useDecimalDelimiter(",");
        var stutz = index_1.default.parse("CHF 12'345,68");
        // act
        var amountValue = stutz.getAmount();
        var currencyCode = stutz.getCurrencyCode();
        // assert
        expect(amountValue.toFixed(2)).toEqual("12345.68");
        expect(currencyCode).toEqual("CHF");
    });
    it('should parse an amount value with custom decimal delimiter and custom group delimiter correctly', function () {
        // arrange
        index_1.default.config().useGroupDelimiter(".").useDecimalDelimiter(",");
        var stutz = index_1.default.parse("USD 123.456,79");
        // assert
        expect(stutz.getAmount().toFixed(2)).toEqual("123456.79");
    });
    it('should allow for different configs based on locales', function () {
        // arrange
        index_1.default.config("de_DE").useGroupDelimiter("-").useDecimalDelimiter("=");
        index_1.default.config("de_CH").useGroupDelimiter("'").useDecimalDelimiter(".");
        index_1.default.config("de_AU").useGroupDelimiter(".").useDecimalDelimiter(",");
        var stutz = index_1.default.of("CHF", "123456.79");
        // assert
        expect("de: " + stutz.formatMoney("de_DE")).toEqual("de: CHF 123-456=79");
        expect("ch: " + stutz.formatMoney("de_CH")).toEqual("ch: CHF 123'456.79");
        expect("au: " + stutz.formatMoney("de_AU")).toEqual("au: CHF 123.456,79");
    });
    it('should allow for different configs based on currencies', function () {
        // arrange
        index_1.default.config().forCurrency("EUR").useGroupDelimiter("-").useDecimalDelimiter("=");
        index_1.default.config().forCurrency("CHF").useGroupDelimiter("_").useDecimalDelimiter(".");
        var eur = index_1.default.of("EUR", "123456.79");
        var chf = index_1.default.of("CHF", "123456.79");
        // assert
        expect(eur.formatMoney()).toEqual("EUR 123-456=79");
        expect(chf.formatMoney()).toEqual("CHF 123_456.79");
    });
});
//# sourceMappingURL=index.spec.js.map