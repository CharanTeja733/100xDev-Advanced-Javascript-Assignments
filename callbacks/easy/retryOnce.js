// Problem Description – Retry Async Function Once

// You are given an asynchronous function fn. Your task is to return a new function that calls fn and retries it once if the first attempt fails. 
// If the second attempt also fails, the error should be properly propagated. 


//It is a scalable version of retryOnce if i want to retry more than once i can still use this
function retryOnce(fn, maxAttempts = 2) {

    return function (...arg) {
        const userCallback = arg[arg.length - 1];
        const params = arg.slice(0, -1);
        let attempt = 1;

        const internalCallback = (err, data) => {
            
            if(err&& attempt < maxAttempts) {
                attempt++;
                fn(...params);
                return;
            }

            userCallback(err, data);
        };

        arg[arg.length - 1] = internalCallback;
        fn(...arg);
    }
}

module.exports = retryOnce;
