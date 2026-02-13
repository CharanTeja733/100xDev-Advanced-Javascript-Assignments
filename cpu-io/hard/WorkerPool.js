// Problem Description – Worker Pool with Backpressure
//
// You are required to implement a WorkerPool that limits concurrent execution
// of async tasks.
//
// The pool should accept tasks via an enqueue() method.
// Only N tasks may run at the same time.
// The internal queue has a maximum capacity.
//
// If enqueue() is called when the queue is full, it must immediately
// return a rejected Promise to signal backpressure.
//
// This pattern is commonly used to prevent overload in high-throughput systems.

class WorkerPool {
  constructor(limit, maxQueue) {
    this.limit = limit;
    this.maxQueue = maxQueue;
    this.queue = [];
    this.running =  0;
  }

  enqueue(task) {
    if(this.queue.length === this.maxQueue) {
      return Promise.reject(new Error());
    }

    return new Promise((resolve, reject) => {
      this.queue.push({task, resolve, reject});
      this.run();
    });
  }

  run() {
    while(this.running < this.limit) {
      this.running++;
      const {task, resolve, reject} = this.queue.shift();

      task()
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        this.running--;
        if(this.queue.length) {
          this.run();
        }
      });
    }
  }
}

  
  module.exports = WorkerPool;