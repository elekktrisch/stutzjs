[![Build Status](https://travis-ci.org/elekktrisch/stutzjs.svg?branch=master)](https://travis-ci.org/elekktrisch/stutzjs)

# StutzJS
* Solves the accuracy problems of the accountingjs library (http://openexchangerates.github.io/accounting.js) by using a bigdecimal implementation (credits http://mikemcl.github.io/big.js) instead of floatingpoint.
* supports typescript by providing an ambient typings file

[Demo](https://raw.githubusercontent.com/elekktrisch/stutzjs/master/dist/index.html)

## Getting started
Import the stutz script by adding a script tag in the html header:
```html
<script src="./stutz.standalone.js"></script>
```       
Or by adding an npm dependency
```
npm install stutzjs --save
```

## Format values
```js                               
var stutz = money.of("CHF", "1234654987.123");
var formattedMoney = stutz.formatMoney(); // "CHF 1'234'654'987.12"
```

## Parse formatted values
```js
var stutz = money.parse("CHF 1'234'654'987.12");
console.log(stutz.getAmount().toFixed(3)); // "1234654987.120" 
console.log(stutz.getCurrencyCode()); // "CHF" 
```

## Customization / Localization
```js
money.config().useGroupDelimiter(",");
let stutz: Stutz = money.of("CHF", "1234654987.123");
let formattedMoney = stutz.formatMoney(); // "CHF 1,234,654,987.12"
```

### All configuration options   
```js
money.config(locale)
  .forCurrency(currencyCode) // string
  .useGroupDelimiter(groupDelimiter) // string
  .useDecimalDelimiter(decimalDelimiter) // string
  .useFormatter(formatter) // function(amount, currencyCode) 
                           // and returning string
  .useDecimalPlaces(decimalPlaces) // number      
```
