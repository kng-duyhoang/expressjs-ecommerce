'use strict'

const { model } = require("mongoose")
const { BadRequestError, NotFoundError } = require("../core/error.response")
const { discount, ENUM_DISCOUNT_APPLIES_TO, ENUM_DISCOUNT_TYPE } = require("../models/discount.model")
const { getAllDiscountUnSelectCodeByShop, checkDiscountExist } = require("../models/repositories/discount.repo")
const { findAllProduct } = require("../models/repositories/product.repo")
const { convertToObjectId } = require("../utils")

/*
    Discount services
    1- Generate Discount Code
    2- Get Discount Amount
    3- Get All Discount Code
    4- Verify discount code
    5- Delete discount code
    6- Cancel discount code
*/

class DiscountService {
    // Create
    static async createDiscountCode(payload) {
        const {
            name,
            description,
            type,
            code,
            value,
            startDate,
            endDate,
            maxUse,
            useCount,
            users_used = [],
            maxUserPerUse,
            minOrderValue,
            shopId,
            isActive,
            productIds = [],
            applieTo,
        } = payload

        // if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
        //     throw new BadRequestError('Invalid time discount')
        // }

        if (new Date(startDate) >= new Date(endDate)) {
            throw new BadRequestError('Start date must be before End date')
        }
        // Create index for discount code
        const foundDiscount = await checkDiscountExist(discount, {
            discount_code: code,
            discount_shopId: convertToObjectId(shopId)
        })

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError('Discount existed!!')
        }

        return await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_value: value,
            discount_code: code,
            discount_start_date: startDate,
            discount_end_date: endDate,
            discount_max_use: maxUse,
            discount_use_count: useCount,
            discount_users_used: users_used,
            discount_max_user_per_use: maxUserPerUse,
            discount_min_order_value: minOrderValue,
            discount_shopid: shopId,
            discount_is_active: isActive,
            discount_applies_to: applieTo,
            discount_product_ids: productIds,
        })

    }
    // Update
    static async updateDiscount(payload) {

    }
    // Get all discount available with products
    static async getAllDiscountAvailableWithProduct(payload) {
        const {
            code, shopId, userId, limit, page
        } = payload
        const foundDiscount = await checkDiscountExist(discount, {
            discount_code: code,
            discount_shopid: convertToObjectId(shopId)
        })

        if (!foundDiscount || foundDiscount.discount_is_active) {
            throw new NotFoundError('Discount not available!!')
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount
        let products
        if (discount_applies_to == ENUM_DISCOUNT_APPLIES_TO.all) {
            // Get All product
            products = await findAllProduct({
                filter: {
                    product_shop: convertToObjectId(shopId),
                    isPublish: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })

        }

        if (discount_applies_to == ENUM_DISCOUNT_APPLIES_TO.specific) {
            // get product ids
            products = await findAllProduct({
                filter: {
                    _id: {$in: discount_product_ids},
                    isPublish: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }

        return products
    }

    static async getAllDiscountCodeByShop({
        limit,
        page,
        shopId
    }) {
        const discounts = await getAllDiscountUnSelectCodeByShop({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopid: convertToObjectId(shopId),
                discount_is_active: true
            },
            unSelect: ['__v', 'discount_shopid'],
            model: discount
        })

        return discounts
    }

    static async getDiscountAmount({
        codeId,
        userId,
        shopId,
        products
    }) {
        const foundDiscount = await checkDiscountExist({
            model: discount,
            filter: {
                discount_code: codeId,
                discount_shopId: convertToObjectId(shopId)
            }
        })

        if (!foundDiscount) throw new NotFoundError("Discount not esisted!!")

        const {
            discount_is_active,
            discount_max_use,
            discount_start_date,
            discount_end_date,
            discount_min_order_value,
            discount_max_user_per_use,
            discount_users_used,
            discount_type,
            discount_value
        } = foundDiscount

        if (!discount_is_active) throw new NotFoundError("Discount expried!!")
        if (!discount_max_use) throw new NotFoundError("Discount not available!!")

        if(new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) throw new NotFoundError('Discount expried')

        // check xem co set gia tri toi thieu hay khong
        let totalOrder = 0
        if (discount_min_order_value > 0) {
            //  get total
            totalOrder = products.reduce((acc , pro) => {
                return acc + (pro.quantity + product.price)
            }, 0)

            if (totalOrder < discount_min_order_value) throw new NotFoundError(`Discount expried a minimun order value of ${discount_min_order_value}`)
        }

        if (discount_max_user_per_use > 0) {
            const userUseDiscount = discount_users_used.find( user => user.userId == userId )

            if(userUseDiscount) {
                // xu ly
            }
        }

        const amount =  discount_type === ENUM_DISCOUNT_TYPE.fixed_amount ? discount_value : totalOrder * (discount_value / 100)
        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }

    static async deleteDiscount({shopId, codeId}) {
        return await discount.findOneAndDelete({
            discount_code: codeId,
            discount_shopid: shopId
        })
    }

    static async cancelDiscountCode({shopId, codeId, userId}) {
        const foundDiscount = await checkDiscountExist({
            model: discount,
            filter: {
                discount_code: codeId,
                discount_shopId: convertToObjectId(shopId)
            }
        })
        if(!foundDiscount) throw new NotFoundError('discount doesnt esixted!!')

        return await foundDiscount.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userId
            },
            $inc: {
                discount_max_use: 1,
                discount_use_count: -1
            }
        })
    }
}

module.exports = DiscountService
