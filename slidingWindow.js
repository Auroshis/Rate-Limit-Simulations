class SlidingWindowRateLimiter {
    constructor(windowSize, limit) {
        this.windowSize = windowSize; // in milliseconds
        this.limit = limit;
        this.requests = [];
    }

    allowRequest() {
        const currentTime = Date.now();
        
        // Remove expired requests from the window
        this.requests = this.requests.filter(req => req > currentTime - this.windowSize);

        // Check if the number of requests within the window exceeds the limit
        if (this.requests.length >= this.limit) {
            return false; // Request not allowed
        } else {
            this.requests.push(currentTime); // Add current request timestamp to the window
            return true; // Request allowed
        }
    }
}

// Example usage
const rateLimiter = new SlidingWindowRateLimiter(10000, 5); // Window size: 10 seconds, Limit: 5 requests

// Simulate requests
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        if (rateLimiter.allowRequest()) {
            console.log(`Request ${i + 1}: Allowed`);
        } else {
            console.log(`Request ${i + 1}: Denied`);
        }
    }, i * 1000); // Simulate requests spaced 1 second apart
}
