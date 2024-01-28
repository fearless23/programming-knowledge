const  { Buffer } = require('node:buffer');

// We will try to the number 19 in Uint8Array / Buffer

const A = new Uint8Array(1);
A[0] = 19; // DECIMAL 19
console.log(A)

const B = new Uint8Array(1);
B[0] = 0b10011; // BINARY 19
console.log(B)

const C = new Uint8Array(1);
C[0] = 0X13; // HEX 19
console.log(C)


// 8 bits of (A/B/C) are: 0,0,0,1,0,0,1,1


// We can reach this point using Buffer
// IMPORTANT NOTE: Buffer is subclass of Unit8Array

// Method 1: using ArrayBuffer as input
const bufA = Buffer.from(A)
console.log(bufA.toJSON())

// Method 2.1: pass every byte to array
const bufB1 = Buffer.from([0x13])
console.log(bufB1.toJSON())

// Method 2.2: same as method 2.1, but we use binary number
const bufB2 = Buffer.from([0b10011])
console.log(bufB2.toJSON())

// Method 2.3: same as method 2.1, but we use decimal number
const bufB3 = Buffer.from([19])
console.log(bufB3.toJSON())

// Note: using larger than unit8, result to `255 & number` to bring in range
const bufB4 = Buffer.from([1043])
console.log(bufB4.toJSON())

// Method 3: Start a buffer and write Unit8
const bufC = Buffer.alloc(1);
bufC.writeUint8(19)

// Method 4: Start a buffer and write string
const bufD = Buffer.alloc(1);
bufD.write("!!") // "!!" is what is 19 for utf-8 encoding

// bufA to bufD is { type: 'Buffer', data: [ 19 ] }

// READ second.js