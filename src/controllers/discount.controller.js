'use strict'

const {Created, Success} = require("../core/success.response")
const DiscountService = require("../services/discount.service")

class DiscountController {
    createDiscountCode = async (req, res, next) => {
        new Created({
            message: 'Created Success',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userID
            })
        }).send(res)
    }

    getAllDiscountCodeByShop = async (req, res, next) => {
        new Success({
            message: 'Get Success',
            metadata: await DiscountService.getAllDiscountCodeByShop({
                ...req.body,
                shopId: req.user.userID
            })
        }).send(res)
    }

    getDiscountAmount = async (req, res, next) => {
        new Success({
            message: 'Get Success',
            metadata: await DiscountService.getDiscountAmount({
                ...req.body,
                shopId: req.user.userID
            })
        }).send(res)
    }

    getAllDiscountAvailableWithProduct = async (req, res, next) => {
        new Success({
            message: 'Get Success',
            metadata: await DiscountService.getAllDiscountAvailableWithProduct({
                ...req.query
            })
        }).send(res)
    }

    deleteDiscount = async (req, res, next) => {
        new Success({
            message: 'Get Success',
            metadata: await DiscountService.deleteDiscount({
                ...req.body,
                shopId: req.user.userID
            })
        }).send(res)
    }

    cancelDiscountCode = async (req, res, next) => {
        new Success({
            message: 'Get Success',
            metadata: await DiscountService.cancelDiscountCode({
                ...req.body,
                shopId: req.user.userID
            })
        }).send(res)
    }

}

module.exports = new DiscountController()
