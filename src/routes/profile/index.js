'use strict'

const express = require('express')
const router = express.Router()
const { profile, profiles } = require('../../controllers/profile.controller')
const { granAccess } = require('../../middlesware/rbac')

// admin

router.get('/viewAny', granAccess('readAny', 'profile'), profiles)
router.get('/viewOwn', granAccess('readOwn', 'profile'), profile)

module.exports = router