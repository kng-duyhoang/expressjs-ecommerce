'use strict'

const { unGetSelectData, selectData } = require("../../utils");

const getAllDiscountUnSelectCodeByShop = async ({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter,
    unSelect,
    model
}) => {
    const skip = (page - 1) * limit;
    const sortBy = sort == 'ctime' ? {_id: -1} : {_id: 1}
    return await model.find( filter )
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(unGetSelectData(unSelect))
    .lean()
}

const getAllDiscountSelectCodeByShop = async ({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter,
    unSelect,
    model
}) => {
    const skip = (page - 1) * limit;
    const sortBy = sort == 'ctime' ? {_id: -1} : {_id: 1}
    return await model.find( filter )
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(selectData(unSelect))
    .lean()
}

const checkDiscountExist = async (model, filter) => {
    console.log(filter);
    return await model.findOne(filter).lean()
}

module.exports = {
    getAllDiscountUnSelectCodeByShop,
    getAllDiscountSelectCodeByShop,
    checkDiscountExist
}
