import { NextResponse } from "next/server";
import { UserService } from "../services/UserService";
import { EmailService } from "../services/EmailService";

export class AuthHandler {
  private userService: UserService;
  private emailService: EmailService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();
  }

  /**
   * Handle POST /api/auth/register
   */
  async register(req: Request) {
    try {
      const body = await req.json();

      // Basic validation
      if (!body.email || !body.password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

      const user = await this.userService.registerUser(body);

      this.emailService.sendWelcomeEmail(user.email, user.name || "User");

      // Return success (excluding password for security)
      return NextResponse.json(
        { message: "User created successfully", userId: user.id },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 400 }
      );
    }
  }


  async login(req: Request) {
    try {
      const body = await req.json();
      const { user, token } = await this.userService.loginUser(body);

      // Create the response
      const response = NextResponse.json(
        { message: "Login successful", user: { id: user.id, email: user.email } },
        { status: 200 }
      );

      // Set the HTTP-Only Cookie (Secure & Safe)
      response.cookies.set("token", token, {
        httpOnly: true, // JavaScript cannot read this (prevents XSS attacks)
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Login failed" },
        { status: 401 }
      );
    }
  }
}