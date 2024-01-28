// In first.js we have seen Buffer and Unit8Array

// Now, We have Buffer and we can convert it to a string of certain format
const buf1 = Buffer.from([65])
console.log(buf1.toString("utf-8")) // "A"
console.log(buf1.toString("hex")) // "41"
console.log(buf1.toString("binary")) // "A"
console.log(buf1.toString("base64")) // "QQ=="

// You see above that utf-8 and binary are "A" since that is the default string encoding
// which means "A" as text (in utf-8 format) stored as 0b1000001 or 65 in computer.

// What happens if we save "A" as text (in utf-8 format) in our computer
const buf2 = Buffer.from("A","utf-8")
console.log(buf2.toJSON()) // { type: 'Buffer', data: [ 65 ] }

// This is what utf-8 encoding is: All english alphabets are encoded as some numbers

// This brings us to Buffer.from a string
// We did Buffer.from using Unit8Array or any array of bytes in first.js
// In second.js; we wil learn about Buffer.from string + encoding

// UTF-8 Encoding (de-facto web format)
// Given a string and its encoding; a buffer is created
const buf3 = Buffer.from("A", "utf-8") // any common keyboard typed string
console.log(buf3.toJSON()) // { type: 'Buffer', data: [ 65 ] }
// Given a larger string in utf-8; each char is 8bits i.e byte 
// so array of bytes represent each character
const buf4 = Buffer.from("ABC", "utf8")
console.log(buf4.toJSON()) // { type: 'Buffer', data: [ 65, 66, 67 ] }

// HEX
// should be a valid hex number as string
const buf5 = Buffer.from("10", "hex") 
console.log(buf5.toJSON()) // { type: 'Buffer', data: [ 16 ] }

// given a larger string; it will break each into 2 chars group and convert that to decimal
const buf6 = Buffer.from("C8C8", "hex")
// C8C8 is C8 C8 -> 200, 200
console.log(buf6.toJSON()) // { type: 'Buffer', data: [ 200, 200 ] }

const buf7 = Buffer.from("03C8", "hex")
// 03C8 is 03 C8 -> 3, 200
console.log(buf7.toJSON()) // { type: 'Buffer', data: [ 3, 200 ] }

const buf8 = Buffer.from("3C8", "hex")
// 3C8 is 3C 8 -> 60, 8(ignored)
console.log(buf8.toJSON()) // { type: 'Buffer', data: [ 60 ] }

const buf9 = Buffer.from("3B81ZS10", "hex")
// Invalid Hex string --> 3B81ZS10
// 3B81ZS10 -> 3B 81 ZS 10 -> 59, 129, invalid, ignored
// As soon as we encounter bad hex like ZS; rest of the bytes are ignored
console.log(buf9.toJSON()) // { type: 'Buffer', data: [ 59, 129 ] }


// BINARY
// As we have seen earlier, binary encoding and utf-8 encoding are similar for computer
// Since, we provide a string to computer; computer default uses utf-8 to encode
// So, every keyboard key is encode to a number, even numbers itself
// 0 as string is stored as 48
// 1 as string is stored as 49
// A as string is stored as 65
// a as string is stored as 97
const STR = "01ABab"
const buf10 = Buffer.from(STR, "binary")
const buf11 = Buffer.from(STR, "utf-8")
console.log(buf10.toJSON()) // { type: 'Buffer', data: [ 48, 49, 65, 66, 97, 98 ] }
console.log(buf11.toJSON()) // { type: 'Buffer', data: [ 48, 49, 65, 66, 97, 98 ] }

// BASE64: TODO