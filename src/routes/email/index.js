'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const EmailController = require('../../controllers/email.controller')

router.post('/new-template', asyncHandle(EmailController.newTemplate))

module.exports = router