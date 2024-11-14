'use strict'

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const config = {
    region: 'ap-southeast-1',
    credentials:{
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY
    }
}

const S3 = new S3Client(config)
module.exports = {
    S3,
    PutObjectCommand
}