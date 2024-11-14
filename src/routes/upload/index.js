'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const UploadController = require('../../controllers/upload.controller')
const { uploadDisk, uploadMemory } = require('../../config/multer.config')

router.post('', asyncHandle(UploadController.upload))

router.post('/thumb', uploadDisk.single('file'), asyncHandle(UploadController.uploadThumb))
// upload S3
router.post('/bucket', uploadMemory.single('file'), asyncHandle(UploadController.uploadS3))

module.exports = router
