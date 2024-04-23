'use strict'

const { NotFoundError, BadRequestError } = require("../core/error.response")
const { cart } = require("../models/cart.model")
const { findCartById } = require("../models/repositories/cart.repo")
const { checkProductByServer } = require("../models/repositories/product.repo")
const { getDiscountAmount } = require("./discount.service")

class CheckoutService {
    static async checkoutReview({
        cartId, userId, shop_order_ids
    }) {
        const foundCart = await findCartById(cartId)

        if(!foundCart) throw new NotFoundError('Cart not existed!!!')
        
        const checkoutOrder = {
            totalPrice: 0, // Tong tien hang
            feeShip: 0, // phi van chuyen
            totalDiscount: 0, //Tong giam gia
            totalCheckout: 0 // So tien phai tra
        },
        shopOrderIdsNews = []

        for (i = 0; i <= shopOrderIdsNews.length; i++) {
            const {shopId, shop_discounts = [], item_products = []} = shopOrderIdsNews[i]
            const checkProductServer = await checkProductByServer(item_products)
            if (!checkProductByServer[0]) throw new BadRequestError('order wrong!!!')
            const checkoutPrice = checkProductServer.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)

            checkoutOrder.totalPrice += checkoutPrice

            const itemCheckout =  {
                shopId,
                shop_discounts,
                priceRaw: checkoutPrice, // Tien trc khi giam gia
                priceApplyDiscount: checkoutPrice,
                item_products: checkProductServer
            }

            if(shop_discounts.length > 0) {
                // gia su chi co mot discount
                const {totalPrice, discount} = await getDiscountAmount({
                    codeId: shop_discounts[0].codeId,
                    userId,
                    shopId,
                    products: checkProductServer
                })
            }
        }

    }
}

module.exports = CheckoutService