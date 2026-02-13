
// Problem Description – Abortable Promise Wrapper

// You are required to wrap a Promise so that it can be cancelled using an AbortSignal.
// If the signal is aborted before the Promise settles, the wrapper should immediately reject with an appropriate error. 
// If not aborted, it should resolve or reject normally.

/* just using promise and flag
function makeCancellable(promise, signal) {
      let flag = true;
      if(signal.aborted === true) {
            return Promise.reject(new Error('Aborted'));     
      }

      return new Promise((resolve, reject) =>{
            const handler =  () => {
				if(flag) {
					flag = false;
					reject(new Error('Aborted'));    
				}     
			};
            signal.addEventListener('abort', handler);

            promise.then(result => {
                  if(flag) {
                        flag = false;
                        signal.removeEventListener('abort', handler)
                        resolve(result);
                  }
            } )
            .catch(err => {
                  if(flag) {
                        flag = false;
                        signal.removeEventListener('abort', handler)
                        reject(err)
                  } 
            });
      })
	  
}
 */

// using promise.race 
function makeCancellable(promise, signal) {

	if(signal.aborted === true) {
		return Promise.reject(new Error('Aborted'));     
	}
	
	let handler;

	return Promise.race([
		new Promise((_, reject) =>{

			handler =  () => {
				signal.removeEventListener('abort', handler);
				reject(new Error('Aborted'));
			};	

		signal.addEventListener('abort', handler);

	}), new Promise((resolve, reject) => {
		promise.then(result => {
			signal.removeEventListener('abort', handler)
			resolve(result);
		}).catch(err => {
			signal.removeEventListener('abort', handler)
			reject(err);
		})
	})])

}


module.exports = makeCancellable;
