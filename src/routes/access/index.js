'use strict'

const express = require('express')
const router = express.Router()

const accessController = require('../../controllers/access.controller')
const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

router.post('/shop/signup', asyncHandle(accessController.signUP))
router.post('/shop/login', asyncHandle(accessController.logIn))

router.use(authentication)
router.post('/shop/logout', asyncHandle(accessController.logOut))

module.exports = router
