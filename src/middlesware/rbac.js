'use strict'

const { NotFoundError } = require('../core/error.response');
const { roleList } = require('../services/rbac.service');
const rbac = require('./role.middleware');

const granAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            rbac.setGrants( await roleList({
                userId: 999
            }));
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