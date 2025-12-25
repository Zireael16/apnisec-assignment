// src/app/api/auth/register/route.ts
import { AuthHandler } from "@/lib/handlers/AuthHandler";

// Instantiate the handler
const authHandler = new AuthHandler();

// Export the POST method
export async function POST(request: Request) {
  // Delegate logic to the Class-based Handler
  return authHandler.register(request);
}