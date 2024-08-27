const getData1 = (n: number) => {
  switch (n) {
    case 1:
      return { status: "CREATED" as const }
    case 2:
      return { status: "NOT_FOUND" as const }
    case 3:
      return { status: "UNAUTHORIZED" as const }
    case 4:
      return { status: "FORBIDDEN" as const }
    case 5:
      return { status: "INTERNAL_SERVER_ERROR" as const }
    case 6:
      return { status: "BAD_REQUEST" as const }
    case 7:
      return { status: "OK" as const }
    default:
      return { status: "UNKNOWN_STATUS" as const }
  }
  // getData do not decide what is error and what is result
  // it just returned 8 states
  // Check, error2.ts
};

const useGetData1 = (n1: number, n2: number) => {
  const result = getData1(n1);
  if (result.status === "FORBIDDEN" || result.status === "BAD_REQUEST" || result.status === "INTERNAL_SERVER_ERROR"
  ) {
    // these statues are error
    // return same statuses
    return result;
    // then some other who use useGetData1 function will repeat same, it will bloat the codebase
  }
  // else continue
}