# Decimal to binary

## How to convert integer to binary
### number=4
1. 4/2 : Remainder = 0 : Quotient = 2
2. 2/2 : Remainder = 0 : Quotient = 1
3. 1/2 : Remainder = 1 : Quotient = 0
- So binary of 4 is 100

### number=17
1. 17/2 : Remainder = 1 : Quotient = 8
2. 8/2 : Remainder = 0 : Quotient = 4
3. 4/2 : Remainder = 0 : Quotient = 2
4. 2/2 : Remainder = 0 : Quotient = 1
5. 1/2 : Remainder = 1 : Quotient = 0
- So binary of 17 is 10001



## Loss of numbers with rounding errors 
- We loose some accuracy when using floating point arithmetic

### Example 1
- 1/3 in decimal is 0.333333 (repeating digits)
- Computer will store 1/3 as 0.333333333333 (limited 3`s as we cant have infinite digits)
- 1/3 + 1/3 + 1/3 will be 1 (in maths)
- but 1/3 + 1/3 + 1/3 will be 0.999999999999 (in programming)


## Example 2
- Lets say 19/7 is 2.71428571429, 
- if precision is 3, then 19/7 is 2.714
- but 2.714 is not exactly 19/7, but more like 752/277

So, fractional representation of fractional in binary comes with a price of precision.

## Example 2
- 0.1 in decimal is 0.000110011 (repeating 0011)
- 0.2 in binary is 0.00110011 (repeating 0011)
- We cannot store infinite digits just like example 1
- So, 0.1 or 0.2 cannot be represented with 100% accuracy in binary
- Fractional in decimal that can be represented in binary within limited digits will have 100% accuracy, others will loose accuracy

## How to convert fractional number to binary
> Method 1: 
- Any fraction can be represented as a / b, where b = 2<sup>precision</sup>
- Thus, 0.625 with precision 4 can be written as 10 / 2^4 => 10 is 1010 in binary
- so, 0.625 is .1010 in binary
> Method 2: Keep multiplying by 2, if result number >= 1, drop 1 (repeat steps for precision times)
> and then collect the integral parts
> Method 2 can be used in coding

> Note: storing 315 in 8 spaces is 00000315, since 00000315 =315  
> Note: storing 0.315 in 8 spaces is 0.3150000, since 0.3150000 = 0.315  
> Note: We add zeroes in front for integer part, and at last for fractional part  

### fraction = .625, precision = 4 (method 1)
- 0.625 = 10 / 16
- 10 in binary is 1010
- So, binary of .625 is .1010
- So, after storing 0.625, getting it back will be 0.625

### fraction = .625, precision = 4 (method 2)
1. 0.625 * 2 = 1.25, Integral part: 1
2. 0.25 * 2 = 0.50, Integral part: 0
3. 0.50 * 2 = 1.00, Integral part: 1 (1 -> 0)
4. 0.00 * 2 = 1.76, Integral part: 0
- So, binary of .625 is .1010
- So, after storing 0.625, getting it back will be 0.625

### fraction = .47, precision = 3
- Method 1
  - 0.47 = 3.76 / 8 ~ 3 / 8
  - 3 is 11 in binary
  - so, 0.47 is .011 in binary(precision 3)
  - 3 / 8 is 0.375
  - storing 0.47 in memory gets back 0.375 (if precision is 3)
- Method 2
  1. 0.47 * 2 = 0.94, Integral part: 0
  2. 0.94 * 2 = 1.88, Integral part: 1 (1.88 will be 0.88)
  3. 0.88 * 2 = 1.76, Integral part: 1
  - So binary of .47 with precision 3 is .011, convert .011 to decimal gives 0.375 as seen in method 1

### fraction = .47, precision = 8
- 0.47 = 120.32 / 2^8 ~ 120 / 256
- 120 in binary is 1111000
- 120 / 256 is 0.46875
- so, 0.47 is .01111000 in binary with precision 8
- Also, .01111000 in decimal is 0.46875
- So, storing 0.47 reads 0.46875 with precision 8

### fraction = .2, precision = 8 (method 1)
- 0.2 = 51.2 / 256 ~ 51 / 256
- 51 in binary 110011
- 128 / 256 = 0.19921875
- So, .2 in binary is .00110011 with precision 8
- Also, .00110011 in decimal is 0.19921875
- So, after storing 0.2, getting it back will be 0.19921875

### fraction = .2, precision = 23 (method 1)
- 0.2 = 1677721.6 / 2^23 ~ 1677721 / 2 ^23
- 1677721 in binary 110011001100110011001
- So, .2 in binary is .11001100110011001100100 with precision 23
- 1677721 / 2 ^23 = 0.19999992847442626953
- So, .2 will read as 0.19999992847442626953 stored in precision 23

### fraction = .2, precision = 52 (method 1)
- 0.2 = 1677721.6 / 2^23 ~ 1677721 / 2 ^23
- 1677721 in binary 110011001100110011001
- So, .2 in binary is .00110011001100110011001 with precision 23
- 1677721 / 2 ^23 = 0.19999992847442626953
- So, .2 will read as 0.19999992847442626953 stored in precision 23

## Precision in decimal
Binary precision `n` have `n` bits to store fractional
- In method 1, 0.47 is written as k / 2^n
- k = 0.47 * 2 ^ n
- 2 ^ n is approximately 10 ^ (n / 3.32193)
- 2 ^ 52 = 10 ^ (15.65)
- k = 0.47 * 2 ^ 52 = 0.47 * 10 ^ 15.65
- so binary precision = 3.32193 * decimal precision

- thus precision 52 in binary is precision 15(15.65) in decimal
- thus precision 23 in binary is precision 6(6.923) in decimal

