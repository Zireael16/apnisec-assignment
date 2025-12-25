import { UserHandler } from "@/lib/handlers/UserHandler";

const userHandler = new UserHandler();

export async function GET(req: Request) {
  return userHandler.getProfile(req);
}

export async function PUT(req: Request) {
  return userHandler.updateProfile(req);
}