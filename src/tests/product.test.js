const redisPubSubService = require('../services/redisPubSub.service')

class ProductService {
  purchaseProduct( productId, quantity) {
    const order = {
      productId,
      quantity
    }
    redisPubSubService.publish('purchase_event', JSON.stringify(order))
  }
}

module.exports = new ProductService();