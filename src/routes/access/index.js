'use strict'

const express = require('express')
const router = express.Router()

const accessController = require('../../controllers/access.controller')
const asyncHandle = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')

router.post('/shop/signup', asyncHandle(accessController.signUP))
router.post('/shop/login', asyncHandle(accessController.logIn))

router.use(authenticationV2)
router.post('/shop/logout', asyncHandle(accessController.logOut))
router.post('/shop/handlerefreshtoken', asyncHandle(accessController.handleRefreshToken))


module.exports = router
