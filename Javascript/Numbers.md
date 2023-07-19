# Numbers
- [Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
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

## Integers in f64
Javascript represent both integers and floats in f64. Floats are represented in f64 as is, 
but to store integer in f64, lets check few points
- (-1)^sign * (1+mantissa) * 2^exponent
- sign: 0 or 1
- mantissa: 0
- exponent max: 1025
- Max integer = 10^308 (check [Numbers](../Basics/Numbers.md))
- Min integer = 10^-308 (check [Numbers](../Basics/Numbers.md))
- Since, storing numbers in floating point losses precision/accuracy, there is safe limit for storing integers in f64, which turns out to be 2^53 or 9 * 10^15

## Example
- 315 -> 100111011 in binary
- If stored as integer, it will be 100 precise, but we store integers in f64 in javascript
- so, 100111011 -> 1.00111011 * 2^8
- We will store `.00111011` as mantissa, 8+1023 as exponent, 0 as sign
- So, max we can store mantissa is 53(52+1), thus max safe integer will be 2^53-1
- After that, we will loose accuracy, say we want to store 2^55 in f64, last 2 digits will be compromised

## LIMITS
- NUMBER.MAX_VALUE: 1.xx+308 (as max exponent=308 for f64)
- NUMBER.MIN_VALUE: 5e-304 (as min exponent=-308 for f64)
- Number.MAX_SAFE_INTEGER: 2<sup>53</sup>-1
- Number.MIN_SAFE_INTEGER: -1 * Number.MAX_SAFE_INTEGER
- Number.POSITIVE_INFINITY > Number.MAX_VALUE
- Number.NEGATIVE_INFINITY < Number.MIN_VALUE
- Number.EPSILON: difference b/w 1 and next floating point number or smallest difference possible. or 2.220446049250313e-16

## Number methods
- toFixed(n=0): only returns `n` digits after decimal, rounding is done if needed, or padding is done if necessary.
- toPrecision(n): Converts number to scientific notation, picks `n` significant digits and return the value in decimal.
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


## toPrecision example 1
Represent 0.000123 with precision
- 0.000123 => 1.2300 * 10^-4
- Precision 5: 1.2300 * 10^-4 = 0.00012300
- Precision 2: 1.2 * 10^-4 = 0.00012
- Precision 1: 1 * 10^-4 = 0.0001

## toPrecision example 2
Represent 1234.5 with precision
- 1234.5 => 1.2345 * 10^3
- Precision 6: 1.23450 * 10^3 = 1234.50
- Precision 5: 1.2345 * 10^3 = 1234.5
- Precision 2: 1.2 * 10^3 = 1200
- Precision 1: 1 * 10^3 = 1000

## toFixed example 1
Represent 0.456123 with toFixed
- toFixed 8: 0.45612300 (padded)
- toFixed 6: 0.456123
- toFixed 4: 0.4561
- toFixed 2: 0.45 -> 0.46 (rounded)
- toFixed 1: 0.4 -> 0.5 (rounded)
