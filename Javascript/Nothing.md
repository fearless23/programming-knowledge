# Nothing in Javascript
- Nothing is javascript manifests in many ways like void, undeclared, undefined, null, NaN.
- Other languages, systems or databases, usually have null (or nil) representing intentionally absent value.
- Other systems do not have undefined or NaN values, they will throw error if something is NaN or undefined.
- MySQL only have `NULL`
- Rust do not have concept of null pointers, it has Option::None

1. Check [NaN](./nan.js) in detail
1. undeclared and undefined are similar for all purposes ?
2. typeof void -> no applicable
3. typeof undefined is undefined
4. typeof null is object
5. both null & undefined are primitives

- undefined is for variable either undeclared or declared but not assigned any value.
- null is a value representing nothing

## undeclared
undeclared just means if a variable is not even declared like in this file variable `k` is not declared anywhere.
Most cases, using an undeclared variable will throw error, but still accessing property from obj will give undefined if variable is not declared.

## undefined
[Article](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)
- undefined is a primitive value assigned to a variable which are only declared but not assigned any value.
- undefined value can also be set explicitly
- Thus, undefined is the implicit value assigned to just declared variables.

## Explicit and Implicit undefined
```js
k; // undefined as k is undeclared, (this will throw an undeclared error in strict mode)
let a; // a is undefined as it is declared but not assigned
let b = undefined; // b is undefined as it is explicitly set to undefined
```
## Explicit and Implicit undefined in obj
```js
const obj = { p:1, r: undefined };
obj.q // undefined as q is undeclared
obj.r // undefined as r is explicitly set to undefined
```
In above example, obj.q and obj.r are both undefined, however r is explicitly set to undefined, but `q` is not even declared. To diffrentiate b/w these two use
- `Object.hasOwn(obj, "q") -> false`
- `Object.hasOwn(obj, "r") -> true`

## function return value
```js
// Functions returning nothing
const func = (a) => { return; }
const c = func(3);
// c is undefined, since func do not return anything
``` 

## Function argument
```js
const func = (a) => { console.log(`a is ${a} and type is ${typeof a}`) }
func2() // it will print --> `a is undefined and type is undefined`

const func2 = (a) => {  return a }
const x = func2() // x is undefined
```

## Optional Arguments 
```js
const func = (a = 1) => { console.log(`a is ${a} and type is ${typeof a}`) }
// 
func() // it will print --> `a is 1 and type is number`
func(undefined) // it will print --> `a is 1 and type is 1`
func(null) // it will print --> `a is null and type is object`
```
#### Important Note
In example above, `a` will set to `1` only and only if `a` is undefined, if `a` is passed as `null` it will be `null` not `1`


## Check for undefined
```js
let x;
console.log("DFdf")
console.log(x === undefined) // true
console.log(typeof x === "undefined") // true

// Remember `k` is not declared at all
console.log(k === undefined) // ReferenceError: k is not defined
// Important: use following to check for undeclared variables
console.log(typeof k === "undefined") // true (no error)
```

## null (in Computer Science)
In computer science, a null value represents a reference that points, generally intentionally, 
to a nonexistent or invalid object or address. The meaning of a null reference varies among language implementations.

## null (Javascript)
[Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)

- The null value represents the intentional absence of any object value

> Note: null is a primitive value in javascript, but type is "object".
> This is considered a bug, but one which cannot be fixed because it will break too many scripts.

```js
let a = null; // a is set to null

const obj = { p: null };
obj.p // null as q is set to null
const func = (a) => {
  return null;
}
const c = func(3); // c is null
```

## Differences b/w null & undefined
- undefined is a value, implicitly assigned to variables which
  1. represent nothing
  2. just declared but not assigned any value
- undefined can be explicitly assigned
- null is a value, explicitly assigned representing intentional absence of value
- JSON only have null, undefined do not exists in JSON
- Data coming from JSON or Databases usually have null, but not undefined, so does other languages do not have concept of undefined, only null. So, make sure when dealing with absence of value in Javascript, both null & undefined are considered. (check isNil or isNullish functions below)


## Combining null & undefined
- Both undefined or null represents nothingness
- undefined == null  -> true
- undefined === null -> false

## Nullish
Nullish - null or undefined

```js
const isNullish = (a) => a == null;
```

## Nil
- Self created function inspired from lodash`s `isNil` function
- NIL equals any of undeclared, undefined, null or NaN
- This way we have one concept for nothingness orr absence of value
```js
const isNil = (a) => a == null || Number.isNaN(a);
```

## void
- [Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
The void operator evaluates the given expression and then returns undefined.

```js
const output = void 1;
console.log(output); // undefined

void console.log('something'); // console logs -> "expression evaluated"

const func = (a) => {  return a + 1 }
const output2 = void func(3); // similar to calling void 4
console.log(output2); // undefined

// anything defined after void is not scoped and do not exist of file scope
// thus, test function is not available in rest of file
void function test() {
  console.log('test function executed');
};
try {
  test();
} catch (e) {
  console.log('test function is not defined');
  // Expected output: "test function is not defined"
}
// Since, anything
```

## void returns
```js
const func = () => { 
  return void 0 // returns undefined as void returns undefined
} 
console.log(func())  // undefined
const func2 = () => { 
  void 0;  // will not return from here
  return "after void"  // will return "after void" from here
}
console.log(func2()) // "after void"
```

## void evaluation
```js
console.log(void 2 === "2"); // -> (void 2) === "2" -> undefined === "2" -> false
console.log(void (2 === "2")) // -> void (2 === "2") -> void false -> undefined
```