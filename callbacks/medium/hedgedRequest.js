// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
    
    let stopped = false;
    let errorBefore = false;
    const handleRequest = (err, data) => {
        if(stopped) return;

        if(err) {
            if(errorBefore === false) {
                errorBefore = true;
                
            } else {
                onComplete(err, null);
            }

            return;
        }

        stopped = true;
        onComplete(err,data);
    };

    primary(handleRequest);

    setTimeout(() => {
        if(stopped) return;
        secondary(handleRequest);
    }, timeoutMs);
}

module.exports = hedgedRequest;
