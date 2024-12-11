'use strict'

const _ = require('lodash')
const {Types} = require('mongoose')

const convertToObjectId = id => new Types.ObjectId(id)

const getInforData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}

const selectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]))
}

const removeUnderfineValueInObject = (obj) => {
    Object.keys(obj).forEach( key => {
        if (!obj[key]) {
            delete obj[key]
        }
    })
    return obj
}

// Xử lý đệ quy cho TH có nhiều object con bên trong object cha

const updateNestedObject = obj => {
    const final = {}
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            const response = updateNestedObject(obj[key])
            Object.keys(response).forEach( a => {
                final[`${key}.${a}`] = response[a]
            })
        } else {
            final[key] = obj[key]
        }
    })

    return final
}

const replacePlaceholder = (template, params) => {
    Object.keys(params).forEach( key => {
        const placeholder = `{{${key}}}`
        template = template.replace( new RegExp(placeholder, 'g'), params[key])
    })
}

module.exports = {
    replacePlaceholder,
    getInforData,
    selectData,
    unGetSelectData,
    removeUnderfineValueInObject,
    updateNestedObject,
    convertToObjectId,
    StatusCodes: require('./statusCodes.js'),
    ReasonPhrases: require('./reasonPhrases'),
}
