'use strict'
const { Success } = require("../core/success.response");
const { createRole, createResource, resourceList, roleList } = require("../services/rbac.service");

class RbacController {
    newRole = async (req, res, next) => {
        new Success({
            message: 'create success role',
            metadata: await createRole( req.body )
        }).send(res)
    }

    newResouce = async (req, res, next) => {
        new Success({
            message: 'create success resource',
            metadata: await createResource( req.body )
        }).send(res)
    }

    listRole = async (req, res, next) => {
        new Success({
            message: 'get success role list',
            metadata: await roleList( req.query )
        }).send(res)
    }

    listResource = async (req, res, next) => {
        new Success({
            message: 'create success resource list',
            metadata: await resourceList( req.query )
        }).send(res)
    }
}
module.exports = new RbacController()