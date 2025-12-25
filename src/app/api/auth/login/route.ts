import { AuthHandler } from "@/lib/handlers/AuthHandler";

const authHandler = new AuthHandler();

export async function POST(req: Request) {
  return authHandler.login(req);
}