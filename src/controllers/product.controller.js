'use strict'

const ProductFactory = require("../services/product.service.xxx");

const {Created, Success} = require("../core/success.response")

class ProductController {
    createProduct = async (req, res, next) => {
        new Created({
            message: 'create Product Success',
            metadata: await productFactory.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userID
            })
        }).send(res)
    }
}

module.exports = new ProductController()
