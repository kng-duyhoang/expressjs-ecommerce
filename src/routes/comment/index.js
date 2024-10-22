'use strict'

const express = require('express')
const router = express.Router()

const CommentController = require('../../controllers/comments.controller')
const asyncHandle = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

router.use(authentication)
router.post('', asyncHandle(CommentController.createComment))
router.get('', asyncHandle(CommentController.getCommentByParentId))
module.exports = router
