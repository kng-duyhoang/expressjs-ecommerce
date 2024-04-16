'use strict'

const { product,electronic,clothing,furniture } = require('../../models/product.model')
const { selectData, unGetSelectData } = require('../../utils')

const queryProduct = async({query, limit, skip}) => {
    return await product.find(query)
    .sort({updateAt: -1})
    .limit(limit)
    .lean()
    .exec()
}

const searchProductByUser = async ({keySearch}) => {
    const regexSearch = new RegExp(keySearch)
    const results = await product.find({
        isDraft: true,
        $text: {$search: regexSearch},
    }, {score: {$meta: 'textScore'}})
    .sort({score: {$meta: 'textScore'}})
    .lean()

    return results
}

const publishProductByShop = async ({product_shop, product_id}) => {
    const foundShop = await product.findOne({
        product_shop: product_shop,
        _id: product_id
    })

    if (!foundShop) return null
    foundShop.isDraft = false
    foundShop.isPublish = true
    const { modifiedCount } = await foundShop.updateOne(foundShop)

    return modifiedCount
}

const unPublishProductByShop = async ({product_shop, product_id}) => {
    const foundShop = await product.findOne({
        product_shop: product_shop,
        _id: product_id
    })

    if (!foundShop) return null
    foundShop.isDraft = true
    foundShop.isPublish = false
    const { modifiedCount } = await foundShop.updateOne(foundShop)

    return modifiedCount
}

const findAllProduct = async ({limit, sort, page, filter, select}) => {
    const skip = (page - 1) * limit;
    const sortBy = sort == 'ctime' ? {_id: -1} : {_id: 1}
    return await product.find( filter )
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(selectData(select))
    .lean()

}

const findProduct = async ({product_id, unSelect}) => {
    return await product.findById(product_id).select(unGetSelectData(unSelect))
}

module.exports = {
    queryProduct,
    publishProductByShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProduct,
    findProduct
}
