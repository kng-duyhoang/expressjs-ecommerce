'use strict'

const express = require('express')
const router = express.Router()

const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const cartController = require('../../controllers/cart.controller')


// Authen
router.post('', asyncHandle(cartController.addToCart))
router.delete('', asyncHandle(cartController.deleteCart))
router.post('/update', asyncHandle(cartController.updateCart))
router.get('/get-list', asyncHandle(cartController.listToCart))

module.exports = router
