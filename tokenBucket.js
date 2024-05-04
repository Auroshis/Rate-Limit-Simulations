class TokenBucket {
    constructor(capacity, rate) {
        this.capacity = capacity; // Maximum capacity of the bucket
        this.rate = rate; // Rate at which tokens are added to the bucket per second
        this.tokens = capacity; // Current number of tokens in the bucket, initially set to capacity
        this.lastUpdateTime = Date.now(); // Last time the bucket was updated
    }

    // Add tokens to the bucket based on the elapsed time since the last update
    _updateTokens() {
        let currentTime = Date.now();
        let timeElapsed = (currentTime - this.lastUpdateTime) / 1000; // Convert milliseconds to seconds
        this.tokens = Math.min(this.capacity, this.tokens + timeElapsed * this.rate);
        this.lastUpdateTime = currentTime;
    }

    // Process a request if there are enough tokens in the bucket
    // Returns true if the request was processed, false otherwise
    processRequest(tokensRequired) {
        this._updateTokens();
        if (this.tokens >= tokensRequired) {
            this.tokens -= tokensRequired;
            return true; // Request processed successfully
        } else {
            return false; // Not enough tokens, request rejected
        }
    }
}

// Example usage:
const capacity = 10; // Maximum capacity of the bucket
const rate = 1; // Rate at which tokens are added to the bucket per second
const tokensRequiredPerRequest = 2; // Number of tokens required for each request

const bucket = new TokenBucket(capacity, rate);

// Simulate processing requests
for (let i = 0; i < 15; i++) {
    setTimeout(() => {
        if (bucket.processRequest(tokensRequiredPerRequest)) {
            console.log(`Request ${i + 1}: Processed`);
        } else {
            console.log(`Request ${i + 1}: Rejected`);
        }
    }, i * 1000); // Delay requests by 1 second
}
