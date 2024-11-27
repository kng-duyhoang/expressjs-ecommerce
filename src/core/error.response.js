'use strict'

const { StatusCodes, ReasonPhrases } = require("../utils")
const myLogger = require('../logger/mylog')
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
        // myLogger.error(this.message, {
        //     context: '/path',
        //     requestId: '1111',
        //     message: this.message,
        //     metadata: {},
        // })
        myLogger.error(this.message, ['v1/api', 'v1123', {error: 'wrong'}])
        myLogger.log(this.message, ['v1/api', 'v1123', {error: 'wrong'}])
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

class AuthNotFound extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message, statusCode)
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    AuthNotFound,
    ForbiddenError,
    NotFoundError
}
