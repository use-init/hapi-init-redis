# HAPI INIT - Redis Cache plugin

This plugin makes it easy to Cache any sort of data in Redis.

## Usage

Install via npm:

    $ npm install --save hapi-init-redis

### How to use

    const Cache = require('hapi-init-redis');
    const cache = new Cache({
      redisUrl: 'redis://127.0.0.1:6379',
      expiresIn: 1000 * 60 * 60
    });

    // Setting an object in cache
    cache.set('foo', 'bar', 1000 * 60 * 60, () => {
      console.log('Data set in Cache');
    });

    // Getting the object from Cache
    cache.get('foo', (error, data) => {
      console.log('Data found:', data);
    });
