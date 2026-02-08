// Problem Description – Asynchronous Worker Pool

// You are required to create a worker pool that manages the execution of asynchronous tasks. 
// The pool should ensure that no more than N tasks are running concurrently, while any additional tasks are queued. 
// As tasks complete, queued tasks should start automatically.
// Each task must resolve with its own result.

class CallbackPool {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  run(task, onComplete) {
    const handleRequest = (err, result) => {
      this.running--;
      this._next();
      onComplete();
    };

   if(this.running >= this.limit) {
      this.queue.push(() => {
        task(handleRequest)
      });
      return;
   }
    
    while (this.running < this.limit) {
        task(handleRequest);
        this.running++;
    } 

  }

  _next() {
    while(this.queue.length && this.running < this.limit) {
      this.running++;
      this.queue.shift()();
    }
  }
}

module.exports = CallbackPool;
