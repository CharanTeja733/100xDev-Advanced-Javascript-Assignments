// Problem Description – Async Cache with Time-to-Live (TTL)

// You are required to create an asynchronous cache utility that exposes a get(key, fetcher) method. 
// If the requested key already exists in the cache, the cached value should be returned immediately. 
// If the key does not exist, the fetcher function should be executed to retrieve the value, 
// store it in the cache, and automatically remove the entry after a fixed Time-to-Live (TTL) of 5 seconds.
class AsyncCache {
  constructor(ttl = 5000) {
    this.ttl = ttl;
    this.obj = {};
  }

  async get(key, fetcher) {
    if(Object.hasOwn(this.obj, key)) {
      return this.obj[key];
    }
    
    return fetcher()
          .then(value => {
            this.obj[key] = value; 
            setTimeout(() => {delete this.obj[key]}, this.ttl)
            return value;
          });
  }
}

const obj = {};
Object.d

module.exports = AsyncCache;
