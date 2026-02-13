
// Problem Description – Recursive Fetch with Redirect Handling

// You are required to fetch data for a given set of IDs. 
// Each response may contain a redirectId, indicating that the data should be fetched again using the new ID. 
// The process must continue until the final data is reached. 
// Your implementation should also detect and prevent infinite redirect loops.

async function fetchDeep(ids, fetcher, maxDepth = 5) {
    const entries = Object.entries(ids);
    const result = {};
    const promiseArr = [];
    for(let i = 0; i < entries.length; i++) {
        let id = entries[i][1];
        const key = entries[i][0];

        const step = async() => {
            let data;
            let depth = 0;
            const visitedIds = new Set();
            try {
                for(; depth < maxDepth; depth++) {
                    if(visitedIds.has(id)) {
                       throw new Error("Max redirect depth exceeded");
                    }
                    visitedIds.add(id)
                    
                    data = await fetcher(id);

                    if( !Object.hasOwn(data, "redirectId")) {
                        break;
                    }
                    id = data.redirectId;
                }
            } catch(err) {
                throw err; 
            }
        
            if(depth === maxDepth) {
                throw new Error("Max redirect depth exceeded");
            }

            return {key, value: data}
        }

        promiseArr.push(step());
    }

    const resultArr = await Promise.all(promiseArr);

    
    for(let idValue of  resultArr) {
        result[idValue.key] = idValue.value;
    }

    return result;
}

module.exports = fetchDeep;

/*

for(let i = 0; i < entries.length; i++) {
        let id = entries[i][1];
        let data;
        let depth = 0;
        const appearIds = new Set();
        for(; depth < maxDepth; depth++) {
            if(appearIds.has(id)) {
                throw new Error("Max redirect depth exceeded");
            }
            appearIds.add(id)
            
            data = await fetcher(id);

            if( !Object.hasOwn(data, "redirectId")) {
                break;
            }
            id = data.redirectId;
        }

        if(depth === maxDepth) throw new Error("Max redirect depth exceeded")
        result[entries[i][0]] = data;
    }

    return result;
*/

/* older code but still works
async function fetchDeep(ids, fetcher, maxDepth = 5) {
    const entries = Object.entries(ids);
    const result = {};
    const promiseArr = [];
    for(let i = 0; i < entries.length; i++) {
        let id = entries[i][1];
    
        promiseArr.push(
            new Promise((resolve, reject) => {
                const step = async() => {
                    let data;
                    let depth = 0;
                    const visitedIds = new Set();
                    try {
                        for(; depth < maxDepth; depth++) {
                            if(visitedIds.has(id)) {
                                reject(new Error("Max redirect depth exceeded"));
                                return;
                            }
                            visitedIds.add(id)
                            
                            data = await fetcher(id);

                            if( !Object.hasOwn(data, "redirectId")) {
                                break;
                            }
                            id = data.redirectId;
                        }
                    } catch(err) {
                        reject(err);
                        return;
                    }
                
                    if(depth === maxDepth) {
                        reject(new Error("Max redirect depth exceeded"));
                        return;
                    }

                    result[entries[i][0]] = data;
                    resolve();
                }
                
                step();
            })
        )
    }

    await Promise.all(promiseArr);

    return result;
}
*/