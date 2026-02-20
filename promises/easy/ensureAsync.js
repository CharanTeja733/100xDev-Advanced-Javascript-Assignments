// Problem Description – ensureAsync(fn)

// You are required to write a function named ensureAsync that takes another function fn as input. 
// The goal is to guarantee that calling fn always returns a Promise, even if fn is synchronous.
// Using the async keyword is recommended, as it automatically wraps return values and errors in a Promise.
// function ensureAsync(fn) {
//    return async function(...arg) {
//        return fn(...arg);
//    }
// }

function ensureAsync(fn) {
    return function (...arg) {
        const value = fn(...arg);

        if( value instanceof Promise) {
            return value;
        }

       return new Promise((resolve, reject) => {
           
        });

    }
}

module.exports = ensureAsync;
