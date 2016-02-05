var Big = require("big.js");
var StutzConfig = (function () {
    function StutzConfig() {
    }
    return StutzConfig;
})();
exports.StutzConfig = StutzConfig;
function addDigitGrouping(amountValue, groupDelimiter) {
    return amountValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1' + groupDelimiter);
}
var DEFAULT_DECIMAL_DELIMITER = ".";
var DEFAULT_GROUP_DELIMITER = "'";
var DEFAULT_DECIMALS = 2;
var DEFAULT_CURRENCIES = { "CHF": 2, "USD": 2 };
var DEFAULT_FORMATTER = function (currencies, groupDelimiter, decimalDelimiter) {
    return function (amount, currencyCode) {
        var decimals = currencies && currencies[currencyCode];
        var amountValue = amount.toFixed(decimals || DEFAULT_DECIMALS);
        return currencyCode + " " + addDigitGrouping(amountValue, groupDelimiter).replace(".", decimalDelimiter);
    };
};
var Stutz = (function () {
    function Stutz(currencyCode, value, config) {
        this.currencyCode = currencyCode;
        this.amount = new Big(value);
        var currencies = config && config.currencies || DEFAULT_CURRENCIES;
        var groupDelimiter = config && config.groupDelimiter || DEFAULT_GROUP_DELIMITER;
        var decimalDelimiter = config && config.decimalDelimiter || DEFAULT_DECIMAL_DELIMITER;
        var formatter = config && config.formatter || DEFAULT_FORMATTER(currencies, groupDelimiter, decimalDelimiter);
        this.config = {
            currencies: currencies,
            groupDelimiter: groupDelimiter,
            decimalDelimiter: decimalDelimiter,
            formatter: formatter
        };
    }
    Stutz.prototype.getAmount = function () {
        return this.amount;
    };
    Stutz.prototype.getCurrencyCode = function () {
        return this.currencyCode;
    };
    Stutz.prototype.formatMoney = function () {
        return this.config.formatter(this.amount, this.currencyCode);
    };
    return Stutz;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stutz;
//# sourceMappingURL=index.js.map