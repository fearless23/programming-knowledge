import { AnyJson } from "./base/type";

// change this to base1
import { ok, err, type ResultAsync, type Result } from "./base/advance";

export type GetDataResult = { status: "CREATED" | "NOT_FOUND" | "OK" | "UNKNOWN_STATUS" }
// export type GetDataError = { code: "UNAUTHORIZED" | "FORBIDDEN" | "INTERNAL_SERVER_ERROR" | "BAD_REQUEST" }
export type GetDataError = { code: "UNAUTHORIZED", message?: "U" }
  | { code: "FORBIDDEN", message?: "F" }
  | { code: "INTERNAL_SERVER_ERROR", message?: "I" }
  | { code: "BAD_REQUEST", message?: "B", data?: { a: 1 } }

export const getData = (n: number): Result<GetDataResult, GetDataError> => {
  switch (n) {
    case 1:
      return ok({ status: "CREATED" as const })
    case 2:
      return ok({ status: "NOT_FOUND" as const, })
    case 3:
      return err({ code: "UNAUTHORIZED" as const })
    case 4:
      return err({ code: "FORBIDDEN" as const })
    case 5:
      return err({ code: "INTERNAL_SERVER_ERROR" as const })
    case 6:
      return err({ code: "BAD_REQUEST" as const })
    case 7:
      return ok({ status: "OK" as const })
    default:
      return ok({ status: "UNKNOWN_STATUS" as const })
  }
};


type User = { name: string, age: number, email?: string }
export type GetUserResult = User | undefined
export type GetUserError = { code: "DATABASE_ERROR", userId: string } & AnyJson
export const getUser = async (userId: string): ResultAsync<GetUserResult, GetUserError> => {
  const randomError1 = Math.random() > 0.5;
  if (randomError1) {
    const randomError2 = Math.random() > 0.5;
    if (randomError2) return ok(undefined)
    return ok({ name: "", age: 3, })
  }
  return err({ code: "DATABASE_ERROR" as const, userId })
}

// Since, we are using ok and err func, we don`t need to change functions