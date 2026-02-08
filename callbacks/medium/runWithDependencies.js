// Problem Description – Task Execution with Dependencies

// You are given a set of asynchronous tasks where some tasks depend on the completion of others. 
// Your goal is to execute each task only after all of its dependencies have been successfully fulfilled. 
// The solution should ensure correct execution order and handle dependency relationships properly
function runWithDependencies(tasks, finalCallback) {
    const results = [];
    let completed = 0;
    const completedTask = new Set();
    function lauchNext() {
        for(let task of tasks) {
            const cb = (err, result) => {
                completed++;
                results[task.id] = result;
                completedTask.add(task.id);

                if(completed === tasks.length) {
                    return finalCallback(err, results);
                }
                lauchNext();
            }

            if(!completedTask.has(task.id)) {
                
                let fulfilled = true;
                for( let dep of task.deps) {
                        if(completedTask.has(dep)) {
                            fulfilled = false;
                            break;
                        }
                }

               if(fulfilled) {
                    task.run(cb);
               }
            } 
        }
    }

    lauchNext();
}

module.exports = runWithDependencies;
