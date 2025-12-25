interface RateLimitRecord {
  count: number;
  lastRequest: number;
}

export class RateLimiter {
  // We use a global variable to ensure it survives Next.js hot-reloads in dev mode
  private static limits = new Map<string, RateLimitRecord>();
  
  private readonly WINDOW_SIZE_MS = 60 * 1000; // 1 Minute
  private readonly MAX_REQUESTS = 5; // <--- CHANGED TO 5 FOR TESTING

  check(ip: string): boolean {
    const now = Date.now();
    const record = RateLimiter.limits.get(ip);

    // 1. New User
    if (!record) {
      console.log(`[RateLimit] New IP: ${ip} | Count: 1/${this.MAX_REQUESTS}`);
      RateLimiter.limits.set(ip, { count: 1, lastRequest: now });
      return true;
    }

    // 2. Reset Window (Time expired)
    if (now - record.lastRequest > this.WINDOW_SIZE_MS) {
      console.log(`[RateLimit] Resetting window for ${ip}`);
      record.count = 1;
      record.lastRequest = now;
      return true;
    }

    // 3. Increment Count
    record.count++;
    console.log(`[RateLimit] IP: ${ip} | Count: ${record.count}/${this.MAX_REQUESTS}`);

    // 4. Block if limit exceeded
    if (record.count > this.MAX_REQUESTS) {
      console.log(`[RateLimit] 🛑 BLOCKED IP: ${ip}`);
      return false; 
    }

    return true;
  }
}