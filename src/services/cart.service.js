'use strict'

const { NotFoundError } = require("../core/error.response")
const {cart} = require("../models/cart.model")
const { getProductById } = require("../models/repositories/product.repo")

class CartService {
    static async createUserCart({ userId, product}) {
        const 
            query = {cart_userID: userId, cart_state: 'active'},
            updateOrInsert = {
                $addToSet: {
                    cart_products: product
                }
            }, 
            options = { upsert: true, new: true}

        return cart.findOneAndUpdate(query, updateOrInsert, options)
    }

    static async updateUserCartQuantity({ userId, product}) {
        const {productId, quantity} = product
        const 
            query = {
                cart_userID: userId,
                'cart_product.productId': productId,
                cart_state: 'active'
            },
            updateSet = {
                $inc: {
                    'cart_product.$.quantity': quantity
                }
            }, 
            options = { upsert: true, new: true}

        return cart.findOneAndUpdate(query, updateSet, options)
    }

    static async addToCart({ userId, product = {}}) {
        // check cart co ton tai hay ko
        const userCart = await cart.findOne({ cart_userID: userId})
        if (!userCart) {
            return await CartService.createUserCart({userId, product})
        }
        // Neu co gio hang roi nhung chua co san pham
        if (!userCart.cart_count_product.length) {
            userCart.cart_count_product = [product]
            return await userCart.save()
        }
        // Neu gio hang ton tai, co san pham nay roi thi update quantity
        return await CartService.updateUserCartQuantity({userId, product})
        // Update Cart
    }   

    static async addToCartV2({userId, shop_order_ids}) {
        const {productId, quantity, old_quantity} = shop_order_ids[0]?.item_products[0]
        // check product
        const foundProduct = await getProductById(productId)
        if (!foundProduct) throw new NotFoundError('Product not existed!!')
        if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopID) {
            throw new NotFoundError('Product not belong to shop')
        }
        if (quantity === 0) {
            // deleted
        }

        return await CartService.updateUserCartQuantity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity
            }
        })
    }

    static async deleteUserCart({userId, productId}) {
        const query = { cart_userID: userId, cart_state: 'active'},
        updateSet = {
            $pull: {
                cart_products: {
                    productId
                }
            }
        }

        return await cart.updateOne(query, updateSet)

    }

    static async getListUserCart({userId}) {
        return await cart.findOne({
            cart_userID: +userId
        }).lean()
    }
}

module.exports = CartService