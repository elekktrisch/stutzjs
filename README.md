# stutzjs
* Solves the accuracy problems of the accountingjs by using a bigdecimal implementation instead of floatingpoint.
* supports typescript by providing an ambient typings file

## usage
Import the stutz script by adding a script tag in the html header:
```html
<script src="dist/stutz.min.js"></script>
```

Then, use the Stutz implementation with
```js
    var stutz = new Stutz("CHF", "123456.789");
    console.log(stutz.formatMoney(); // "CHF 123'456.79" 
```
