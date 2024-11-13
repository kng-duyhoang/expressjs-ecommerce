'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const UploadController = require('../../controllers/upload.controller')
const { uploadDisk } = require('../../config/multer.config')

router.post('', asyncHandle(UploadController.upload))

// router.post('/thumb', uploadDisk.single('file'), asyncHandle(UploadController.uploadThumb))
router.post('/thumb', uploadDisk.single('file'), (req, res) => {
    console.log(req.file); // Should display file details including `path`
    if (req.file && req.file.path) {
        res.send(`File uploaded successfully! Path: ${req.file.path}`);
      } else {
        res.status(400).send('File upload failed or path not available');
      }
  });

module.exports = router
