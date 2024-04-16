'use strict'

const _ = require('lodash')

const getInforData = ({ fields = [], object = {}}) => {
    return _.pick( object, fields)
}

const selectData = (select = []) => {
    return Object.fromEntries(select.map(el =>  [el, 1]))
}

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el =>  [el, 0]))
}

module.exports = {
    getInforData,
    selectData,
    unGetSelectData,
    StatusCodes: require('./statusCodes.js'),
    ReasonPhrases: require('./reasonPhrases'),
}
