// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.

//wrap every value inside a promise as it also covers thenables, promises, normal values
function promiseAll(promises) {
    if(!Array.isArray(promises)) {
        return Promise.reject(new TypeError('argument is not an array'));
    }
    
    if(promises.length === 0) return Promise.resolve([]);

    const results = new Array(promises.length);
    let count = 0;
    return new Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
            .then((value) => {
                results[i] = value;
                count++;
                if(count === promises.length) {
                    resolve(results);
                }
            })
            .catch(err => reject(err));
        }
    })
}

module.exports = promiseAll;
