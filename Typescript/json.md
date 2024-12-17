## Assert Syntax
- file xx.json
- file index.js
- file package.json where type=module
- contents of index.js (fail)
```js
import x from "./xx.json" assert {type: "json"};
console.log({ x })
```
When you run this file using `node index`, it will throw following error
- throw new ERR_IMPORT_ASSERTION_TYPE_MISSING(url, validType);

## Success
- contents of index.js
```js
import x from "./xx.json" assert {type: "json"};
console.log({ x })
```
This works properly

So, import json in ESM module is done via assert {type: "json"};
This is still experimental in node version 20, so better to use `fs:readFile`

## tsx or esbuild
If we run (FAILED index.js or index.ts) using `tsx` or build it using `esbuild`
it will copy the content of json into finalBuild (`index.js`)

## tsconfig
when tsconfig have module=nodenext, typescript expects assert {type=json} to be present

## Summary
So, 
- use `fs:readFileSync` in the code (since assert is experimental)
- use assert {type: json } in outside src folder to satisfy typescript
- esbuild(src) and tsx(dev-folder) will take care of json
- always use `assert {type: json }` in dev/build-test.js since it will be run by node
- also, use resolveJsonModule=true to satisfy typescript

## using resolveJsonModule
- after using resolveJsonModule, we do not need `assert {type:json}` in ts files
- but it is better to use them

## Summary
- use fs.readFileSync for json file to avoid any confusion
```js
import { readFileSync } from "node:fs";
const eventing = JSON.parse(readFileSync("./dev/event.json").toString());
```