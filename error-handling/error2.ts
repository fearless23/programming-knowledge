const getData2 = (n: number) => {
  switch (n) {
    case 1:
      return { status: "CREATED" as const }
    case 2:
      return { status: "NOT_FOUND" as const, }
    case 3:
      return { status: "UNAUTHORIZED" as const, error: true as const }
    case 4:
      return { status: "FORBIDDEN" as const, error: true as const }
    case 5:
      return { status: "INTERNAL_SERVER_ERROR" as const, error: true as const }
    case 6:
      return { status: "BAD_REQUEST" as const, error: true as const }
    case 7:
      return { status: "OK" as const }
    default:
      return { status: "UNKNOWN_STATUS" as const }
  }
  // getData decide what is error and what is result
  // it just returned 8 states with 4 states marked as error
  // Check, error1.ts
};

const useGetData2 = (n1: number, n2: number) => {
  const result = getData2(n1);
  if (result.error || result.status === "UNKNOWN_STATUS") {
    // all errors from getData2 + additional logic
    return { error: true, status: result.status }
    // this function decided getData2 errors + result.status are errors
    // any function which calls useGetData2 can continue considering these are errors in most cases
  }
  // else continue
}