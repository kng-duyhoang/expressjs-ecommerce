'use strict'

const express = require('express')
const { apiKey, permision } = require('../auth/checkAuth')
const router = express.Router()

// check Api Key
router.use(apiKey)
router.use(permision('0000'))
// check permision

router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))

module.exports = router
