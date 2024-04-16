'use strict'

const productFactory = require("../services/product.service.xxx");

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

    publishProduct = async (req, res, next) => {
        new Success({
            message: 'publish Success',
            metadata: await productFactory.publishProductByShop({
                product_shop: req.user.userID,
                product_id: req.params.id
            })
        }).send(res)
    }

    unpublishProduct = async (req, res, next) => {
        new Success({
            message: 'Unpublish Success',
            metadata: await productFactory.unPublishProductByShop({
                product_shop: req.user.userID,
                product_id: req.params.id
            })
        }).send(res)
    }

    getAllDarftForShop = async (req, res, next) => {
        new Success({
            message: 'get Success',
            metadata: await productFactory.findAllDraftForShop({
                product_shop: req.user.userID
            })
        }).send(res)
    }

    getAllPublishForShop = async (req, res, next) => {
        new Success({
            message: 'get Success',
            metadata: await productFactory.findAllPublishForShop({
                product_shop: req.user.userID
            })
        }).send(res)
    }

    getListProductsByKeyword = async (req, res, next) => {
        new Success({
            message: 'get Success',
            metadata: await productFactory.searchProductsByKeyword(req.params)
        }).send(res)
    }

    findAllProduct = async (req, res, next) => {
        new Success({
            message: 'get Success',
            metadata: await productFactory.findAllProduct(req.params)
        }).send(res)
    }

    findProductByID = async (req, res, next) => {
        new Success({
            message: 'get Product',
            metadata: await productFactory.findProduct({
                product_id: req.params.product_id
            })
        }).send(res)
    }
}

module.exports = new ProductController()
