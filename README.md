# StutzJS
* Solves the accuracy problems of the accountingjs library (http://openexchangerates.github.io/accounting.js) by using a bigdecimal implementation (credits http://mikemcl.github.io/big.js) instead of floatingpoint.
* supports typescript by providing an ambient typings file

## Getting started
Import the stutz script by adding a script tag in the html header:
```html
<script src="dist/stutz.standalone.min.js"></script>
```       
Or by adding an npm dependency
```
npm install stutzjs --save
```
Import the modules
```js
import * as Big from "big.js";
import Money from "stutzjs";
import {Stutz} from "stutzjs";
```

## Format values
```js                               
var stutz = Money.of("CHF", "1234654987.123");
var formattedMoney = stutz.formatMoney(); // "CHF 1'234'654'987.12"
```

## Parse formatted values
```js
var stutz = Money.parse("CHF 1'234'654'987.12");
console.log(stutz.getAmount().toFixed(3)); // "1234654987.120" 
console.log(stutz.getCurrencyCode()); // "CHF" 
```

## Customization / Localization
```js
Money.config().useGroupDelimiter(",");
let stutz: Stutz = Money.of("CHF", "1234654987.123");
let formattedMoney = stutz.formatMoney(); // "CHF 1,234,654,987.12"
```

### All configuration options   
```js
Money.config()
  .forCurrency(currencyCode) // string
  .useGroupDelimiter(groupDelimiter) // string
  .useDecimalDelimiter(decimalDelimiter) // string
  .useFormatter(formatter) // function(amount: BigJsLibrary.BigJS, 
                           //          currencyCode: string, 
                           //          config?: StutzConfig) 
                           // and returning string
  .useDecimalPlaces(decimalPlaces) // number      
```