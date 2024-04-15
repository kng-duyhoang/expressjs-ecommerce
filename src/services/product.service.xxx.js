'use strict'

const { BadRequestError } = require('../core/error.response')
const { product, clothing, electronic, furniture } = require('../models/product.model')
const { queryProduct, publishProductByShop, unPublishProductByShop, searchProductByUser } = require('../models/repositories/product.repo')

// define Factory
class ProductFactory {
    /* 
        type: Clothing, Electronic,
        payload
    */
    static productRegistry = {} // Key & class
    static registerProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef
    }
    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)
        return new productClass(payload).createProduct()
    }

    // PUT //
    static async publishProductByShop({ product_shop, product_id }) {
        return await publishProductByShop({ product_shop, product_id })
    }
    static async unPublishProductByShop({ product_shop, product_id }) {
        return await unPublishProductByShop({ product_shop, product_id })
    }
    // END PUT //

    // Query 
    static async findAllDraftForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await queryProduct({ query, limit, skip })
    }

    static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublish: true }
        return await queryProduct({ query, limit, skip })
    }

    static async searchProductsByKeyword({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }
}

class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes,
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_name = product_name
        this.product_attributes = product_attributes
    }

    async createProduct(product_id) {
        return await product.create({ ...this, _id: product_id })
    }
}

class Clothing extends Product {

    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes)
        if (!newClothing) throw new BadRequestError('Create new clothing error!!')

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('Create new product error!!')

        return newProduct
    }
}

class Electronic extends Product {

    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newElectronic) throw new BadRequestError('Create new electronic error!!')

        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('Create new product error!!')

        return newProduct
    }
}

class Furniture extends Product {

    async createProduct() {
        const newfurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newfurniture) throw new BadRequestError('Create new furniture error!!')

        const newProduct = await super.createProduct(newfurniture._id)
        if (!newProduct) throw new BadRequestError('Create new product error!!')

        return newProduct
    }
}

// regis product types
ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Furniture', Furniture)
module.exports = ProductFactory