# Monads

Monads simply are boxes like wrapper functions, decorators, closures, but monads offers seamless way to inter-op between boxes.

## Boxes
Boxes in programming is not a standard or universal concept, still you can think of box containing a value with some additional information.
In real world, a box contains a product(say smartphone) along with Manual, Charger etc.

- Wrapper Functions: Wrap a function with additional functionality, but thats about it
- Closures/Currying: Have a internal state that all inner function have access to, but thats about it
- Monads: Monads also have a value inside them, along with additional functionality or information, but it also offers a way to produce or transform to another box.

## Basic Example
- Box=A, additional information or functionality=a, value=v1
- Box=B, additional information or functionality=b, value=p
- Monad is A(v1,a)
- Monad offers methods to output A(v2,a) or B(p,b)

## Monads origin!
- Monads originally comes from mathematics Category theory. 
- A monad is a triple of adjoint functors that satisfies certain coherence conditions.
- Mathematical origins are beyond the scope of this repo.

## Important
- Typically in a program, we start from a value of type `T` and performing some operation to reach a value of type `U`.
- We might do some checks: pre-operation(like check if not null etc..), we can do some post-operation tasks like logging
- Monad will offer us to perform same operation over the box containing value `T`.
- Thus, monad with wrap a value of type `T` in a box(class or function), and returns new box containing value of type `U`.

## Example
- Lets design a monad which allows us to perform any function over a value which is either of type `T` or `null`
```ts
class Maybe<T> {
	#value: T | null;
	constructor(value: T | null) {
		this.#value = value;
	}

	performTask<U>(func: (value: T) => U) {
		if (this.#value === null) return new Maybe<U>(null);
		const newValue = func(this.#value);
		return new Maybe<U>(newValue);
	}

  performTaskNewMonad<U>(func: (value: T) => Maybe<U>): Maybe<U> {
    if (this.#value === null) return new Maybe<U>(null);
    const newMaybe = func(this.#value);
    return newMaybe;
  }
}
```
- In the above example, we create monad using a class
- Class contains value of type `T` or `null`
- Class method `performTask` allows us to run any `func` over `T` which results in `U`, but in a better manner
- Class method `performTaskNewMonad` allows us to run any `func` over `T` which result in Maybe<U> but in a better manner.
- func to performTask returns `U`
- func to performTaskNewMonad returns `Maybe<U>`
- Better Manner: Check for value if it is null, else performs the function
- Important: check for null is core functionality of `Maybe` monad
- `performTask` & `performTaskNewMonad` return `Maybe` monad with different value

## Standard names
- `performTask` is usually called `map` which perform task on value `T` and return Monad<U>
- `performTaskNewMonad` is usually called `flatMap`, which also perform task on value `T` and return Monad<U>


## More examples

### Either
- Our `Maybe` monad checked for value to be null and then performed the operation
- In `Either` monad, we store result or error, usually useful in response type or function return value


```ts
type IsError<T> = { type: 'error'; error: T };
type IsValue<T> = { type: 'value'; value: T };

export class Either<Err, T> {
  private result: IsError<Err> | IsValue<T>;

  private constructor(result: IsError<Err> | IsValue<T>) {
    this.result = result;
  }

  // Apply a transformation function on the value inside the Either
  map<V>(fn: (value: T) => V): Either<Err, V> {
    if (this.result.type === 'error') {
      return new Either<Err, never>({ type: 'error', error: this.result.error });
    }
    const val = fn(this.result.value);
    return new Either<never, V>({ type: 'value', value: val });
  }

  // FlatMap (or chain) function to chain computations together
  flatMap<V>(fn: (value: T) => Either<Err, V>): Either<Err, V> {
    if (this.result.type === 'error') {
      return new Either<Err, never>({ type: 'error', error: this.result.error });
    }
    const newEither = fn(this.result.value);
    return newEither;
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
```

## Important
In every monad, we do following
- map, flatMap, method to get the value
- Create new Monad if a check fails
  - if null: return new monad in Maybe
  - if error: return new monad in Either
So, lets add some static methods, which can be used internally and externally to produce Monad


### Static Methods
- Static methods for maybe - produce Maybe with null or some value
- Nothing static method produces Maybe<K> but value stored inside in `null`
- just static method produces Maybe<K> but value stored inside in `K`
```ts
class Maybe<T> {
	#value: T | null;
	constructor(value: T | null) {
		this.#value = value;
	}

  static nothing<K>(){
    return new Maybe<K>(null)
  }

   static just<K>(value:K){
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
}
```

### Static Methods for Either
- Static methods for either - produce Either with error or some value
- error static method produces Either<K> but value stored inside in is some `error`
- result static method produces Either<K> but value stored inside in is some `value`
```ts
type IsError<T> = { type: 'error'; error: T };
type IsValue<T> = { type: 'value'; value: T };

export class Either<Err, T> {
  private result: IsError<Err> | IsValue<T>;

  private constructor(result: IsError<Err> | IsValue<T>) {
    this.result = result;
  }

  static error<Err>(error:Err){
    return new Either<Err,never>({ type: 'error', error })
  }

  static value<K>(value:K){
    return new Either<never,K>({ type: 'value', value })
  }


  map<V>(fn: (value: T) => V): Either<Err,V> {
    if (this.result.type === 'error') {
      return Either.error<Err>(this.result.error); // can add more context
    }
    return Either.value<V>(fn(this.result.value));
  }

  flatMap<V>(fn: (value: T) => Either<Err, V>): Either<Err, V> {
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
```

## Static method use
- Static method are used internally as shown above and can be used outside as well

```ts
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
```

## Important
- map and flatMap method of monad can be chained, errors will be handled gracefully

- Take the above example, getUser is now using monad, let create similar function `getUserCityDetails`
```ts
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
```

## Not Using monads
```ts
const getUserAndCityDetails = (userId: string) => {
  try {
    const user = dbGetUserCall(userId);
    const cityData = dbGetCityCall(user.city);
    return cityData;
  } catch (error) {
    throw error;
  }
}
```

## Using monads
```ts
const getUserAndCityDetailsMonadic = (userId: string) => {
  const user = getUser(userId);
  // const cityData = user.map(user => getCity(user.city))
  const cityData = user.flatMap(user => getCity(user.city))
  return cityData.getValue();

}
```