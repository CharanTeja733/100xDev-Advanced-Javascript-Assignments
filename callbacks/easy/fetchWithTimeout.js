// Problem Description – fetchWithTimeout(url, ms)

// You are required to write a function named fetchWithTimeout that accepts a URL and a time limit in milliseconds. 
// The function must return a Promise that attempts to fetch data from the given URL.
// If the request completes within the specified time, the Promise resolves with the fetched data. 
// If the operation exceeds the time limit, the Promise rejects with the message "Request Timed Out".

function fetchWithTimeout(url, ms, callback) {
    let flag = false;
    const timeOutId = setTimeout(() => {
        if(!flag){
            flag = true;
            callback(new Error("Request Timed Out"), null);
        }
            
    }, ms);

    fetch(url, (err, data) => {
        if(!flag) {
            flag = true;
            clearTimeout(timeOutId)
            callback(err, data);
        } 
    });


}

module.exports = fetchWithTimeout;
