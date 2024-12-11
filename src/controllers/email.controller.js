'use strict'

const { Success } = require("../core/success.response")
const templateService = require("../services/template.service")

class EmailController {
    newTemplate = async (req, res, next) => {
        new Success({
            message: 'new Template',
            metadata: await templateService.newTemplate(req.body)
        }).send(res)
    }
}

module.exports = new EmailController();