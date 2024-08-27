import { MyError } from "./type"

export type OkOutput<Ok> = [null, Ok]
export type ErrOutput<Error extends MyError> = [Error, null]

export type Result<Ok, Error extends MyError> = OkOutput<Ok> | ErrOutput<Error>
export type ResultAsync<Ok, Error extends MyError> = Promise<Result<Ok, Error>>

// helpers
export const ok = <Ok>(data: Ok): OkOutput<Ok> => ([null, data])
export const err = <Error extends MyError>(error: Error): ErrOutput<Error> => ([error, null])
