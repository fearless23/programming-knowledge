import { MyError } from "./type"

export type OkOutput<Ok> = { error: false, data: Ok }
export type ErrOutput<Error extends MyError> = { error: true, data: Error }

export type Result<Ok, Error extends MyError> = OkOutput<Ok> | ErrOutput<Error>
export type ResultAsync<Ok, Error extends MyError> = Promise<Result<Ok, Error>>


// helpers
export const ok = <Ok>(data: Ok): OkOutput<Ok> => ({ error: false as const, data })
export const err = <Error extends MyError>(error: Error): ErrOutput<Error> => ({ error: true as const, data: error })
