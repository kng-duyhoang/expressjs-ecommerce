'use strict'

const { cloudinary } = require("../config/config.cloudinary");

const { S3, PutObjectCommand } = require("../config/s3.aws.config")
const crypto = require('crypto')
// Upload use S3 bucket
const uploadImageFormLocalS3 = async ({file}) => {
    try {
        const randomName = () => crypto.randomBytes(16).toString('hex')
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: randomName(),
            Body: file.buffer,
            ContentType: 'image/jpeg'
        })

        const result = await S3.send( command )
        return result
    } catch (error) {
        console.error(error)
    }
}
// end S3

const uploadImageFormUrl = async () => {
    try {
        const urlImage = 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg';
        const folderName = 'product/test', newFileName = 'test'
        const result = await cloudinary.uploader.upload(urlImage, {
            folder: folderName
        })
        return result;
    } catch (error) {
    }
}

const uploadImageFormLocal = async ({
    path,
    folderName = 'product/888'
}) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            public_id: 'thumb',
            folder: folderName
        })
        return {
            image_url: result.secure_url,
            shop_id: 888,
            thumb_url: await cloudinary.url(result.public_id, {
                height: 100,
                width: 100,
                format: 'jpg'
            })
        };
    } catch (error) {
    }
}

module.exports = {
    uploadImageFormUrl,
    uploadImageFormLocal,
    uploadImageFormLocalS3
}