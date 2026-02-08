// Problem Description – Parallel Execution with Concurrency Limit
//
// You need to execute many asynchronous tasks (e.g., image downloads),
// but only a fixed number are allowed to run at the same time to avoid
// resource exhaustion.
//
// This problem tests concurrency control and result ordering.
//
// Requirements:
// - Accept an array of tasks and a concurrency limit.
// - Run at most `limit` tasks in parallel until all are completed.
// - Return results in the original task order via onAllFinished.

function mapLimit(tasks, limit, onAllFinished) {
    if(tasks.length === 0) return onAllFinished(null, []);

    const results = [];
    let running = 0;
    let nextIndex = 0;
    let completed = 0;

    function lauchNext() {
        if(nextIndex >= tasks.length) return;

        running++;
        const index = nextIndex;
        nextIndex++;
        
        tasks[index]((err, result) => {
            running--;
            results[index] = result;
            completed++;
            if(completed < tasks.length) {
                return lauchNext();
            }

            if(completed === tasks.length) {
                onAllFinished(null, results);
            }
        })
    }

    for(let i = 0; i < limit && i < tasks.length; i++) {
        lauchNext();
    }    
}

module.exports = mapLimit;
