## Context free naming

Naming should be context free when designing data strcutures, only context is the object itself, once the consumer who uses it can rename or provide additional context.

##
```js
const user = { foo: 123, age: 23, firstName: "jaspreet" }; // context is user itself
// vs
const user2 = { userFoo: 123, userAge: 23, userFirstName: "jaspreet" }
```

##
```js
const car = { foo: 123, model: "CIVIC", make: "Honda" };
// vs
const car2 = { carFoo: 123, carModel: "CIVIC", carMake: "Honda" }
```

In examples abouve car is better than car2 and user is better than user2.
When adding car or user in front of fields we provide un-neccessary context which serves no purpose.

```js
// using car and user
const { foo: carFoo } = car;
const { foo: userFoo } = user;
// which id is which
// using car2 and user2
const { carFoo } = car2;
const { userFoo } = user2;
// no need to rename
```

In above code, car2 or user2 seems a better choice, but it is only for a specific case.
Consider following
```js
const { carFoo: carFoo1 } = car2;
const { carFoo: cardFoo2 } = another_car2;
```
We still have to rename carId, if we use 2 of car2 type data. So, by adding car or user in front of fields we cannot support every use-case, thus its better to be context-free.

## Exceptions
Fields which are reserved as name, should not be used as field names like id,  delete, etc...
```js
const car = { id:"reservedField", carId: "" }
// here, we choose carId, for differentiating it from id only, not for adding context
const user = { userId:"id of user", childId: "" }
// similarly, childId do not add context, it diffrentiates it from id or userId, context is still user.
```

This way having simpler fields names, will keep it read-able, maintainable and any new context can be added without affecting the existing.

## Sub-contexts
We can prefix car in front of every field, but it should be done to not support use-cases, but to create
sub-context within object
```js
const car = {
  carBrand: "Honda",
  seatBrand: "DFG",
  lightsBrand: "RTU",
  seatMakerYear: 2021,
  carMakerYear: 2022,
} // better
// vs
const car2 = {
  brand: "Honda",
  seatBrand: "DFG",
  lightsBrand: "RTU",
  seatMakerYear: 2021,
  makerYear: 2022,
}
// Our object contains multiple context, car itself, seat and lights, so adding car in front of fields
// make more sense, but this is only for sub-context, not to support use-cases for consumer.


// Also, consider, the sub-context do not interfere
const car = {
  brand: "Honda",
  makerYear: 2022,
  lights: {
    brand: "RTU",
  },
  seat: {
    brand: "DFG",
    makerYear: 2021,
  }
} // better
// vs
const car2 = {
  carBrand: "Honda",
  carMakerYear: 2022,
  lights: {
    lightsBrand: "RTU",
  },
  seat: {
    seatBrand: "DFG",
    seatMakerYear: 2021,
  }
}
```
Sub-context complicates the naming, because the object can change over-time. If we add more fields, contexts, or methods to a class.

## So, how to start ?
- I would prefer to still start with simpler version of not adding any context.
- However, if in starting you see using multiple contexts, add the prefix.


## Other use cases
In all of following example, the knowledge gained from above applies


## Function
The context of input to function is automatically function itself. So, extra context needed unless need to
differentiate inputs
```js
const getUser = ({ id }) => {};
// vs
const getUser = ({ userId }) => {};
const getUser = ({ id, childId }) => {}; // id means in context of getUser, childId have child-prefix to diffrentiate from id, see example below
const getChild = ({ id, parentId }) => {} // id means in context of getChild
```

## Class Methods
The name of class methods should be context free and only context is the class name itself.
```js
class S3 {
  // original class1
  save(file){}
  delete(file){}
}; // better
// vs
class S3 {
  // original class2
  saveFile(file){}
  deleteFile(file){}
};

// if multiple sub-contexts
class S3 {
  // original class2
  saveFile(file){} 
  // we might need to change save to saveFile, when moving above example to this
  // NOTE: like brand always points to car object, whereas seatBrand point to other sub-context
  // similarly, save method points to s3 class, whereas saveJSON points to sub-context in S3
  // So, having both save or saveFile in this example is ok
  // If we started with save and delete, then keep it.
  // If we started with all sub-contexts, then use saveFile
  deleteFile(file){}

  saveJSON(){}
  deleteJSON(){}
  getJSON(){}
}; // better
// vs
class S3 {
  // original class1
  save(file){}
  delete(file){}

  saveJSON(){}
  deleteJSON(){}
  getJSON(){}
};
```

```js
class User {
  fetch() {}
  create() {}
  update() {}
} // better
// vs
class User {
  fetchUser() {}
  createUser() {}
  updateUser() {}
}

// with multiple-contexts
class User {
  // implicitly defined methods for user
  fetch() {}
  create() {}
  update() {}
  // explicitly defined methods for user.child context
  fetchChild(){}
  createChild(){}
  updateChild(){}
}
// vs
class User {
  // explicitly defined methods for user
  fetchUser() {}
  createUser() {}
  updateUser() {}
  // explicitly defined methods for user.child
  fetchChild(){}
  createChild(){}
  updateChild(){}
}

// vs - 
// Here, sub-contexts do not interfere
class Child {
  fetch(){}
  create(){}
  update(){}
}

class User {
  child: Child
  fetch() {}
  create() {}
  update() {}
  
}

// when using
const user = new User();
user.save()
user.child.update()
```