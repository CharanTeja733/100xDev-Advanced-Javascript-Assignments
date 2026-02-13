// Problem Description – Parallel Execution of Async Functions
//
// You are given an array of asynchronous functions. Your task is to execute
// all of them at the same time (in parallel).
//
// The function should return a promise that resolves to an array of
// resolved values in the same order as the input functions.
//
// If any of the asynchronous functions reject, the returned promise
// should immediately reject with that error.

async function runParallel(functions) {
    if(!functions.length) {
        return [];
    }
    const arr = new Array(functions.length);

    const newArr = [];

    for(let i = 0; i < arr.length; i++) {
        newArr.push(
            functions[i]()
            .then((data) => {arr[i] = data;})
        )
    }

    await Promise.all(newArr);

    return arr;
}

module.exports = runParallel;
