/**
 * Caching interface for Hapi
 */
const client = require('redis');

class Cache {

  /**
   * Set up general cache
   * @return {void}
   */
  constructor (config) {
    this.config = config;
    this.cacheClient = client.createClient(config.redisUrl);
  }

  /**
   * Set a value to cache
   * @param  {String}   key       Key to store value to
   * @param  {String}   value     Value to store
   * @param  {Number}   expiresIn Milliseconds after which the cached value gets deleted
   * @param  {Function} callback  Callback
   * @return {void}
   */
  set (key, value, expiresIn = this.config.expiresIn, callback = () => {}) {
    value = JSON.stringify(value);

    cacheClient.set(key, value, 'PX', expiresIn, (error) => {
      if (error) {
        throw error;
      }

      callback && callback();
    });
  }

  /**
   * Get a specific value from the store
   * @param  {String}   key      Key to get
   * @param  {Function} callback Function to fire after cached value was retrieved
   * @return {void}
   */
  get (key, callback) {

    cacheClient.get(key, (error, value) => {
      try {
        value = JSON.parse(value);
      } catch (error) {}

      callback && callback(error, value);
    });
  }
}

module.exports = Cache;
