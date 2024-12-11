'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const UserController = require('../../controllers/user.controller')

router.post('/new-user', asyncHandle(UserController.newUser))
router.post('/check-email', asyncHandle(UserController.checkLoginEmailToken))

module.exports = router