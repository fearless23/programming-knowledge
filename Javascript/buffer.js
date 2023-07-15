import { Buffer } from 'node:buffer';
const buf = Buffer.alloc(6); // 6 bytes memory reserved
buf.write("a", "utf-8"); // a written in first index, a = 97
console.log(buf); // <Buf 61 00 00 00 00 00>, 61 is hexadecimal for 97
console.log(buf.toJSON()); // { type: 'Buffer', data: [97, 0, 0, 0, 0, 0] } // decimal values
console.log(buf[1]); // 0
console.log(buf[0]); // 97

const e = Buffer.from("jassi");
console.log(`Buffer.from("jassi") is `, e); // <Buffer 6a 61 73 73 69>
console.log(`Buffer.from("jassi").toJSON() is `, e.toJSON()); // { type: 'Buffer', data: [ 106, 97, 115, 115, 105 ] }

const j = Buffer.from([106, 97, 115, 115, 105], "utf-8");
console.log(j.toString(), "j") // jassi

const k = Buffer.from([106, 97, 115, 115, 105], "hex");
console.log("k", k.toString()) // jassi
console.log("k - ascii ->".padStart(15), k.toString("ascii")) // jassi
console.log("k - binary ->".padStart(15), k.toString("binary")) // jassi
console.log("k - hex ->".padStart(15), k.toString("hex")) // 6a61737369
console.log("k - utf16le ->".padStart(15), k.toString("utf16le")) // 慪獳