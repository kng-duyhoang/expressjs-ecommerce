'use strict'

const crypto = require('crypto')
const { cloudinary } = require("../config/config.cloudinary")
const { S3, PutObjectCommand, GetObjectCommand } = require("../config/s3.aws.config")
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const cloudFront = process.env.AWS_CLOUD_FRONT

const createName = () => crypto.randomBytes(16).toString('hex')

// Upload use S3 bucket
const uploadImageFormLocalS3 = async ({file}) => {
    try {
        const randomName = createName();
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: randomName,
            Body: file.buffer,
            ContentType: 'image/jpeg'
        })
        const result = await S3.send( command )
        // const signedUrl = new GetObjectCommand({
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Key: randomName
        // })
        // const url = await getSignedUrl(S3, signedUrl, {expiresIn: 3600})
        /* Cloudfront signed */
        const urlSigned = getSignedUrl({
            url: `${cloudFront}/${randomName}`,
            keyPairId: process.env.AWS_CLOUD_FRONT_PUBLIC_KEY,
            dateLessThan: new Date( Date.now() + 1000*60 ), //het han trong 60s
            privateKey: process.env.AWS_BUCKET_PRIVATE_KEY,
          });
        
        return {
            url: urlSigned,
            result
        }
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