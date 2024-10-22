'use strict'

const { Created } = require('../core/success.response')
const { createComment } = require('../services/comment.service')

class CommentController {
  createComment = async ( req, res, next ) => {
    new Created({
      message: "create comment success",
      metadata: await createComment(req.body)
    }).send(res)
  }
}

module.exports = new CommentController()