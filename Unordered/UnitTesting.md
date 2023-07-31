# Unit Testing

> Note: Fake the inputs, mock the dependencies

1. With Dependency injection, you convert a dependency into an input to a function.
2. Unit testing involves testing a logical unit and faking/mocking dependencies.

```ts
// file.ts
import db from '@mypackage/db';
import localDependency from '../local';

const getUserData = async (userId:string) => {
  const user = await db.findUserByPk(userId);
  const city = localDependency(user);
  if(!city) throw new Error("dfdfd");
  const data = await db.findCityData(city);
  return { user, data };
}

// file.test.ts
import getUserData from "./file.ts";
import testFramework from '@testFramework';
testFramework.mock("@mypackage/db");
testFramework.mock("../local");


const { user, data } = await getUserData(userId:string);
user.expect("something")
```
In example above:  
- `userId` is faked to be some random id
- `db` & `localDependency` are mocked using testFramework mock function

```ts
// file.ts
import localDependency from '../local';

const getUserData = async (db: DB, userId:string) => {
  const user = await db.findUserByPk(userId);
  const city = localDependency(user);
  if(!city) throw new Error("dfdfd");
  const data = await db.findCityData(city);
  return { user, data };
}

// file.test.ts
import getUserData from "./file.ts";
import testFramework from '@testFramework';
testFramework.mock("../local");

const db = makeSomeFakeDatabase()

const { user, data } = await getUserData(userId:string);
user.expect("something")

```
In example above:  
- `userId` is faked to be some random id
- `db` is also faked by developer directly
- `localDependency` is mocked using testFramework mock function


## Important points to note
- Faking and mocking term can be used inter-changeably, so add more context when using them.
- Faking is simply mocking directly by user which can be used directly for tests.
- Mocking is done using testing framework (some underlying magic), which additionally offers other features like spying, mocking multiple scenarios etc.  

Thus, for testing one can use any strategy, using dependency injection is optional and it is perfectly fine to not use dependency injection at all and use mocking for testing. One should not use DI so that testing can be easier, it is ok to have messier code in testing rather than in actual project.

## Points to keep in mind
Keep in mind following points, so that you can organize your code better and test is better
- Re-usable code
- Extreme1: Don`t put everything inside your function which is to be tested
- Extreme2: Don`t go for extreme clean code, such that it takes 5 functions to complete a simple operation.


## How to decide the unit for testing and steps ahead !
Let`s start with any unit to test, 
1. If you see yourself you have nothing much to test, do not test the unit
2. If you see yourself too much abstraction in unit, add more concrete values, such that you have less than 5 mocks (usually even lesser) per unit.
3. If you see yourself to mock 10`s of dependencies, your testable unit is too big, refactor to divide it.
4. If you see yourself writing 50 cases covering all cases for a test, your unit is probably doing too much work,
refactor and divide it. However, exception could be regex test or some library function etc.