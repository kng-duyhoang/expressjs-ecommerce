'use strict'

const _ = require('lodash')

const getInforData = ({ fields = [], object = {}}) => {
    return _.pick( object, fields)
}

module.exports = {
    getInforData,
    StatusCodes: require('./statusCodes.js'),
    ReasonPhrases: require('./reasonPhrases')
}
