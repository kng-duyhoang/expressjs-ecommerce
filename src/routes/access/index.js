'use strict'

const express = require('express')
const router = express.Router()

const accessController = require('../../controllers/access.controller')
const {asyncHandle} = require('../../auth/checkAuth')

router.post('/shop/signup', asyncHandle(accessController.signUP))

module.exports = router
