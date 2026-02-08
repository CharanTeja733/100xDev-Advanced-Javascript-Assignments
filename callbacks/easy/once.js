// Problem Description – once(fn)

// You are required to implement a wrapper function named once that accepts an asynchronous function fn.
// The wrapper should ensure that fn is executed only on the first call.
// Any subsequent calls must not re-execute fn and should instead return the same Promise or resolved result from the first invocation.

function once(fn) {
    let storedResult;
    let storedError;
    let started = false;
    let finished = false;
    const queue = [];
    return function (...arg) {
        const callback = arg[arg.length - 1];

        if(finished) { 
            return callback(storedError, storedResult);
        }

        queue.push(callback);

        if(started) return;
        started = true;

        arg[arg.length - 1] = function (err, data) {
            finished = true;
            storedResult = data;
            storedError = err;
            while(queue.length) {
                queue.shift()(storedError, storedResult);
            }
        };

        fn(...arg);
    }
}

module.exports = once;
