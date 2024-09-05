## Javascript Errors

## Error
- This is base class for any error in any platform: node, browser, bun, 
- it has message(input from creator), name(default=Error) and stack(created by language), cause (passed by user)
- Based on platform; error can have more or less properties like code in nodejs
- [MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Other error type in Javascript
- [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)
  - Creates an instance representing a syntax error.
- [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)
  - Creates an instance representing an error that occurs when a numeric variable or parameter is outside its valid range.
- [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)
  - Creates an instance representing an error that occurs when de-referencing an invalid reference.
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
  - Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.
- [URIError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError)
  - Creates an instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters.
- [EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)
  - Creates an instance representing an error that occurs regarding the global function eval().
  - this is not thrown anymore

## Other
- AggregateError
  - Creates an instance representing several errors wrapped in a single error when multiple errors need to be reported by an operation, for example by Promise.any().
- AssertError
- SystemError: if nodejs internal system fails

## Nodejs error.code property
- nodejs error can have code property to easily and statically know the error
- [Link](https://nodejs.org/api/errors.html#nodejs-error-codes)

## 
set Error.stackTraceLimit = 4; // or any other number