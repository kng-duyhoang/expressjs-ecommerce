'use strict'

const multer = require('multer')

const uploadMemory = multer({
    storage: multer.memoryStorage()
})

const uploadDisk = multer({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/'); // Directory where files will be stored
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
      }
})

module.exports = {
    uploadMemory,
    uploadDisk // recommend
}