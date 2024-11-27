'use strict'

const express = require('express')
const router = express.Router()
const asyncHandle = require('../../helpers/asyncHandler')
const RbacController = require('../../controllers/rbac.controller')

router.post('/role', asyncHandle(RbacController.newRole))
router.get('/roles', asyncHandle(RbacController.listRole))
router.post('/resource', asyncHandle(RbacController.newResouce))
router.get('/resources', asyncHandle(RbacController.listResource))

module.exports = router
