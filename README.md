# StutzJS
* Solves the accuracy problems of the accountingjs library (http://openexchangerates.github.io/accounting.js) by using a bigdecimal implementation (credits http://mikemcl.github.io/big.js) instead of floatingpoint.
* supports typescript by providing an ambient typings file

## Getting started
Import the stutz script by adding a script tag in the html header:
```html
<script src="dist/stutz.min.js"></script>
```

## Format values
```js
var stutz = new Stutz("CHF", "123456.789");
console.log(stutz.formatMoney()); // "CHF 123'456.79" 
```

## Parse formatted values
```js
var stutz = Stutz.from("CHF 123'456.79");
console.log(stutz.getAmount().toFixed(3)); // "123456.790" 
console.log(stutz.getCurrencyCode()); // "CHF" 
```

## Customization / Localization
```js
var currencies: {"USD": 2, "JOD": 3}  // number of decimals per currency 
var config = {
  currencies: currencies,
  groupDelimiter: "'",
  decimalDelimiter: ".",
  formatter: function(amount, currencyCode) {
    var decimalPlaces = currencies[currencyCode] || 2;
    return currencyCode + " " + amount.toFixed(decimalPlaces);
  }
}
```
### Customization Example 1
var config = {     
  groupDelimiter: ".",
  decimalDelimiter: ","
};
var stutz = Stutz.from("USD 123.456,79");
console.log(stutz.getAmount().toFixed(2)); // "123456.79"

### Customization Example 2
var config = {     
  currencies: {"ZZZ": 5, "USD": 2}
};
var stutz = new Stutz("123456.78", "ZZZ", config);
console.log(stutz.formatMoney()); // "ZZZ 123'456.79000"
