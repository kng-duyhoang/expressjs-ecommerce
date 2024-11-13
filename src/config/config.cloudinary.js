'use strict'

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'goldztest',
    api_key: process.env.DEV_CLOUD_KEY,
    api_secret: process.env.DEV_CLOUD_SECRET
})

module.exports = {
    cloudinary
}