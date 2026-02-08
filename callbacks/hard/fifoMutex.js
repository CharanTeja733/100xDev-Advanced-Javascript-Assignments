// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
class Mutex {
  constructor() {
    this.queue = [];
    this.free = true;
  }

  lock(task, onComplete) {
    const handleRequest = (err, result) => {
      this.free = true;
      onComplete(err, result);
      this._release();
    };

    this.queue.push(() => {task(handleRequest)});
    this._release();
  }

  _release() {
    if(this.free && this.queue.length) {
      this.free = false;
      this.queue.shift()();
    }
  }
}

module.exports = Mutex;
