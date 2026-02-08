// Problem Description – Priority Task Queue with Dynamic Concurrency

// You are required to implement a task queue that executes asynchronous tasks based on priority. 
// Higher-priority tasks should be executed before lower-priority ones. 
// The queue must enforce a concurrency limit, ensuring only a fixed number of tasks run at the same time, and allow this limit to be updated dynamically while the system is running.
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.limit = concurrency;
    this.queue = [];
    this.running = 0;
  }

  setLimit(newLimit) {
    this.limit = newLimit;
  }

  add(task, priority, onComplete) {
    const QueuedTask =  () => {  task((err, result) => {
      this.running--;
      this.runNext();
      onComplete(err, result);
    })}

    let i = 0;
    while(i < this.queue.length && priority > this.queue[i]) {
      i++;
    }

    if(i < this.queue.length) 
      this.queue.splice(i, 0, QueuedTask);
    else {
      this.queue.push(QueuedTask);
    }

    this.runNext();
  }

  runNext() {
    while(this.queue.length && this.running < this.limit) {
      this.running++;
      this.queue.shift()();
    }
  }
}

module.exports = DynamicPriorityQueue;
