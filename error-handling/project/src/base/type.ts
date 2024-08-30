export type AnyJson = Record<string, unknown>

export type MyError = { code: string, message?: string, data?: AnyJson }