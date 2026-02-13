// Problem Description – I/O Operation With Timeout
//
// You are given an asynchronous function that represents an I/O-bound task
// (such as a network request or database call).
//
// Your task is to execute this function, but enforce a time limit.
// If the I/O operation does not complete within the specified number
// of milliseconds, the returned promise should reject with a "Timeout" error.

/* older code but it still works
async function ioWithTimeout(fn, ms) {

    let flag = true;
    let timeoutId;

    return new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
            if(flag) {
                flag = false;
                reject("Timeout");
            }
        }, ms);

        fn()
            .then(data => {
                if(flag) {
                    flag = false;
                    clearTimeout(timeoutId);
                    resolve(data);
                }
            })
            .catch(err =>{
                if(flag){
                    flag = false;
                    reject(err);
                }
            });
    });
}
*/
async function ioWithTimeout(fn, ms) {
    return Promise.race([
        new Promise((_, reject) =>{
            setTimeout(() => {
                reject("Timeout");
            }, ms)
        }),
        fn()
    ]) 
}

module.exports = ioWithTimeout;


 