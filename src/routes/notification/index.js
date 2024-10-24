'use strict'

const express = require('express')
const router = express.Router()

const NotificationController = require('../../controllers/notification.controller')
const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

router.use(authentication)
router.get('', asyncHandle(NotificationController.getListNotiByUser))
module.exports = router
