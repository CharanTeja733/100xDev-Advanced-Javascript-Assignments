// Problem Description – Custom Implementation of Promise.race

// You are required to implement your own version of Promise.race without using the built-in method. 
// The function should accept an iterable of values that may include Promises or plain values. 
// It must settle as soon as the first input settles, resolving or rejecting accordingly. 
// Using Promise.resolve ensures non-promise values are handled correctly.
function promiseRace(promises) {
    if(!Array.isArray(promises))
        return Promise.reject(new TypeError('argument is not an array'));

    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise)
                .then((value) => {
                    resolve(value)
                })
                .catch(err => {
                    reject(err);
          
                })
        })
    })
}

module.exports = promiseRace;

