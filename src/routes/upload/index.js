'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const UploadController = require('../../controllers/upload.controller')
const { uploadDisk } = require('../../config/multer.config')

router.post('', asyncHandle(UploadController.upload))

router.post('/thumb', uploadDisk.single('file'), asyncHandle(UploadController.uploadThumb))

module.exports = router
