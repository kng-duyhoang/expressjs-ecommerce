'use strict'

const { NotFoundError } = require('../core/error.response')
const {comment} = require('../models/comment.model')
const { findProduct } = require('../models/repositories/product.repo')
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

    static async deleteComment({ commentId, productId }){
        // check Product esist
        const foundProduct = await findProduct({
            product_id: productId
        })

        if (!foundProduct) throw new NotFoundError('product not found')
        // 1. Xac dinh gia tri left right
        const commentFound = await comment.findById(commentId);
        if (!commentFound) throw new NotFoundError('product not comment')
        const leftValue = commentFound.comment_left;
        const rightValue = commentFound.comment_right;
        // 2. Tinh width
        const width =  rightValue - leftValue + 1
        // 3. Xoa tat ca comment con
        await comment.deleteMany({
            comment_productId: convertToObjectId(productId),
            comment_left: { $gte: leftValue, $lte: rightValue },
        })
        // 4.Cap nhat cac left right cua cac comment con lai
        await comment.updateMany({
            comment_productId: convertToObjectId(productId),
            comment_right: { $gt: rightValue }
        }, {
            $inc: { comment_right: -width }
        })
        await comment.updateMany({
            comment_productId: convertToObjectId(productId),
            comment_left: { $gt: rightValue }
        }, {
            $inc: { comment_left: -width }
        })
    }
}

module.exports = CommentService