/**
 * @description 连接redis的方法 get set
 * @author wangheng
 */
const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

const redisClient = res.createClient(REDIS_CONF.port, REDIS_CONF.port)
redisClient.on('error', (err) => {
  console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key  key
 * @param {string} val value
 * @param {number} timeout 超时时间
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    value = JSON.stringify(val)
  }
  redisClient.set(key, value)
  redisClient.expire(timeout)
}

/**
 * redis get
 * @param {string} key 
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (err, val) {
      if (err) {
        reject(err)
        return
      }
      if (value === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports= {
    get,
    set
}