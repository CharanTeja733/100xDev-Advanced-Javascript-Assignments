// Problem Description – Async Semaphore (Concurrency Guard)
//
// You are required to implement an async Semaphore that controls
// access to a limited resource.
//
// The semaphore has a fixed number of permits.
// Tasks must acquire a permit before executing and release it after finishing.
//
// Requirements:
// 1. Only N tasks may run concurrently
// 2. Excess tasks must wait (not reject)
// 3. Permits must be released even if a task throws
// 4. Execution order must be fair (FIFO)
//
// This pattern is widely used in databases, connection pools,
// and file system access control.

class Semaphore {
  constructor(max) {
    this.maxPermit = max;
    this.queue = [];
    this.currPermitCount = 0;
  }

  acquire() {
    if(this.currPermitCount < this.maxPermit) {
      this.currPermitCount++;
    }
  }

  release() {
    this.currPermitCount--;
  }

  async run(task) {
    const step = () => {
      while(this.currPermitCount < this.maxPermit && this.queue.length) {
        this.acquire();
        const {task, resolve, reject} = this.queue.shift();
        task()
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          this.release();
          if(this.queue.length) step();
        })
        ;
      }
    }

    return new Promise((resolve, reject) => {
      this.queue.push({task, resolve, reject});
      step();
    })
      
  }
}

  module.exports = Semaphore;
  