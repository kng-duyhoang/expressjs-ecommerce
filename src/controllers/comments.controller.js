'use strict'

const { Created, Success } = require('../core/success.response')
const { createComment, getCommentByParentId, deleteComment } = require('../services/comment.service')

class CommentController {
  createComment = async ( req, res, next ) => {
    new Created({
      message: "create comment success",
      metadata: await createComment(req.body)
    }).send(res)
  }

  getCommentByParentId = async ( req, res, next ) => {
    new Success({
      message: "create comment success",
      metadata: await getCommentByParentId(req.query)
    }).send(res)
  }

  deleteComment = async ( req, res, next ) => {
    new Success({
      message: "delete comment success",
      metadata: await deleteComment(req.body)
    }).send(res)
  }
}

module.exports = new CommentController()