import crypto from "node:crypto";

// 1. create hash class for a given algorithm like sha256, other are md5
const hash = crypto.createHash("sha256")

// 2. Update hash
hash.update(x, y)
//>> 1. x is a buffer, y not required and is ignored
//>> 2. x is string, y is encoding(default to utf-8) (x,y) will be used to create buffer

// We can call update all many times we need, since x is buffer and buffers can be concat together

// 3. digest
const output = hash.digest(x)
//>> 1. if x is undefined, output is buffer
//>> 2. if x is some encoding like base64 or hex, output is string
//>> we can also use hash.digest().toString(encoding)