import { getData, getUser } from "./funcs";

// use this when funcs use base/base1
// const main1 = async (userId: string) => {
//   const int = Math.floor(Math.random() * 10);

//   const res = getData(int);
//   if (res.error) {
//     console.log("ERROR-getData", res.data.code)
//     return;
//   }
//   const userRes = await getUser(userId)
//   if (userRes.error) {
//     console.log("ERROR-getUser", userRes.data)
//     return;
//   }
//   console.log("RESULT", { user: userRes.data, data: res.data })
// }

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

// main1("1").then()
main2("1").then()