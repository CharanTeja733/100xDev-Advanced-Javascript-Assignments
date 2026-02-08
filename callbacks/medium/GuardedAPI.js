// Problem Description – Async Initialization Gate

// You are required to design a mechanism for APIs that depend on an asynchronous initialization step. 
// Any calls made before initialization completes should wait and execute only after the initialization finishes. 
// Calls made after initialization should run immediately without waiting.
class GuardedAPI {
  constructor() {
    this.initfinished = false;
    this.queue = [];
  }

  init(initTask) {
     initTask(() => {
        this.initfinished = true;
        this._flush();
     })
  }

  call(apiFn, onComplete) {
    if(!this.initfinished) {
      this.queue.push(() => {
        apiFn((err, result) => {
          onComplete(err, result);
        })
      })

      return;
    }

     apiFn((err, result) => {
        onComplete(err, result);
      })

  }

  _flush() {
    while(this.queue.length) {
      this.queue.shift()();
    }
  }
}

module.exports = GuardedAPI;

