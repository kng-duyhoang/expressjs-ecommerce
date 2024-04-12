'use strict'

const {findByID} = require('../services/apiKey.service')

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
        return res.status(403).json({
            message: 'Forbidden Error'
        })
    }
    // check objkey
    const objKey = await findByID(key)
    if (!objKey) {
        return res.status(403).json({
            message: 'Forbidden Error'
        })
    }
    req.objKey = objKey
    return next()
  } catch (error) {

  }
}

const permision = (permision) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "permission not found"
            })
        }
        const validPermission = req.objKey.permissions.includes(permision)
        if(!validPermission) {
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        return next()
    }
}

const asyncHandle = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    apiKey,
    permision,
    asyncHandle
}
