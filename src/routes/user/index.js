'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const UserController = require('../../controllers/user.controller')

router.post('/', asyncHandle(UserController.newUser))

module.exports = router