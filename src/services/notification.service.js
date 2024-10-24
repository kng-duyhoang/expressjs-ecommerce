'use strict'

const { notification } = require("../models/notification.model")

const pushNotiToSystem = async ({
    type = 'SHOP-01',
    receiveId = 1,
    senderId = 1,
    options = {}
}) => {
    let noti_content
    if (type === 'SHOP-01') {
        noti_content = `Shop vừa mới thêm sản phẩm vào cửa hàng`
    } else if (type === 'PROMOTION-01'){
        noti_content = `Shop vừa add thêm voucher mới`
    }
    const newNoti = await notification.create({
        noti_type: type,
        noti_content: noti_content,
        noti_senderId: senderId,
        noti_receiveId: receiveId,
        noti_options: options
    })
    return newNoti;
}

const listUserById = async ({
    userId = 1,
    type = 'All',
    isRead = 0
}) => {
    const match = {
        noti_receiveId: userId,
    }
    if (type !== 'All') {
        match['noti_type'] = type   
    }

    return await notification.aggregate([
        {
            $match: match
        },
        {
            $project: {
                noti_type: 1,
                noti_senderId: 1,
                noti_receiveId: 1,
                noti_content: {
                    $concat: [
                        {
                            $substr: ['$noti_options.shop_name', 0 , -1 ]
                        },
                        '$noti_content',
                    ]
                },
                createAt: 1,
                noti_options: 1
            }
        }
    ])
}

module.exports = {
    pushNotiToSystem,
    listUserById
}