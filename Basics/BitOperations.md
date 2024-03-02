# Bit Operations

Usually, languages use following to denote boolean operations
- AND: &&
- OR: ||
- NOT: !

Similarly, binary operations use following
- AND: &  (same as AND)
- OR: |   (same as OR)
- XOR: ^ (known as exclusive or, both values must be different or sum of digit is 1 only)
- LEFT SHIFT: << (add `n` 0`s at end)
- RIGHT SHIFT: >> (remove `n` digits from end)
- NOT: ~


A| B | A & B | A or B | A ^ B
|--|--|--|--|--|
0| 0| 0| 0| 0
0| 1| 0| 1| 1
1| 1| 1| 1| 0
1| 0| 0| 1| 1

## Examples
- 2 ^ 10 (decimal system)
- 10 ^ 1010
- 0010 ^ 1010
- 1000
- 1000 is 8 in decimal



```js
// Check if nth position is turned on in A
// set B to be all zeros except at nth position
// now, A & B should be B
// same can be done for multiple position at a time
// in following example, we want to check if 4th and 7th position are turned on
// we set B to have 4th and 7th to be 1 and rest to be zero
// if A have 4th and 7th position as 1, result of A & B will B

const A = 0b10011011;
const B = 0b01001000;
const AB = (A & B);
console.log({ A, B, AB, ON: AB === B })
```


```js
// in following example, we want to check if 4th and 7th position are turned OFF
// we set B to have 4th and 7th to be 0 and rest to be ones
// if A have 4th and 7th position as 0, result of A | B will B
const A = 0b10010011;
const B = 0b10110111;
const AB = (A | B);
console.log({ A, B, AB, ON: AB === B })
```