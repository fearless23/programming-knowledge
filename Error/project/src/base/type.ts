export type AnyJson = Record<string, string | number>

export type MyError = { code: string, message?: string } & AnyJson