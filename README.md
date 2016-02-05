# stutzjs
* Solves the accuracy problems of the accountingjs by using a bigdecimal implementation instead of floatingpoint.
* supports typescript by providing an ambient typings file

## getting started
Import the stutz script by adding a script tag in the html header:
```html
<script src="dist/stutz.min.js"></script>
```

## format values
```js
var stutz = new Stutz("CHF", "123456.789");
console.log(stutz.formatMoney()); // "CHF 123"456.79" 
```

## parse formatted values
```js
var stutz = Stutz.from("CHF 123"456.79");
console.log(stutz.getAmount().toFixed(3)); // "123456.790" 
console.log(stutz.getCurrencyCode()); // "CHF" 
```

## customize
```js
var config = {
  currencies: {"USD": 2, "JOD": 3}, // number of decimals per currency
  groupDelimiter: "'",
  decimalDelimiter: ".",
  formatter: function(amount, currencyCode) {
    return currencyCode + " " + amount.toFixed(2);
  }
}
```
