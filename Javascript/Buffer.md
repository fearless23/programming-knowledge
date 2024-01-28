# Buffer

- [Video](https://www.youtube.com/watch?v=QZIeZM-yXXU)
- [File](./buffer.js)

- Buffer is only available in nodejs(i.e server side)
- whereas ArrayBuffer is Javascript inbuilt DataStructure

- Buffer objects are used to represent a fixed-length sequence of bytes
- The Buffer class is a subclass of JavaScript's Uint8Array class
- `Buffer.alloc(n)` * Allocates a new Buffer of `n` bytes.

- Recommended Read: first.js

## Definition
Any content stored in memory is stored in bytes. Buffer gives us the low-level api to interact with bytes and also create bytes of memory to insert content.

Buffer are low-level representation 

## 1. Build/Allocate
Allocate some `n` bytes of memory and then write to it.

## 2. Build from
Build from ArrayBuffer/Uint8Array/Buffer or content

## 3. Convert/Transform
Since, buffer represent bytes we can transform from one encoding to another
>> Buffer.from takes input such as Buffer, ArrayBuffer, or Array or an Array-like Object
>> Buffer.from("hexContent","hex"); content in string form, encoding is required(default to utf-8)
>> Buffer.from(BytesArray); no encoding required
>> Buffer.from(ArrayBuffer); no encoding required

```js
import { Buffer } from 'node:buffer';
const buf = Buffer.alloc(6); // 6 bytes memory reserved
// By default, buffer contains u8 integers
// Thus, buf = array of size=6 filled with 0`s
buf.write("a", "utf-8"); // a written in first index, a = 97
console.log(buf); // <Buf 61 00 00 00 00 00>, 61 is hexadecimal for 97
console.log(buf.toJSON()); // { type: 'Buffer', data: [97, 0, 0, 0, 0, 0] } // decimal values
console.log(buf[1]); // 0
console.log(buf[0]); // 97
```

// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3]);

// Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
// are all truncated using `(value & 255)` to fit into the range 0–255.
const buf5 = Buffer.from([257, 257.5, -255, '1']);

```js
const e = Buffer.from("jassi");
```
Above example, writes each character of string into each index of array

idx | char | ASCII(decimal) | Hexadecimal
 ---| ---| ---|---|
 0 | j | 106   | 6a
 1 | a |  97   | 61
 2 | s | 115   | 73
 3 | s | 115   | 73
 5 | i | 105   | 69

- `Buffer.from("jassi")` automatically creates a buffer of length=6 
- then write each character into the buffer.

| Value | console.log value|
|---| ---|
Buffer.from("jassi") | `<Buffer 6a 61 73 73 69>`
Buffer.from("jassi").toJSON() | `{ type: 'Buffer', data: [ 106, 97, 115, 115, 105 ] }`

```js
// Vice-versa, i can do reverse of it
// jassi -> { type: 'Buffer', data: [ 106, 97, 115, 115, 105 ] }
const j = Buffer.from([106, 97, 115, 115, 105], "utf-8");
console.log(j.toString(), "j") // jassi

// jassi -> { type: 'Buffer', data: [ 106, 97, 115, 115, 105 ] }
// jassi -> <Buffer 6a 61 73 73 69>
const k = Buffer.from([106, 97, 115, 115, 105], "hex");
console.log("k", k.toString()) // jassi
console.log("k - ascii ->".padStart(15), k.toString("ascii")) // jassi
console.log("k - binary ->".padStart(15), k.toString("binary")) // jassi
console.log("k - hex ->".padStart(15), k.toString("hex")) // 6a61737369
console.log("k - utf16le ->".padStart(15), k.toString("utf16le")) // 慪獳
```


## Check ASCII Chars
```js
for (let i = 0; i < 300; i++) console.log(i, String.fromCharCode(i))
```