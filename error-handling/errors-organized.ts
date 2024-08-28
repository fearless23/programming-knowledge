// https://chatgpt.com/share/c3a0da62-8768-484e-aeda-99502f0656d4

// code, group are fixed
// statusCode, message and userMessage can be over-ridden

// We can enhance using better-human-logs type packages

const ERRORS = {
  REDIS_DB_CONNECTION_FAILED: {
    group: "REDIS" as const,
    message: "Cannot connect to Redis DB",
    statusCode: 500,
    expose: false,
    userMessage: "Internal Server Error",
  },
  FILE_NOT_FOUND: {
    group: "S3" as const,
    message: "Cannot find file at given path",
    statusCode: 404,
    expose: false,
    userMessage: "Resource not found",
  },
  USER_DISABLED: {
    group: "SERVICE" as const,
    message: "User is disabled",
    statusCode: 403,
    expose: true
  },
  INVALID_INPUT: {
    group: "VALIDATION" as const,
    message: "Input validation failed",
    statusCode: 400,
    expose: true
  },
  UNAUTHORIZED_ACCESS: {
    group: "AUTH" as const,
    message: "Unauthorized access attempt",
    statusCode: 401,
    expose: true
  }
};

type ErrorCode = keyof typeof ERRORS;
type ErrorData = (typeof ERRORS)[ErrorCode]

const extendError = (errorCode: ErrorCode, overrides: { statusCode?: number, message?: string, userMessage?: string, expose?: boolean } = {}) => {
  const error: ErrorData = ERRORS[errorCode];
  const newErrorData: ErrorData = { ...error, ...overrides }
  return newErrorData
}

// When return error as data >> we can add more information to error like chain[], 
// where we add functionName or lineNumber or we can use some stackTrace library