'use strict'

const express = require('express')
const router = express.Router()

const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const discountController = require('../../controllers/discount.controller')

router.post('/amount', asyncHandle(discountController.getDiscountAmount))
router.get('/list-product-code', asyncHandle(discountController.getAllDiscountAvailableWithProduct))
// Authen
router.use(authentication)
router.post('', asyncHandle(discountController.createDiscountCode))
router.get('', asyncHandle(discountController.getAllDiscountAvailableWithProduct))

module.exports = router
