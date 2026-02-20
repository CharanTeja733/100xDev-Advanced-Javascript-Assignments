// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
    if(!Array.isArray(promises)) 
        return Promise.reject(new TypeError('argument is not an array'));

    if(promises.length === 0)
        return Promise.reject(new Error('Empty iterable'));

    return new Promise((resolve, reject) => {
        let errCount = 0;
        let errors = [];
        promises.forEach(promise => {
            Promise.resolve(promise)
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    errors.push(err);
                    errCount++;
                    if(errCount === promises.length) 
                        reject(new Error("All promises were rejected"));
                });
        })
    })
}

module.exports = promiseAny;
