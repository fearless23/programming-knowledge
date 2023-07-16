# Numbers
Number represent mathematical numbers, integers and numbers with dot in decimal system
There are binary, hexadecimal and octa based numbers as well.

## Number types
- int (u8, u16,u32,u64,i8,i16,i32,i64)
- float (f32,f64)

## Popular notion
- short: 16 bits (u16,i16)
- long: 32 bits (u32,i32, f32)
- double: 64 bits (u64,i64,f64)

## Integers (u or i)
Integer signed or unsigned are stored in bytes
- u8: take 8bits or 1 byte
- u16: take 16bits or 2 bytes
- For unsigned integers, say u8 all 8 bits are used thus integers in [0, 2<sup>8</sup>) range can be stored.
- For signed integers, left most bit is reserved for sign (0 positive,1 negative), and remaining 7 bits for storing the integer, thus integer from [-2<sup>7</sup>, 2<sup>7</sup>) can be stored
- Integers are also called fixed point numbers

## Precision for float
- Check [DecimalToBinary](./DecimalToBinary.md) for loss of accuracy
- Floating point numbers represent numbers with fraction like 1.123 but stored in computer memory in binary
- Floating point is divided into sign, exponent, and fraction part
- Number is `(−1)`<sup>`sign`</sup> * `(1+mantissa)` *`2`<sup>`exponent`</sup>

Numbers with decimals are stored as floating number
- single precision floating point numbers: f32
  - Biggest integer part: 2^8
  - Value (aka Fraction/Mantissa): 23 bits (0 - 22)
  - Exponent: 8 bits (23 - 30)
  - Sign: 1 bit (31)
  - Decimal precision: 6 or 7 (check [DecimalToBinary.md](./DecimalToBinary.md))
- double precision floating point numbers: f64
  - IEEE 754 divides number into Fraction, exponent, sign
  - Biggest integer part: 2^11
  - Value (aka Fraction/Mantissa): 52 bits (0 - 51)
  - Exponent: 11 bits (52 - 62)
  - Sign: 1 bit (63)
  - Decimal precision: 15 or 16 (check [DecimalToBinary.md](./DecimalToBinary.md))

## Floating-point representation
Consider number `12.625`, 12 is the integer part and 0.625 is the fractional part
- 12 in binary is `1100` and 
- 0.625 in binary is `0.101` (Check Fraction to binary in [DecimalToBinary](./DecimalToBinary.md))
- 12.625 in binary is represented as `1100.101`
- `1100.101` -> move decimal after left most -> `1.100101` * 2<sup>3</sup>
- Exponent = 3
- Sign = 0 (positive)
- Mantissa = 100101

## Limits
- Exponent in f64 has 11 bits, thus max exponent can be is 2^11
- Exponent in f32 has  8 bits, thus max exponent can be is 2^8
- 12 is `1100.101` -> `1.100101` * 2<sup>3</sup> (4 digit to left of decimal, can move decimal left by 3, thus exponent=3)
- Thus, Max integer part for f64 can be `1--11zeroes--.--some--` i.e 2 ^ 11
- Thus, Max integer part for f32 can be `1--8zeroes--.--some--` i.e 2 ^ 11