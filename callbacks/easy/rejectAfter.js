// Problem Description – rejectAfter(ms)

// You are required to create a function named rejectAfter that accepts a time duration in milliseconds. 
// The function should return a Promise that waits for the specified time and then rejects.

function rejectAfter(ms, callback) {
    setTimeout(() => {
        callback(new Error(`Rejected after ${ms}ms`), null);
    }, ms);

}

module.exports = rejectAfter;

