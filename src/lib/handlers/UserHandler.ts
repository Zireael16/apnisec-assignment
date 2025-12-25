import { NextResponse } from "next/server";
import { UserService } from "../services/UserService";
import { jwtVerify } from "jose";

export class UserHandler {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Helper to extract User ID from cookie
  private async getUserId(req: Request): Promise<string | null> {
    const tokenCookie = req.headers.get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!tokenCookie) return null;

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(tokenCookie, secret);
      return payload.userId as string;
    } catch (error) {
      return null;
    }
  }

  // GET: Get my profile
  async getProfile(req: Request) {
    const userId = await this.getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const user = await this.userService.getUserProfile(userId);
      return NextResponse.json(user);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
  }

  // PUT: Update my profile
  async updateProfile(req: Request) {
    const userId = await this.getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const body = await req.json();
      const updatedUser = await this.userService.updateUserProfile(userId, body);
      return NextResponse.json(updatedUser);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}