# Numbers
- Javascript only have `number` type which is internally `f64` type.
- Numbers in Javascript follow the `IEEE 754` standard


## Accuracy
As seen in f64 or f32 (check [Numbers](../Basics/Numbers.md) & [DecimalToBinary](../Basics/DecimalToBinary.md)), we loose some accuracy when storing fractional values.
```js
let a = 0.2 + 0.1;
console.log(a) // 0.3000000000000004, not 0.3
a = 11.2 + 11.1;
console.log(a) // 22.299999999999997, not 22.3
```
- Use decimal.js, bignumber.js for accurate math calculation in Javascript


## TODO
- Number.MAX_SAFE_INTEGER: 2<sup>53</sup>-1
- more knowledge about floating, precision etc...
- look in npm-packages
- look in node-experiments/exchange.js

## Other numbers
```js
// Hexadecimal with zero and x i.e 0x
const hexa = 0x10; // hexadecimal
console.log("hexa",hexa); // 16

const expo = 256e-5; // exponential
console.log("expo",expo);

// octal starts with 0o (zero and english o char)
const octa = 0o30;
console.log("octa",octa); // 24

// binary starts with zero and b i.e 0b
const binary = 0b10001;
console.log("binary",binary); // 17
```

