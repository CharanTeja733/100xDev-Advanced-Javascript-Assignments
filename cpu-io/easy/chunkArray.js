// Problem Description – Chunk Array
//
// When dealing with large datasets, it's often necessary to process them
// in smaller batches (chunks) to avoid overloading the CPU or I/O.
//
// Your task is to implement a function `chunkArray(array, size)` that
// splits an array into sub-arrays of a maximum specified size.
//
// Requirements:
// 1. The function should return a new array containing the chunks.
// 2. The last chunk might be smaller than the specified size.
// 3. Handle edge cases like empty arrays or chunk size <= 0.
//
// This is a prerequisite for common patterns like batching API calls.

function chunkArray(array, size) {
    if(!array) return [];
    if(size <= 0) return [];

    const newArr = [];
    let i = 0;

    while ( i < array.length) {
       const chunk = [];
        let j = 0;
        while(j < size && i + j < array.length) {
            chunk.push(array[i + j]);
            j++;
        }

        newArr.push(chunk);
        i += j;
    }
    return newArr;
}

module.exports = chunkArray;
