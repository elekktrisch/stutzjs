var Big = require("big.js");
require("core-js/modules/es6.object.assign");
var StutzConfigImpl = (function () {
    function StutzConfigImpl() {
        this.reset();
    }
    StutzConfigImpl.prototype.reset = function () {
        this.locale = DEFAULT_LOCALE;
        this.currencyCode = FALLBACK_CURRENCY_CODE;
        this.decimalPlaces = DEFAULT_DECIMAL_PLACES;
        this.groupDelimiter = DEFAULT_GROUP_DELIMITER;
        this.decimalDelimiter = DEFAULT_DECIMAL_DELIMITER;
        this.formatter = DEFAULT_FORMATTER;
    };
    StutzConfigImpl.from = function (other) {
        var newConfig = Object.assign(new StutzConfigImpl(), other);
        newConfig.formatter = other.formatter;
        return newConfig;
    };
    return StutzConfigImpl;
})();
function addDigitGrouping(amountValue, groupDelimiter) {
    return amountValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1' + groupDelimiter);
}
function replaceDecimalDelimiter(groupedAmountValue, decimalDelimiter) {
    var idx = groupedAmountValue.lastIndexOf(".");
    return groupedAmountValue.substring(0, idx) + decimalDelimiter + groupedAmountValue.substring(idx + 1);
}
var FALLBACK_CURRENCY_CODE = "-$-";
var DEFAULT_DECIMAL_DELIMITER = ".";
var DEFAULT_GROUP_DELIMITER = "'";
var DEFAULT_DECIMAL_PLACES = 2;
var DEFAULT_FORMATTER = function (amount, currencyCode, config) {
    var _config = config || CONFIG_REPOSITORY.configFor(DEFAULT_LOCALE, currencyCode);
    var amountValue = amount.toFixed(_config.decimalPlaces || DEFAULT_DECIMAL_PLACES);
    var groupedAmountValue = addDigitGrouping(amountValue, _config.groupDelimiter);
    var formattedAmount = replaceDecimalDelimiter(groupedAmountValue, _config.decimalDelimiter);
    return currencyCode + " " + formattedAmount;
};
var DEFAULT_LOCALE = "_default_locale";
var ConfigRepository = (function () {
    function ConfigRepository() {
        this.configs = {};
        this.reset();
    }
    ConfigRepository.prototype.reset = function () {
        this.configs[DEFAULT_LOCALE] = {};
        this.configs[DEFAULT_LOCALE][FALLBACK_CURRENCY_CODE] = new StutzConfigImpl();
    };
    ConfigRepository.prototype.configFor = function (locale, currencyCode, forceInit) {
        var _locale = locale || DEFAULT_LOCALE;
        var _currencyCode = currencyCode || FALLBACK_CURRENCY_CODE;
        var isNewLocale = false;
        if (!this.configs[_locale]) {
            this.configs[_locale] = {};
            isNewLocale = true;
        }
        if (forceInit || isNewLocale) {
            var newConfig = new StutzConfigImpl();
            this.configs[_locale][_currencyCode] = newConfig;
        }
        else if (!this.configs[_locale][_currencyCode]) {
            var newConfig = StutzConfigImpl.from(this.configFor(_locale, FALLBACK_CURRENCY_CODE));
            newConfig.locale = locale;
            newConfig.currencyCode = currencyCode;
            this.configs[_locale][_currencyCode] = newConfig;
        }
        return this.configs[_locale][_currencyCode];
    };
    return ConfigRepository;
})();
var CONFIG_REPOSITORY = new ConfigRepository();
var StutzImpl = (function () {
    function StutzImpl(currencyCode, value) {
        this.currencyCode = currencyCode;
        this.amount = new Big(value);
    }
    StutzImpl.prototype.getAmount = function () {
        return this.amount;
    };
    StutzImpl.prototype.getCurrencyCode = function () {
        return this.currencyCode;
    };
    StutzImpl.prototype.formatMoney = function (locale) {
        var _locale = locale || DEFAULT_LOCALE;
        var _config = CONFIG_REPOSITORY.configFor(_locale, this.currencyCode);
        return _config.formatter(this.amount, this.currencyCode, _config);
    };
    return StutzImpl;
})();
var ConfigBuilder = (function () {
    function ConfigBuilder(locale, currencyCode, forceInit) {
        this.locale = locale || DEFAULT_LOCALE;
        this.currencyCode = currencyCode || FALLBACK_CURRENCY_CODE;
        this.config = CONFIG_REPOSITORY.configFor(this.locale, this.currencyCode, forceInit);
    }
    ConfigBuilder.prototype.reset = function () {
        CONFIG_REPOSITORY.reset();
    };
    ConfigBuilder.prototype.forCurrency = function (currencyCode) {
        return new ConfigBuilder(this.locale, currencyCode, true);
    };
    ConfigBuilder.prototype.useGroupDelimiter = function (groupDelimiter) {
        this.config.groupDelimiter = groupDelimiter;
        return this;
    };
    ConfigBuilder.prototype.useDecimalDelimiter = function (decimalDelimiter) {
        this.config.decimalDelimiter = decimalDelimiter;
        return this;
    };
    ConfigBuilder.prototype.useFormatter = function (formatter) {
        this.config.formatter = formatter;
        return this;
    };
    ConfigBuilder.prototype.useDecimalPlaces = function (decimalPlaces) {
        this.config.decimalPlaces = decimalPlaces;
        return this;
    };
    return ConfigBuilder;
})();
exports.ConfigBuilder = ConfigBuilder;
var StutzFactory = (function () {
    function StutzFactory() {
    }
    StutzFactory.of = function (currencyCode, value) {
        return new StutzImpl(currencyCode, value);
    };
    StutzFactory.config = function (locale, currencyCode) {
        return new ConfigBuilder(locale, currencyCode, true);
    };
    StutzFactory.parse = function (formattedMoney, config) {
        var _config = config || CONFIG_REPOSITORY.configFor();
        var amountValue = formattedMoney.replace(new RegExp("[^\\d" + _config.decimalDelimiter + "]", "g"), '');
        if (_config.decimalDelimiter !== DEFAULT_DECIMAL_DELIMITER) {
            amountValue = amountValue.replace(_config.decimalDelimiter, DEFAULT_DECIMAL_DELIMITER);
        }
        var currencyCode = formattedMoney.replace(new RegExp("[\\d,'.\\s" + _config.decimalDelimiter + _config.groupDelimiter + "]", "g"), '');
        return new StutzImpl(currencyCode, amountValue);
    };
    return StutzFactory;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StutzFactory;
//# sourceMappingURL=index.js.map