'use strict'

const express = require('express')
const router = express.Router()

const productController = require('../../controllers/product.controller')
const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')


// router.use(authentication)
router.post('/create', asyncHandle(productController.createProduct()))


module.exports = router
