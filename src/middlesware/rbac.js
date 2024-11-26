'use strict'

const { NotFoundError } = require('../core/error.response');
const rbac = require('./role.middleware');

const granAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            const role_name = req.query.role;
            const permission = rbac.can(role_name)[action](resource);
            if (!permission.granted){
                throw new NotFoundError('permission dinied')
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    granAccess
}