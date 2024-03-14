class ApiError extends Error {
  statusCode: string | number; // Add statusCode property
  isOperational: boolean;
  info: string | null;

  constructor(
    statusCode: string | number, // Update the type of statusCode parameter
    message = '',
    info = null,
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.info = info;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };