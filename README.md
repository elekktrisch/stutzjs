[![CI](https://github.com/elekktrisch/stutzjs/actions/workflows/ci.yml/badge.svg)](https://github.com/elekktrisch/stutzjs/actions/workflows/ci.yml)

# StutzJS
* Solves the accuracy problems of the accountingjs library (http://openexchangerates.github.io/accounting.js) by using a bigdecimal implementation (credits http://mikemcl.github.io/big.js) instead of floatingpoint.
* ships as ESM, CJS, and a standalone browser bundle, with TypeScript declarations

[Demo](https://rawgit.com/elekktrisch/stutzjs/master/dist/index.html)

## Getting started
Add via npm:
```
npm install stutzjs
```
Then import:
```js
import money from "stutzjs";          // ESM
// or
const money = require("stutzjs").default; // CJS
```
Or load the standalone bundle directly in a browser (exposes `window.money`):
```html
<script src="https://unpkg.com/stutzjs/dist/stutz.standalone.js"></script>
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

see [Demo](https://rawgit.com/elekktrisch/stutzjs/master/dist/index.html) for all configuration options.