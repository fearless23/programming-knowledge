/*
Problem: Given a enum aka list of values, we want only those as part of object keys
and all should be present
*/


/*
Method 1
In above method, we defined myObject with desired keys i.e key1 and key2

However, 
- we can miss key3 or key4 and type Keys is derived from myObject
- the value of key1 and key2
Checkout method2
*/
const _myObject = {
  key1: 'value1',
  key2: 'Value2',
} as const;

type _Keys = keyof typeof _myObject; // key1, key2
type _Values = typeof _myObject[Keys]; 

/*
Method 2

- Step 1: Define the list of key in a type
*/


type Keys = "key1" | "key2";

// Define a type for the object
type MyObject = {	[key in Keys]: key};

// Create the object
const accountStatusMap: MyObject = {
	key1: "key1",
	key2: "key2"
};

const validAccountStatus = new Set(Object.values(accountStatusMap));
