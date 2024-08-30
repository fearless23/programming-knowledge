import { MyError } from "./type"

export type OkOutput<T> = Ok<T>
export type ErrOutput<T extends MyError> = Err<T>

export type Result<T, E extends MyError> = Ok<T> | Err<E>
export type ResultAsync<T, E extends MyError> = Promise<Result<T, E>>

// helpers
export const ok = <T>(data: T) => new Ok(data)
export const err = <T extends MyError>(error: T) => new Err(error)


// The Ok class to represent a successful result
class Ok<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  // isOK returns true, false in Err
  isOk(): this is Ok<T> {
    return true;
  }

  // isOK returns false, true in Err
  isErr(): this is Err<any> {
    return false;
  }

  // Unwraps the value, throws an error in Err
  unwrap(): T {
    return this.#value;
  }

  // Unwraps the value, throws a custom error message in Err
  expect(msg: string): T {
    return this.#value;
  }

  // do nothing in Ok, but returns fallback value in Err
  orElse<T>(fallback: () => T) {
    return this.#value
  }

  // return value in Ok, return null in Err
  get value() {
    return this.#value;
  }

  // return null in Ok, return Err in Err
  get error() {
    return null;
  }

  // Applies a function to the value if Ok, does nothing if Err
  map<U>(fn: (value: T) => U): Ok<U> {
    return new Ok(fn(this.value));
  }

}

// The Err class to represent an error result
class Err<E extends MyError> {
  #error: E;

  constructor(error: E) {
    if (error.code == null || error.code === "") {
      throw new Error("Error with code cannot be constructed")
    }
    this.#error = error;
  }

  isOk(): this is Ok<any> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  // Unwrap should throw an error because this is Err
  unwrap(): never {
    throw new Error(`Tried to unwrap an Err: ${this.#error}`);
  }

  // Expect should throw an error with a custom message
  expect(msg: string): never {
    throw new Error(`${msg}: ${this.#error.code}`);
    // Can return new Err({...this.error, message: msg,})
  }

  orElse<T>(fallback: () => T) {
    return fallback()
  }

  get value() {
    return null;
  }

  get error() {
    return this.#error;
  }

  matchCode<C extends E["code"]>(code: C): this is Err<Extract<E, { code: C }>> {
    return this.#error.code === code;
  }

  get code() {
    return this.#error.code;
  }

  map<U>(_: (value: unknown) => U): Err<E> {
    return this;
}
}

/*
Note: when returning Ok(1), instead of 1, there is overhead and more memory-usage
but this happens per function and function get out of stack 
However, if running in a large loop or nested loop, these Ok or Err classes 
will stay in memory and thus causing higher memory usage and overhead for GC

*/