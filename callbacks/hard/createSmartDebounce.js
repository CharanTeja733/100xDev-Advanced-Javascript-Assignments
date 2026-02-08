// Problem Description – Debounced Search with Result Guard
//
// You are building a search bar that should not call the API
// on every keystroke, so the request must be debounced.
//
// If an older request finishes after a newer one, its result
// must be ignored to prevent stale UI updates.
//
// Requirements:
// - Delay execution by waitMs.
// - Reset the timer on repeated calls.
// - Only the latest request may trigger the callback.

function createSmartDebounce(worker, waitMs) {

    let stopped = false;
    let lastCalled = 0;
    return function(input, cb) {
        if(lastCalled || Date.now() - lastCalled >  waitMs) {
            lastCalled = Date.now();
            worker(input, (err, result) => {
                stopped = true;
                cb(err, result);
            })
        }
    }

}

module.exports = createSmartDebounce;
