'use strict'
'use strict'

const {model, Schema} = require("mongoose");

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME= 'Products'

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_thumb: {
        type: String,
        required: true
    },
    product_description: String,
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: Number,
        required: true,
        enum: ['Electironics', 'Clothing', 'Furniture']
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

const clothingSchema = new Schema({
    brand: {type: String, require: true},
    size: String,
    meterial: String
}, {
    collection: "clothes",
    timestamps: true
})

const electronicSchema = new Schema({
    manufacturer: {type: String, require: true},
    model: String,
    color: String
}, {
    collection: "electronic",
    timestamps: true
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Electronic', electronicSchema),
    clothing: model('Clothing', clothingSchema)
}