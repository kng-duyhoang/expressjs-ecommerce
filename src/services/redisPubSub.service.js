const Redis = require('redis')

class RedisPubSubServices {
  constructor() {
    this.subscriber = Redis.createClient(6379, 6379);
    this.publisher = Redis.createClient(6379, 6379);
  }

  publish( channel, message ) {
    return new Promise((resolve, reject) => {
      this.publisher.publish(channel, message, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  subscribe(channel, callback) {
    this.subscriber.subscribe(channel)
    this.subscriber.on("message", (subscriberChannel, message) => {
      if (channel === subscriberChannel) {
        callback(channel, message)
      }
    })
  }
}

module.exports = new RedisPubSubServices();