// Problem Description – Retry with Exponential Backoff and Jitter

// You are required to implement a retry mechanism for an asynchronous task that fails. 
// On each retry, the delay before the next attempt should increase, and a small random “jitter”
// should be added to the delay to prevent synchronized retries that can overload a server. 
// The process should stop once the task succeeds or the maximum retry limit is reached.
async function retryWithJitter(fn, retries = 3, baseDelay = 1000) {
    let result;
    let error;
    for(let i = 0; i <= retries; i++) {
        try {
            result = await fn();
            return result;
        } catch(err) {
            error = err;
            if(i !== retries)
                await new Promise((resolve) => 
                    setTimeout(resolve, baseDelay*(2**i)*( 1+ Math.random()*0.1))
                );
        }
    }

    throw error;
}    

module.exports = retryWithJitter;
