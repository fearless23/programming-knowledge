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
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): this is Err<any> {
    return false;
  }

  // Unwraps the value or throws an error if it is Err
  unwrap(): T {
    return this.value;
  }

  // Unwraps the value or throws a custom error message if it is Err
  expect(msg: string): T {
    return this.value;
  }

  orElse<T>(fallback: () => T){
    return this.value
  }

  getValue(){
    return this.value;
  }
  

  getError(){
    return null;
  }
}

// The Err class to represent an error result
class Err<E extends MyError> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  isOk(): this is Ok<any> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  // Unwrap should throw an error because this is Err
  unwrap(): never {
    throw new Error(`Tried to unwrap an Err: ${this.error}`);
  }

  // Expect should throw an error with a custom message
  expect(msg: string): never {
    throw new Error(`${msg}: ${this.error.code}`);
  }

  orElse<T>(fallback: () => T){
    return fallback()
  }

  getValue(){
    return null;
  }

  getError(){
    return this.error;
  }
}