'use strict'

const { Success } = require("../core/success.response")
const CartService = require("../services/cart.service")

class CartController {
    addToCart = async (req, res, next) => {
        new Success({
            message: "Add Success",
            metadata: await CartService.addToCart(req.body)
        }).send(res)
    }

    updateCart = async (req, res, next) => {
        new Success({
            message: "Update Success",
            metadata: await CartService.addToCartV2(req.body)
        }).send(res)
    }

    deleteCart = async (req, res, next) => {
        new Success({
            message: "Delete Success",
            metadata: await CartService.deleteUserCart(req.body)
        }).send(res)
    }

    listToCart = async (req, res, next) => {
        new Success({
            message: "Delete Success",
            metadata: await CartService.getListUserCart(req.query)
        }).send(res)
    } 
}

module.exports = new CartController()