'use strict'

const { cloudinary } = require("../config/config.cloudinary");

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
    console.log(path);
    
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
    uploadImageFormLocal
}