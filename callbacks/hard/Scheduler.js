// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

class Scheduler {
  constructor() {
    this.queue = [];
    this.completed = 0;
  }

  schedule(task, priority = 0) {

    let i = 0; 
    while(i < this.queue.length && priority < this.queue[i].priority) {
      i++;
    }

    if(i < this.queue.length) this.queue.splice(i, 0, {task, priority});
    else this.queue.push({task, priority});
  }

  run(onAllFinished) {
    const length = this.queue.length;

    for(let i = 0; i < length; i++) {
      this.queue[i].task((err, result) => {
        this.completed++;
        if(this.completed === length) {
          onAllFinished(err, result);
        }
      });
    }

    this.queue = [];
  }
}

module.exports = Scheduler;
