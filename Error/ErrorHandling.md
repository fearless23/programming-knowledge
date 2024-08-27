## Error Handling with logging

From experience few points are observed
- better to use error as data since we need to do parse error in many cases
- better to log as json for better filtering
- better to give error some code for search/filter purpose
- better to give error some group for top-level search/filter like SERVER or CLIENT (optionally can be 400|500)

## typescript or javascript
- throwing error in javascript/typescript do not strongly-type the error
- whereas returning error as class/data etc.. will have it strongly typed, thus it offers much better typing and easy to debug.

## Why error as data is better
>> Any function in any language will either return something or throw error, errors can be caught or if returned as data can be compared. Ultimately, we have `n` type of state returned by a function.
In many cases we need to check if state returned by function say `state.foo = bar` (state could be result or error), we have to do this comparison regardless of language throw error or return error as data.

- If return error as data: we will need if/else spread across our codebase
- If error is thrown: we might have try/catch spread across our codebase

1. if/else still looks better and it gives proper flow while reading the code
2. error from one function, may not be considered error in other function
Example:
- We call aws-s3 sdk function to fetch file, it throws error if file not found
- But, if we call this function inside a function which loops over a file-paths and return the status


```js
const output = []
for(const filePath of filePaths){
  try{
    const { status, size } = await getAwsFile(filePath);
    output.push({ filePath, status, size })
  } catch(error){
    logger.error("GET_FILE_ERROR", error)
    if(error.code === "FILE_NOT_FOUND"){
      output.push({ filePath, status: "NOT_FOUND" })
    } else {
      output.push({ filePath, status: "UNKNOWN" })
    }
  }
}
return output;
```

```js
const output = []
for(const filePath of filePaths){
  const {status,size} = await getAwsFile(filePath);
  if(status === "FOUND")  output.push({ filePath, status, size })
  logger.error("GET_FILE_ERROR", { status, size })
  if(status === "FILE_NOT_FOUND"){
    output.push({ filePath, status: "NOT_FOUND" })
  } else {
    output.push({ filePath, status: "UNKNOWN" })
  }
}
return output;
```

In above example, #1 we use try-catch, error.code is not standard in many languages and typescript do not give access to Error.Code values as enum
#2 example: since no error is thrown, status is strongly typed

more examples


```js
let user;
try {
  user = await getUser(userId)
  // get user throws if user is not found
  // could be database-call or api call to 3rd party
}
catch (error) {
  if(error instanceof RedisError){
    throw error
  }
  // else continue
}
// we don`t want to throw error if user is not found
if(!user) return { code: "NOT_FOUND", message: "user not found" }
return { code:"FOUND", user };
```

```js
const { status, user } = await getUser(userId)
if(!user) return { code: "NOT_FOUND", message: "user not found" }
return { code:"FOUND", user };
```


## Disadvantages
- in every scenario, we have to check if error !== null type thing
- Stack trace if error is returned as data may not be possible in few languages

```js
const user = await getUser(email);
const orders = await getOrders(user.userId);
return orders;
// here if anything is thrown, it is thrown and never captured
```

```js
const { status, user } = await getUser(email);
if(status !== "success") return { error: "something-something" }
const { status2, orders } = await getOrders(user.userId);
if(status2 !== "success") return { error: "something-something" }
return orders;
// we are more stuff here
```

## Best of both worlds
- each function return `n` state, and group them into 2 branches: result or error
- in js, ts: error is recognized by throw error
- in other languages: it can result<> (RUST)
- or it can be simply return a standard data-format: Response<{type:"Error", ErrorData}>|Response<{type:"Result", ResultData}>
- group into 2 branches help other functions to quickly check if error or not
- use these function in other function

## BOBW1
```js
// this do not work in Javascript, just a suggestion
const response = myFunction!();
const doSomething = parse(response);
// By adding `!` at the end of function, make the response = ResultData and if function return ErrorData it will be returned from here without going to next line
```

## BOBW2
```js
const response = myFunction();
if(response.type === "Error") {
  return response;
}
const doSomething = parse(response);
```

BOBW1 and BOBW2 do same exact thing, BOBW1 has less code using !

## BOBW3
```js
// this do not work in Javascript, just a suggestion
const response = myFunction!().extend(i => {
  if(i.code === "XXX") return {operation:"FORWARD", data:i}; // it goes to next line
  return {operation: "EXIT", data: {...i, foo:"additional context"}}
});
const doSomething = parse(response);
// By adding `!` at the end of function, make the response = ResultData and if function return ErrorData it will be returned from here without going to next line
```

## How to decide error vs data (TLDR: best-guess)
- Check project (using simple error handling)

## NPM Packages
There are packages similar to Rust Response/Result thing
1. https://www.npmjs.com/package/ts-results
2. https://www.npmjs.com/package/oxide.ts
3. https://www.npmjs.com/package/neverthrow (preferred)

These packages offers advanced features like .wrap, .unwrap, .expect, .orElse etc...
- my-chat-gpt-link: https://chatgpt.com/share/4da15cec-c183-4120-b6fd-d1db19e89d85

## Benefits of advanced features
- [error,null] or [null, error]: simpler go style
- Result<> from rust helps with monad; instead of doing following
```ts
const [error1,user] = getUser(1);
if(error1!=null) return err(error1);
const [error2,city] = getCity(1);
if(error2!=null) return err(error2);
return ok({user,city})
```

```ts
const [error1,user] = getUser(1);
if(error1!=null) return err(error1);
const [error2,city] = getCity(1);
if(error2!=null) return err(error2);
return ok({user,city})
```