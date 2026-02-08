// Problem Description – Leaky Bucket Rate Limiter
//
// You are required to implement a RateLimiter based on the Leaky Bucket algorithm.
//
// The rate limiter has a fixed capacity and processes tasks at a constant rate.
// Tasks are executed in the exact order they are received.
//
// Requirements:
// 1. The bucket has a maximum capacity
// 2. Tasks are processed at a fixed interval (leak rate)
// 3. If the bucket is full, new tasks must be rejected immediately
// 4. Fairness must be preserved (FIFO execution)

class LeakyBucket {
  constructor(capacity, leakRateMs) {
    this.capacity = capacity;
    this.leakRateMs = leakRateMs;
    this.bucket = [];
    this.lastRelease = 0;
    this.notStarted = true;
    this.intervalId = 0;
  }

  add(task, onComplete) {
    if(this.bucket.length >= this.capacity) {
      return onComplete(new Error('Rate Limit Exceeded'), null);
    }
    if(this.bucket.length < this.capacity) {

      this.bucket.push(() => {
        task((err, result) => {

          onComplete(err, result);

          if(this.bucket.length === 0 && this.intervalId) {
            this.notStarted = true;
            clearInterval(this.intervalId);
          }
        })
      })
    }  

    this._process();
  }

  _process() {
    //gives error for 3rd test case if i start the process execution immediately
    // if(!this.lastRelease) {
    //   this.lastRelease = Date.now();
    //   this.bucket.shift()();
    // } 

    if(this.notStarted) {
      this.notStarted = false;
      this.intervalId = setInterval(() => {
        if(this.bucket.length === 0) {
          this.notStarted = true;
          clearInterval(this.intervalId);
        }
        if(Date.now() - this.lastRelease > this.leakRateMs) {
            this.lastRelease = Date.now();
            this.bucket.shift()();
        }
      }, this.leakRateMs);
    }
    
  }
}

module.exports = LeakyBucket;
