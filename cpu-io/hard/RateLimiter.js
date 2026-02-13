// Problem Description – Rate Limiter (Token Bucket / Sliding Window)
//
// You are required to implement a `RateLimiter` class that restricts the
// number of executions of a given task within a specific time window.
//
// The limiter should ensure that no more than `limit` tasks are executed
// in any given `windowMs` period.
//
// Requirements:
// 1. The constructor should accept `limit` (max tasks) and `windowMs` (time window).
// 2. The `throttle(task)` method should return a Promise that resolves when the task
//    can be executed.
// 3. If the limit is reached, subsequent tasks must wait until the window allows
//    another execution.
// 4. Tasks should be executed in the order they were submitted (FIFO).
//
// This is a common pattern for API rate limiting and resource management.

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.queue = [];
    this.count = 0;
    this.flag = true;
  }

  async throttle(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({task, resolve, reject});
      this.process();
    })
  }

  process() {
    if(this.flag && this.queue.length)  { 
          const step = () => {

            this.flag = false;

            setTimeout(() => {
              this.count = 0;
              
              if(this.queue.length) {
                step();
              } else {
                this.flag = true;
              }

            }, this.windowMs);

           this.execute();
          }

        step();
    }

    this.execute();
  }

  execute() {
     while(this.queue.length && this.count < this.limit) {
        this.count++;
        const {task, reject, resolve} = this.queue.shift();

        task()
        .then((result) => resolve(result))
        .catch(err => reject(err));
      }
  }
}

module.exports = RateLimiter;
