'use strict'
'use strict'

const productFactory = require("../services/product.service");

const {Created, Success} = require("../core/success.response")

class ProductController {
    createProduct = async (req, res, next) => {
        // new Created({
        //     message: 'create Product Success',
        //     metadata: await productFactory.createProduct(req.body.product.type, req.body)
        // })
    }
}

module.exports = new ProductController()
