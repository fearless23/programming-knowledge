const a = Number("Hello");
// Hello string cannot be converted to a number, thus a is NaN
console.log("a is", a) // NaN
console.log("typeof a is", typeof a) // number
// In javascript, a === NaN or a == NaN do not work
console.log(a === NaN, a == NaN, NaN == NaN, NaN === NaN); // false, false, false, false
console.log("Number.isNaN(a)", Number.isNaN(a)) // true
console.log("isNaN(a)", isNaN(a)) // true
const array = [4 / "df", "df" / 4, 'df' / 'df'];
console.log("array is is", array) // [NaN, NaN, NaN]

// Important Note:

// isNaN function checks if a provided value is not a number.
// It forcefully convert the input to a number and then checks
// i.e !isNaN() is true for a number and input that can be converted to a number

// Number.isNaN function checks if provided value is === NaN
// since in javascript, a === NaN, a == NaN, NaN == NaN, NaN === NaN are all false

// Thus, isNaN works similar to Number.isNaN(Number(value))
// Number.isNaN is perfect for checking if something is exactly NaN or not
// So, do not use isNaN anymore

const JS_VALUES = [
  // { "name": "undeclared", value: "undeclared" }, //
  { "name": "undefined", value: (undefined) }, // undefined & undeclared are same
  { name: "null", value: (null) },
  { name: "NaN", value: (NaN) },
  { name: "true", value: (true) },
  { name: "false", value: (false) },
  { name: "0", value: (0) },
  { name: "1", value: (1) },
  { name: "-1", value: (-1) },
  { "name": "", value: ("") },
  { "name": "hello", value: ("hello") },
  { "name": "{}", value: ({}) },
  { "name": "{a:1}", value: ({ a: 1 }) },
  { "name": "[]", value: ([]) },
  { name: "[1, 2, 3]", value: ([1, 2, 3]) },
]

const isNaNTable = JS_VALUES.map(({ name, value }) => {
  return { name, value, typeof: typeof value, number: Number(value), isNaN: isNaN(value), }
});

console.log("isNaN table\n");
console.table(isNaNTable);

/*
┬─────────────┬─────────────┬────────┬───────┐
│    value    │   typeof    │ Number │ isNaN │
┼─────────────┼─────────────┼────────┼───────┤
│    null     │  'object'   │   0    │ false │
│    true     │  'boolean'  │   1    │ false │
│    false    │  'boolean'  │   0    │ false │
│      0      │  'number'   │   0    │ false │
│      1      │  'number'   │   1    │ false │
│     -1      │  'number'   │   -1   │ false │
│     ''      │  'string'   │   0    │ false │
│     []      │  'object'   │   0    │ false │

│  undefined  │ 'undefined' │  NaN   │ true  │
│     NaN     │  'number'   │  NaN   │ true  │
│   'hello'   │  'string'   │  NaN   │ true  │
│     {}      │  'object'   │  NaN   │ true  │
│  { a: 1 }   │  'object'   │  NaN   │ true  │
│ [ 1, 2, 3 ] │  'object'   │  NaN   │ true  │
┴─────────────┴─────────────┴────────┴───────┘
*/

const NumberisNaNTable = JS_VALUES.map(({ name, value }) => {
  return { name, value, typeof: typeof value, "Number.isNaN": Number.isNaN(value), }
});

console.log("Number.isNaN table\n");
console.table(NumberisNaNTable);
/* 
_____________________________________________
│    value     │   type      │ Number.isNaN │
┼──────────────┼─────────────┼──────────────┤
│ 'undeclared' │    '--'     │    false     │
│  undefined   │ 'undefined' │    false     │
│     null     │  'object'   │    false     │
│     NaN      │  'number'   │     true     │
│     true     │  'boolean'  │    false     │
│    false     │  'boolean'  │    false     │
│      0       │  'number'   │    false     │
│      1       │  'number'   │    false     │
│      -1      │  'number'   │    false     │
│      ''      │  'string'   │    false     │
│   'hello'    │  'string'   │    false     │
│      {}      │  'object'   │    false     │
│   { a: 1 }   │  'object'   │    false     │
│      []      │  'object'   │    false     │
│ [ 1, 2, 3 ]  │  'object'   │    false     |
---------------------------------------------
So, Number.isNaN is only true if provided value is NaN
i.e Number.IsNan(NaN) -> true, everything else is false
*/

console.log("-------END------")
