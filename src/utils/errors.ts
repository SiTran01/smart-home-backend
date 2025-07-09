/**
 * Base HttpError class
 */
export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 400 - Bad Request
 * Sử dụng khi input không hợp lệ, thiếu field, hoặc format sai.
 */
export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}

/**
 * 400 - Validation Error
 * Sử dụng khi vi phạm validation rules (ví dụ Joi schema fail).
 */
export class ValidationError extends HttpError {
  constructor(message: string = 'Validation Error') {
    super(message, 400);
  }
}

/**
 * 401 - Unauthorized
 * Sử dụng khi user chưa login hoặc token không hợp lệ.
 */
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * 403 - Forbidden
 * Sử dụng khi user đã login nhưng không đủ quyền.
 */
export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

/**
 * 404 - Not Found
 * Sử dụng khi không tìm thấy resource.
 */
export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}

/**
 * 500 - Internal Server Error
 * Sử dụng khi server gặp lỗi không lường trước.
 */
export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}
