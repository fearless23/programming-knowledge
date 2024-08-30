class MyError<T extends string = string> extends Error {
  code: T;
  constructor(code: T, message: string) {
    super(message)
    // super.name = code
    this.code = code;
  }
  isErr() {
    return true;
  }
}

const returnError1 = (a: number) => {
  if (a < 1) return a;
  if (a === 1) return new MyError("CODE_E1" as const, "a is less than 1")
  if (a > 1 && a < 5) return new MyError("CODE_gt1_lt5" as const, "a is less than 1")
  return new MyError("CODE_gte5" as const, "a is less than 1")
}

const returnError2 = (a: number) => {
  if (a < 2) return a;
  if (a === 2) return new MyError("CODE_eq2" as const, "a is less than 1")
  if (a > 2 && a < 6) return new MyError("CODE_gt2_lt6" as const, "a is less than 1")
  return new MyError("CODE_gte6" as const, "a is less than 1")
}

const isErr = (res: unknown): res is MyError => res instanceof MyError

const useReturnError = (a: number) => {
  const res = returnError1(a)
  if (isErr(res)) {
    // do something with error
    // type Code = typeof res.code; // code is typed properly
    // if (res.code === "CODE_gte5") { }
    return res;
  }
  const res2 = returnError2(a);
  if (isErr(res2)) {
    // do something with error
    // type Code = typeof res.code; // code is typed properly
    // if (res.code === "CODE_gte5") { }
    return res2;
  }

  return { res, res2 }
}

const ee = useReturnError(1)
if (isErr(ee)) console.log(ee.code)
else console.log(ee.res)
// here, it is also properly typed

// Advantages: Simplicity, err stack trace is automatically done
// Disadvantages: 
// - unwrapOr, and other functions are lost
// - if we start using simple one, later adding ok, err will be lot of refactoring
// - but if we start with ok, err, it can be scale as needed

// https://chatgpt.com/share/4da15cec-c183-4120-b6fd-d1db19e89d85