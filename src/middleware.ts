import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// 1. OOP Structure: Define the RateLimiter Class
class RateLimiter {
  private static limits = new Map<string, { count: number; resetTime: number }>();
  
  // Requirement: 100 requests per 15 minutes
  private readonly LIMIT = 100;
  private readonly WINDOW_MS = 15 * 60 * 1000; 

  public check(ip: string) {
    const now = Date.now();
    
    if (!RateLimiter.limits.has(ip)) {
      RateLimiter.limits.set(ip, { count: 0, resetTime: now + this.WINDOW_MS });
    }

    const record = RateLimiter.limits.get(ip)!;

    // Reset if window passed
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + this.WINDOW_MS;
    }

    // Check if blocked
    if (record.count >= this.LIMIT) {
      return { 
        success: false, 
        limit: this.LIMIT, 
        remaining: 0, 
        reset: record.resetTime 
      };
    }

    // Increment
    record.count++;

    return { 
      success: true, 
      limit: this.LIMIT, 
      remaining: this.LIMIT - record.count, 
      reset: record.resetTime 
    };
  }
}

// Instantiate the class (Singleton pattern)
const limiter = new RateLimiter();

export async function middleware(request: NextRequest) {
  // --- 1. RATE LIMITING CHECK ---
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  
  // Use the Class to check limits
  const result = limiter.check(ip);

  // Prepare the Response (Block or Allow)
  let response: NextResponse;

  if (!result.success) {
    // Return 429 Error with JSON
    response = new NextResponse(
      JSON.stringify({ error: "Too Many Requests", retryAfter: result.reset }), 
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  } else {
    // Allow the request to continue
    response = NextResponse.next();
  }

  // Requirement: Add Rate Limit Headers to EVERY response
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  response.headers.set("X-RateLimit-Reset", result.reset.toString());

  // If blocked, return immediately (so we don't process Auth)
  if (!result.success) return response;

  // --- 2. AUTHENTICATION CHECK ---
  const token = request.cookies.get("token")?.value;
  const protectedRoutes = ["/dashboard", "/issues", "/profile"];
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch (error) {
      if (isProtectedRoute) {
        const redirectRes = NextResponse.redirect(new URL("/login", request.url));
        redirectRes.cookies.delete("token");
        return redirectRes;
      }
    }
  }

  // Return the response (which includes the headers we attached)
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/issues/:path*", "/profile/:path*", "/api/:path*"],
};