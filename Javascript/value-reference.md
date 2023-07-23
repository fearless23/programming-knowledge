# Value and Reference

- Numbers, strings, boolean, are always passed-by-value to a function
- Whereas, objects, arrays, functions(interesting) pointer is passed-by-value to a function, so objects can behave as passed-by-value or it may behave as passed-by-reference when some internal value is changed.

## Important
- Numbers, strings, boolean, are always passed-by-value, i.e their values is copied to new memory address and that is passed to function.
- However, Objects (Javascript object, map, set, array, function) are passed by copying the pointer, so any mutation to function argument cannot change the original pointer
  - Say variable `a` points to some object such as `const a = { name: "Jassi" };`, and let call this pointer `p`
  - Copy of pointer `q` is made, sent to function as argument
  - Any mutation to `q` will not affect `p`
  - If you make internal changes to `q` pointer, it will change the value stored at `a={ name: "Jassi" };` thus making this passed-by-reference
  - On the other hand, if be re-assign `q` to a completely new value  such as `q={name: "Jassi" }`, then we have created a completely new value at a new address. Thus, now it is passed-by-value

## number passed-by-value
```js
let a = 3; // number, string or boolean
const addOne = (arg) => {
  arg += 1;
  console.log("Inside function", { arg })
}
addOne(a) // "Inside function" { arg: 4 }
console.log({ a },"outside function") // { a: 3 } "outside function"
```

## boolean passed-by-value
```js
let a = true; // number, string or boolean
const addOne = (arg) => {
  arg = false;
  console.log("Inside function", { arg })
}
addOne(a) // "Inside function" { arg: false }
console.log({ a },"outside function") // { a: true } "outside function"
```

## string passed-by-value
```js
let a = "hello"; // number, string or boolean
const addOne = (arg) => {
  arg += " world";
  console.log("Inside function", { arg })
}
addOne(a) // "Inside function" { arg: "hello world" }
console.log({ a },"outside function") // { a: "hello" } "outside function"
```

## object passed-by-reference
```js
let a = { name: "Jassi" }; // objects or arrays are passed as ref
const addOne = (arg) => {
  arg.name = "Jimmy"; // the a is modified in place
  console.log("Inside function", { arg })
  return arg;
}
const b = addOne(a) // "Inside function" { arg: { name: "Jimmy" } }
console.log({ a },"outside function") // { a: { name: "Jimmy" } } "outside function"
console.log(a === b) // true
```

## object passed-by-value
Here, a argument is object, but the entire value is replaced by new value i.e not mutated (IMPORTANT)
```js
let a = { name: "Hello" }; // a.name is a string, thus passed as value
const addOne = (a) => {
  a = { name: "Hello World!" } // now pointer `q` points to a completely new value, thus passed-by-value
  console.log("Inside function", { a })
  return a;
}
const b = addOne(a) // "Inside function" { a: { name: "Hello World!"} }
console.log({ a },"outside function") // { a: { name: "Hello" } } "outside function"
console.log(a === b) // false
```

## object passed-by-reference
Here, k variables reference to a thus passed-by-reference i.e mutated
```js
let a = { name: "Hello" }; // a.name is a string, thus passed as value
const addOne = (a) => {
  const k = a; // k points to a, a points to outside a, thus passed-by-reference
  console.log("Inside function", { k })
  return k;
}
const b = addOne(a) // "Inside function" { a: { name: "Hello World!"} }
console.log({ a },"outside function") // { a: { name: "Hello" } } "outside function"
console.log(a === b) // true
```

## object passed-by-reference
- here, k points to a, then k is mutated, it is still passed-by-reference i.e mutated
```js
let a = { name: "Hello" }; // a.name is a string, thus passed as value
const addOne = (a) => {
  const k = a; // k points to a, a points to outside a
  k.name = "Hello World";
  console.log("Inside function", { k })
  return k;
}
const b = addOne(a) // "Inside function" { a: { name: "Hello World!"} }
console.log({ a },"outside function") // { a: { name: "Hello" } } "outside function"
console.log(a === b) // true
// PASSED BY REFERENCE
```

## object[field] passed-by-value
- object[field] can be string, number or again an object, so the concept remains the same as above
```js
let a = { name: "Hello" }; // a.name is a string, thus passed as value
const addOne = (str) => {
  str += " World!";
  console.log("Inside function", { str })
}
addOne(a.name) // "Inside function" { str: "Hello World!" }
console.log({ name: a.name },"outside function") // { name: "Hello" } "outside function"
```

## Function passed-by-value
- We mutate func, but since it is passed-by-value, the original function `a` is unchanged.
```js
let a = () => { return 1 }; // a is a function, passed as a reference
const addOne = (func) => {
  func = "Func is now string"; // func fully changed, func now points to new value
  console.log("Inside function", { func })
  return func;
}
const b = addOne(a) // "Inside function" { func: "Func is now string" }
console.log({ a },"outside function") // { a: function } "outside function"
console.log(a === b) // false
```

## Function passed-by-reference
- We do not mutate the entire function, thus it behaves as passed-by-reference
```js
const a = () => { return 1 };
const addOne = (func) => {
  func.foo = "bar"; // func points to original a, thus passed-by-reference
  console.log("Inside function", { func, foo: func.foo })
  return func;
}
const b = addOne(a) // "Inside function" { func: function, foo: "bar" }
console.log({ a, foo: a.foo },"outside function") // { a: function, foo: "bar" } "outside function"
console.log(a === b) // true
```