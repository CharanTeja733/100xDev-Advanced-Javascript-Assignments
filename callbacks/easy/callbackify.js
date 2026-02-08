// Problem Description – promisify(fn)

// You are required to write a function named promisify that takes a function following the callback pattern (error, data) => void. 
// The goal is to convert this function into one that returns a Promise. 
// The Promise should resolve with the data when no error occurs and reject when an error is provided.


//fn is promise here and above description wrong
function callbackify(fn) {  

   return (...arg) => {
      const callback = arg[arg.length - 1];
      const param = arg.slice(0, arg.length - 1);
      fn(...param)
      .then(val => callback(null, val))
      .catch(err => callback(err, null));
   };
}

module.exports = callbackify;