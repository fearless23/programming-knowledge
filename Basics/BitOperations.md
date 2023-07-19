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