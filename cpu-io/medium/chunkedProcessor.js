// Problem Description – Smart Progress Bar (CPU Yielding)
//
// You need to process a large list of items without blocking
// the event loop.
//
// Process the items in small chunks and yield control back
// to the event loop after each chunk so the system stays responsive.
//
// Requirements:
// - Implement chunkedProcessor(items, processFn, onComplete).
// - Process items in fixed-size chunks.
// - Yield using setImmediate after each chunk.
// - Call onComplete after all items are processed.
function chunkedProcessor(items, processFn, onComplete) {
    const chunkSize = 100;
    const total = items.length;
    let i = 0;

    function step() {
        let end = i + chunkSize;
        if(end > total) 
            end = total;

        for(;i < end; i++) {
            processFn(items[i]);
        }
        
        if(i < total) {
            setImmediate(step)
 
        } else {
            onComplete();
        }

    }

    step();
}

module.exports = chunkedProcessor;


module.exports = chunkedProcessor;
