'use strict'
const { convertToObjectId } = require('../../utils')

const Comment = require('../models/comment.model')

class CommentService {
    static async createComment({
        productId, userId, content, parentId = null,
    }){
        const comment = new Comment({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_parentId: parentId
        })

        let rightValue
        if (parentId) {

        } else {
            const maxRightValue = await Comment.findOne({
                comment_productId: convertToObjectId(productId)
            }, 'comment_right', {sort: {comment_right: -1}})
            if (maxRightValue) {
                rightValue = maxRightValue + 1
            } else {
                rightValue = 1
            }
        }

        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1

        await comment.save()
        return comment
    }
}

module.exports = CommentService