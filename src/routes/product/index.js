'use strict'

const express = require('express')
const router = express.Router()

const productController = require('../../controllers/product.controller')
const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

router.get('/search/:keySearch', asyncHandle(productController.getListProductsByKeyword))
router.get('/get', asyncHandle(productController.findAllProduct))
router.get('/get/:product_id', asyncHandle(productController.findProductByID))

router.use(authentication)
// POST
router.post('/create', asyncHandle(productController.createProduct))
router.post('/publish/:id', asyncHandle(productController.publishProduct))
router.post('/unpublish/:id', asyncHandle(productController.unpublishProduct))
// GET
router.get('/draft/all', asyncHandle(productController.getAllDarftForShop))
router.get('/publish/all', asyncHandle(productController.getAllPublishForShop))


module.exports = router
