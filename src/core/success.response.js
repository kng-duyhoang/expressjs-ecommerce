'use strict'

const { StatusCodes, ReasonPhrases } = require("../utils")


class SuccessStatusResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metadata = {}
    }) {
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode,
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json( this )
    }
}

class Success extends SuccessStatusResponse {
    constructor({message, metadata}) {
        super({message, metadata})
    }
}

class Created extends SuccessStatusResponse {
    constructor({message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata}) {
        super({message, statusCode, reasonStatusCode, metadata})
    }
}

module.exports = {
    Success,
    Created,
}
