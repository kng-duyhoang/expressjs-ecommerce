'use strict'

const express = require('express')
const { apiKey, permision } = require('../auth/checkAuth')
const router = express.Router()

// check Api Key
router.use(apiKey)
router.use(permision('0000'))
// check permision

router.use('/v1/api/product', require('./product'))
router.use('/v1/api/discount', require('./discount'))
router.use('/v1/api/cart', require('./cart'))
router.use('/v1/api/comment', require('./comment'))
router.use('/v1/api', require('./access'))

module.exports = router
