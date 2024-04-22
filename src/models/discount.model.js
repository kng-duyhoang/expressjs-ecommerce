'use strict'

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = 'Discount'
const COLLECTION_NAME = 'Discounts'
const ENUM_DISCOUNT_APPLIES_TO = {
    all: 'all',
    specific: 'specific'
}

const ENUM_DISCOUNT_TYPE = {
    fixed_amount: 'fixed_amount',
    percentage: 'percentage'
}

const discountSchema = new Schema({
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: { type: String, default: 'fixed_amount' },
    discount_value: { type: Number, required: true },
    discount_code: { type: String, required: true },
    discount_start_date: { type: Date, required: true },
    discount_end_date: { type: Date, required: true },
    discount_max_use: { type: Number, required: true }, // Số lượng tối đa đc sử dụng => neu ve 0 la het
    discount_use_count: { type: Number, required: true }, // Số lượng đã sử dụng
    discount_users_used: { type: Array, default: [] }, // Dánh sách user sử dụng
    discount_max_user_per_use: { type: Number, required: true }, // Số lượng tối đa một user được sử dụng
    discount_min_order_value: { type: Number, required: true }, // Giảm tối thiểu bao nhiêu
    discount_shopid: { type: Schema.Types.ObjectId, ref: 'Shop' },
    discount_is_active: {type: Boolean, default: false}, // Discount is available or not
    discount_applies_to: { type: String, required: true, enum: [ENUM_DISCOUNT_APPLIES_TO.all, ENUM_DISCOUNT_APPLIES_TO.specific] },
    discount_product_ids: { type: Array, default: [] }, // List Product use this discount
    /*
        độ mở rộng tùy thuộc vào dự án mà mình gia tăng thêm các field, ví dụ như giới hạn khu vực, các mã có thể lồng ghép nhau hay không ?, ...
    */
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    discount: model(DOCUMENT_NAME, discountSchema),
    ENUM_DISCOUNT_APPLIES_TO,
    ENUM_DISCOUNT_TYPE
}
