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
- Sign and mantissa are stored in their locations, whereas exponent is modified (adding some bias) and then stored

## Exponent Bias
- Exponent is not stored directly , E\` = E + bias, E\` is stored instead
- bias is `127` for f32 and `1023` for f64

## Limits
- Exponent in f32 has  8 bits, thus exponent storable can be is  [0,2^8) = [0, 256)
- Exponent in f64 has 11 bits, thus exponent storable can be is [0,2^11) = [0,2048)

- f32: E\` = [0,256) = E + 127 => E = [-127,129)
- f64: E\` = [0,1024) = E + 1023 => E = [-1023,1025)
- We add bias of 127 to [-127,129) so that E\` is in [0,256) range
- We add bias of 1023 to  [-1023,1025) so that E\` is in [0,2048) range

- Since, number is reduced to 1.xxxx * 2 ^ exponent in binary
- Max Number f32: 1.xxx * 2 ^ 129 or ~ 10^38 or 10^39
- Min Number f32: 1.xxx * 2 ^ -127 or ~ 10^-38 or 10^-39
- Max Number f64: 1.xxx * 2 ^ 1025 or 10^308
- Min Number f64: 1.xxx * 2 ^ -1023 or 10^-308

- 12 is `1100.101` -> `1.100101` * 2<sup>3</sup> (4 digit to left of decimal, can move decimal left by 3, thus exponent=3)
- stored exponent = 3 + 127=130=10000010 for f32 
- or 3 + 1023=1026=10000000010 for f64

## Why the bias is added
- [Article](https://stackoverflow.com/questions/19864749/why-do-we-bias-the-exponent-of-a-floating-point-number)
Lets start with a number, positive or negative, represented in binary.
- We have sign, mantissa and exponent
- Our exponent can be positive or negative but to store the exponent we have 8 or 11 bits without sign.
- So, by adding the bias, we convert any negative exponent to >= 0.
- Thus, bias is added to avoid storing sign
- There are other reason to use it as a bias (beyond scope), because we could have stored exponent`s sign in first bit and remaining bits for exponent value.