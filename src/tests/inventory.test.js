const redisPubSubService = require("../services/redisPubSub.service")

class InventoryServiceTest {
  constructor() {
    redisPubSubService.subscribe('purchase_event', (channel, message) => {
      InventoryServiceTest.updateInventory(message)
    })
  }

  static updateInventory(productId, quantity) {
    console.log(`Updated product ${productId} with ${quantity}`);
  }
}

module.exports = new InventoryServiceTest();