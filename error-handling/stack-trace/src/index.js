import { get } from 'stack-trace';

const myFunc1 = (a) => {
  if (a > 10) {
    return {
      error: true,
      data: {
        input: { a },
        reason: "failed",
        stack: new Error().stack.split("\n") // .slice(1)
      }
    }
  }
  return a + 5;
}

const cleanStackTrace = (stack) => {
  return stack
    .split('\n')                               // Split stack trace into lines
    .filter(line => !line.includes('node:internal') && !line.includes("Object.<anonymous>")) // Filter out internal Node.js calls
    .map(line => {
      const match = line.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);
      if (match) {
        const [_, functionName, filePath, lineNumber] = match;
        return `${functionName.trim()} at ${filePath}:${lineNumber}`;
      } else {
        return line.trim();
      }
    });
}

const err = (input, reason) => {
  const stack = new Error().stack // ?.split("\n") //.map(i => i.trim()).filter(i => !!i).slice(1);
  return {
    input: input,
    reason: reason,
    stack: cleanStackTrace(stack),
  }
}

const myFunc2 = (a) => {
  if (a > 10) {
    return {
      error: true,
      data: err({ a }, "failed in myFunc2")
    }
  }
  return a + 5;
}

const err2 = (input, reason) => {
  const data = get().slice(1).map(i => {
    return {
      file: i.getFileName(),
      func: i.getFunctionName(),
      // col: i.getColumnNumber(),
      line: i.getLineNumber(),
      // method: i.getMethodName(),
      // type: i.getTypeName(),
      // cons: i.isConstructor(),
      // native: i.isNative()
    }
  })
  return {
    input: input,
    reason: reason,
    stack: data,
  }
}

const myFunc3 = (a) => {
  if (a > 10) {
    return {
      error: true,
      data: err2({ a }, "failed in myFunc3")
    }
  }
  return a + 5;
}

const main = () => {
  const a = Math.floor(Math.random() * 20);
  console.log({ a })

  // const b = myFunc1(a);
  // console.log("myFunc1", JSON.stringify(b, null, 2,))

  // const c = myFunc2(a);
  // console.log("myFunc2", JSON.stringify(c, null, 2,))

  const d = myFunc3(a);
  console.log("myFunc3", JSON.stringify(d, null, 2,))
}

main()