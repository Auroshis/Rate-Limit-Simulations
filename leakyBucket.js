class LeakyBucket {
    overflowRate = 0;
    capacity = 0;
    lastUpdated = Date.now();
    queue = [];// JS does not have a built-in queue hence usng an array
    constructor(overflowRate, capacity) {
        this.capacity = capacity;
        this.overflowRate = overflowRate;
        this.processRequests();
    }

    // async startProcessing() {
    //     this.processRequests();
    // }

    addRequest(request){
        if (this.queue.length < this.capacity){
            this.queue.push(request.message);
            console.log(`Request Added to queue ${request.message}`);
        }
        else {
            console.log(`Request rejected ${request.message}`);
        }
    }

    async processRequests() {
        console.log("Started processing requests");
        setInterval(()=>{
            if(this.queue){
                for (let i=0; i<this.overflowRate;i++){
                    console.log(this.queue);
                    const curMessage = this.queue.shift();
                    console.log(curMessage+" processed");    
                }
            }
        }, 1000);
    }
}

const overflowRate = 1;
const capacity = 5;

const rateLimiter = new LeakyBucket(overflowRate, capacity);

//setInterval approach -  without
// let i = 0;
// setInterval(()=>{
//     rateLimiter.addRequest({"message": `request ${i}`});
//     i += 1;
// }, 500);

//setTimeout Approach
async function triggerRequests() {
    for (let i = 0; i < 20; i++) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    rateLimiter.addRequest({ "message": `request ${i}` });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 500);
        });
    }
}

triggerRequests();