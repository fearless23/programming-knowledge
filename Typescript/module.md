## tsconfig module and module resolution

### module
- https://www.typescriptlang.org/tsconfig/#module
- https://www.typescriptlang.org/docs/handbook/modules/reference.html#the-module-compiler-option
- Module field is way of telling tsc, how to resolve file aka modules
- historically, module field was used for compiling ts to js
- but, now if module=(node16 or nodenext), it choose to do following

## module = node16 or nodenext
- .mts/.mjs/.d.mts files are always ES modules.
- .cts/.cjs/.d.cts files are always CommonJS modules.
- .ts/.tsx/.js/.jsx/.d.ts files are ES modules if the nearest ancestor package.json file contains "type": "module", otherwise CommonJS modules.

## Notes
- any app running on node v12+, should only use node16 or nodenext
- difference b/w node16 and nodenext
  - they are same as of now
  - if node changes its module resolution system, it will reflect in nodenext
  - node16 is fixed and wont change
  - any new changes will be added to nodenext
- use tools like esbuild to build, since build with tsc is not that great

## moduleResolution
- moduleResolution deals with handle modules using paths
- module deals with module types(esm, common, mjs, cjs etc..), moduleResolution deals with import,export and require statements at top of files
- module and moduleResolution are inter-linked and inter-dependent
```js
import x from "./mod.js"; // works in all settings
import x from "./mod.ts"; // may not work in all settings
// If we use esbuild, it will work for all settings

import x from "@helpers/utils.js"; // tsconfig paths
// work with esbuild
// do not work with tsc compiler
```

- Set this field to `bundler` for tsconfig.build.json
- use .js always for import/exports