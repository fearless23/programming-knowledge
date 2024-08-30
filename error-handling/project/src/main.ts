import { getData, GetDataError, getUser, GetUserError } from "./funcs";

/*
// use this when funcs use base/base1
const main1 = async (userId: string) => {
  const int = Math.floor(Math.random() * 10);

  const res = getData(int);
  if (res.error) {
    console.log("ERROR-getData", res.data.code)
    return;
  }
  const userRes = await getUser(userId)
  if (userRes.error) {
    console.log("ERROR-getUser", userRes.data)
    return;
  }
  console.log("RESULT", { user: userRes.data, data: res.data })
}
main1("1").then()
*/

/*
// use this when funcs use base/base2
const main2 = async (userId: string) => {
  const int = Math.floor(Math.random() * 10);

  // this is better due to better naming
  const [error1, data] = getData(int);
  if (error1) {
    if (error1.code !== "BAD_REQUEST") {
      console.log("ERROR-getData", error1)
      return;
    }
    // do not consider error;; if bad-BAD_REQUEST
  }
  if (error1?.code === "BAD_REQUEST") console.log("is--bad--request")
  const modifiedData = data ?? { status: error1.code }
  const [error2, user] = await getUser(userId)
  if (error2) {
    console.log("ERROR-getUser", error2)
    return;
  }
  console.log("RESULT", { user, modifiedData })
}
main2("1").then()
*/

// /*
const mainAdvance = async (userId: string) => {
  const int = Math.floor(Math.random() * 10);

  // this is better due to better naming
  const res = getData(int);
  // const ee = res.unwrap() // throws if error  --> can be replaced-with extendError
  // const ee = res.expect("") // throws if error and extend error  --> can be replaced-with extendError
  // const ee = res.orElse(() => 1); // GetUserResult or 1 --> can be replace with simple javascript
  if (res.isErr()) {
    const isBadRequest = res.matchCode("BAD_REQUEST");
    if (!isBadRequest) {
      // do not consider error;; if bad-BAD_REQUEST
      console.log("ERROR-getData", res.error)
      return;
    }
  }
  const modifiedData = res.value ?? { status: res.error.code }


  const res2 = await getUser(userId)
  if (res2.isErr()) {
    const error2 = res2.error;
    console.log("ERROR-getUser", error2)
    return;
  }
  
  const res3 = res2.map<"Hello">(i=> ("Hello" as const)).value
  
  const user = res2.value;
  console.log("RESULT", { user, data: modifiedData })
}
mainAdvance("1").then()
// */