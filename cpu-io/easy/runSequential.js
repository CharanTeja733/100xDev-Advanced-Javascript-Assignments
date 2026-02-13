// Problem Description – Sequential Execution of Async Functions

// You are given an array of asynchronous functions. Your task is to execute them one by one, ensuring that each function starts only after the previous one has completed. 
// The final result should be an array of resolved values in the same order.
async function runSequential(functions) {
     if(!functions.length) {
        return [];
    }
    const arr = new Array(functions.length);


    for(let i = 0; i < arr.length; i++) {
        arr[i] = await functions[i]();
    }
    

    return arr;
}

module.exports = runSequential;

