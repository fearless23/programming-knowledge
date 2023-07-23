const getNumber = (): number | null => {
  return Math.random() > 0.3 ? null : 7;
};

const myOperation = (n: number): [number, number] => {
  return [n, n * 2];
};

const myOperation2 = (n: [number, number]): string => {
  return `${n[0]}-${n[1]}`;
};

const myOperation3 = (n: string): Maybe<string> => {
  if (n.length < 3) return new Maybe<string>(null);
  return new Maybe(n);
};

const earlier_step1 = () => {
  const numberOrNull = getNumber();
  // if (numberOrNull === null) return null; // or throw
  // @ts-ignore
  return myOperation(numberOrNull); // will error
};

export const earlier_step2 = () => {
  const b = earlier_step1();
  if (b === null) return null;
  return myOperation2(b);
};

// With Monads
class Maybe<T> {
  #value: T | null;
  constructor(value: T | null) {
    this.#value = value;
  }

  static nothing<K>() {
    return new Maybe<K>(null)
  }

  static just<K>(value: K) {
    return new Maybe<K>(value)
  }

  map<U>(func: (value: T) => U) {
    if (this.#value === null) return Maybe.nothing<U>();
    return Maybe.just<U>(func(this.#value));
  }

  flatMap<U>(func: (value: T) => Maybe<U>): Maybe<U> {
    if (this.#value === null) return Maybe.nothing<U>();;
    return func(this.#value);
  }

  show() {
    return this.#value;
  }
}

const value = getNumber(); // value
const a = new Maybe<number>(value);
const b = a.map(myOperation); // newValue [number,number]
const c = b.map(myOperation2);
const _d = c.flatMap(myOperation3)
// console.log(c.show());

// Example 2
const v = getNumber(); // value
const start = new Maybe<number>(v);
// @ts-ignore
const end = start.map((i) => "i * 2").map((i) => i * 6);
console.log(end.show());


// Either monad
type IsError<T> = { type: 'error'; error: T };
type IsValue<T> = { type: 'value'; value: T };

export class Either<Err, T> {
  private result: IsError<Err> | IsValue<T>;

  private constructor(result: IsError<Err> | IsValue<T>) {
    this.result = result;
  }

  static error<Err>(error: Err) {
    return new Either<Err, never>({ type: 'error', error })
  }

  static value<U>(value: U) {
    return new Either<never, U>({ type: 'value', value })
  }


  map<U>(fn: (value: T) => U): Either<Err, U> {
    if (this.result.type === 'error') {
      return Either.error<Err>(this.result.error); // can add more context
    }
    return Either.value<U>(fn(this.result.value));
  }

  flatMap<U>(fn: (value: T) => Either<Err, U>): Either<Err, U> {
    if (this.result.type === 'error') return Either.error<Err>(this.result.error);
    return fn(this.result.value);
  }

  // Extract the value from Either (for convenience, but use with caution)
  getValue(): T | never {
    if (this.result.type === 'error') {
      throw new Error('Cannot extract value from error of Either.');
    }
    return this.result.value;
  }

  // Extract the error from Either (for convenience, but use with caution)
  getError(): Err | never {
    if (this.result.type === 'value') {
      throw new Error('Cannot extract error from value of Either.');
    }
    return this.result.error;
  }
}

type User = { userId: string, name: string, city: string }

const dbGetUserCall = (userId: string): User => {
  const a = Math.random() > 0.5;
  if (a) return { userId, name: "Jassi", city: "Barnala" }
  else throw new Error("Cannot find user")
}

const getUser = (userId: string): Either<Error, User> => {
  try {
    const user = dbGetUserCall(userId);
    return Either.value<User>(user);
  } catch (err) {
    return Either.error<Error>(err)
  }
}

type City = { city: string, population: number, area: number, budget: number }
const dbGetCityCall = (city: string): City => {
  const a = Math.random() > 0.5;
  if (a) return { city, population: 3, area: 20, budget: 100 }
  else throw new Error("Cannot find user")
}

const getCity = (city: string): Either<Error, City> => {
  try {
    const cityData = dbGetCityCall(city);
    return Either.value<City>(cityData);
  } catch (err) {
    return Either.error<Error>(err)
  }
}


// Not using monads
const getUserAndCityDetails = (userId: string) => {
  try {
    const user = dbGetUserCall(userId);
    const cityData = dbGetCityCall(user.city);
    return cityData;
  } catch (error) {
    throw error;
  }
}

// using monads
const getUserAndCityDetailsMonadic = (userId: string) => {
  const user = getUser(userId);
  // const cityData = user.map(user => getCity(user.city))
  const cityData = user.flatMap(user => getCity(user.city))
  return cityData.getValue();

}
