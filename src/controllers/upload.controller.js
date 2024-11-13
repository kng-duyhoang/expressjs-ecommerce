'use strict'

const { BadRequestError } = require("../core/error.response")
const { Success } = require("../core/success.response")
const { uploadImageFormUrl, uploadImageFormLocal } = require("../services/upload.service")

class UploadController {
    upload = async (req, res, next) => {
        new Success({
            message: "Upload Success",
            metadata: await uploadImageFormUrl()
        }).send(res)
    }

    uploadThumb = async (req, res, next) => {
        const { file } = req;
        if (!file) {
            throw new BadRequestError('Not Found file')
        }
        console.log(file);
        
        new Success({
            message: "Upload Success",
            metadata: await uploadImageFormLocal({
                path: file.path
            })
        }).send(res)
    }
}

module.exports = new UploadController()