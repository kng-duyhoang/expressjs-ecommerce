'use strict'

const { Created, Success } = require('../core/success.response')
const { listUserById } = require('../services/notification.service')

class NotificationController {
  getListNotiByUser = async ( req, res, next ) => {
    new Success({
      message: "Get success",
      metadata: await listUserById(req.query)
    }).send(res)
  }
}

module.exports = new NotificationController()