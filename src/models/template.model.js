'use strict'

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = 'template'
const COLLECTION_NAME = 'templates'

const templateSchema = new Schema({
    template_id: { type: Number, required: true },
    template_name: { type: String, required: true },
    template_status: { type: String, default: 'active', enum: ['active', 'block'] },
    template_html: { type: String, required: true }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, templateSchema)