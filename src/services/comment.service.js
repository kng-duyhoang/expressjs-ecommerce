'use strict'

const { NotFoundError } = require('../core/error.response')
const {comment} = require('../models/comment.model')
const { convertToObjectId } = require('../utils')

class CommentService {
    static async createComment({
        productId, userId, content, parentId = null,
    }){
        const newComment = new comment({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_parentId: parentId
        })

        let rightValue
        if (parentId) {
            const parentComment = await comment.findById(convertToObjectId(parentId));
            if (!parentComment) {
                throw new NotFoundError('parent comment not found')
            }
            rightValue = parentComment.comment_right
            // Update many
            await comment.updateMany({
                comment_productId: convertToObjectId(productId),
                comment_right: { $gte: rightValue }
            },{
                $inc: { comment_right: 2 }  
            })
            await comment.updateMany({
                comment_productId: convertToObjectId(productId),
                comment_left: { $gte: rightValue }
            },{
                $inc: { comment_left: 2 }  
            })
        } else {
            const maxRightValue = await comment.findOne({
                comment_productId: convertToObjectId(productId)
            }, 'comment_right', {sort: {comment_right: -1}})
            if (maxRightValue) {
                rightValue = maxRightValue.comment_right + 1
            } else {
                rightValue = 1
            }
        }

        newComment.comment_left = rightValue
        newComment.comment_right = rightValue + 1

        await newComment.save()
        return newComment
    }

    static async getCommentByParentId({
        productId,
        parentId = null,
        limit = 50,
        offset = 0
    }){
        if (parentId) {
            const parentFound = await comment.findById(convertToObjectId(parentId));
            if (!parentFound) throw new NotFoundError('Could not found parent!!!')
            const comments = await comment.find({
                comment_productId: convertToObjectId(productId),
                comment_left: { $gt: parentFound.comment_left },
                comment_right: { $lte: parentFound.comment_right },
            }).select({
                comment_left: 1,
                comment_right: 1,
                comment_content: 1,
                comment_parentId: 1
            }).sort({
                comment_left: 1
            })
            return comments
        }

        const comments = await comment.find({
            comment_productId: convertToObjectId(productId),
            comment_parentId: parentId,
        }).select({
            comment_left: 1,
            comment_right: 1,
            comment_content: 1,
            comment_parentId: 1
        }).sort({
            comment_left: 1
        })
        return comments
    }
}

module.exports = CommentService