// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.


/* First implementation using callback queue
function batchProcess(items, limit, worker, onComplete) {
    if(items.length === 0) {
       return onComplete(null, []);
    }  

    const finishedItems = new Array(items.length);
    let nextIndex = 0;
    let finishedCount = 0;
    let stopped = false;
    const callbackQueue = [];

    for(let i = 0; i < items.length; i++) {
        const index = i;
        const cb = (err, result, index) => {
            if(stopped) return;

            if(err !== null) {
                stopped = true;
                onComplete(err, null);
                return;
            }
            
            finishedItems[index] = result;
            finishedCount++;

            if(nextIndex < items.length) {
                callbackQueue[nextIndex]();
                nextIndex++;
            }

            if(finishedCount === items.length) {
                console.log(finishedItems);
                onComplete(null, finishedItems);
            }
        }

        callbackQueue.push(() => {
            worker(items[i], cb);
        });
    }
    
    for(let i = 0; i < items.length && i < limit; i++) {
        callbackQueue[i]();
        nextIndex++;
    }
}

*/

//second implementation without creating custom callback queue
function batchProcess(items, limit, worker, onComplete) {
    if(items.length === 0) {
       return onComplete(null, []);
    }  

    const finishedItems = new Array(items.length);
    let nextIndex = 0;
    let finishedCount = 0;
    let stopped = false;

    const cb = (err, result, index) => {
        if(stopped) return;

        if(err !== null) {
            stopped = true;
            onComplete(err, null);
            return;
        }
        console.log(index, result);
        finishedItems[index] = result;
        finishedCount++;

        if(nextIndex < items.length) {
            const index = nextIndex;
            worker(items[nextIndex], (err, result) => {
                cb(err, result, index);
            }); 
            nextIndex++;
        }

        if(finishedCount === items.length) {
            console.log(finishedItems);
            onComplete(null, finishedItems);
        }
    }

    for(let i = 0; i < items.length && i < limit; i++) {
        const idx = i;
        worker(items[i], (err, result) => {
            cb(err, result, idx);
        });

        nextIndex++;
    }
}

module.exports = batchProcess;



// learned concept: in loop the "let" declared loop variable is recreated every iteration not like "var" because "let" is block scoped and "var" is function scoped
// iteration1 -> let i = 0
// iteration2 -> let i = 1 (new i variable)
// iteration3 -> let i = 2