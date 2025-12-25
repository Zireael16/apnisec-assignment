import { NextResponse } from "next/server";
import { IssueService } from "../services/IssueService";
import { UserService } from "../services/UserService"; // <--- ADDED IMPORT
import { EmailService } from "../services/EmailService"; // <--- ADDED IMPORT
import { jwtVerify } from "jose";

export class IssueHandler {
  private issueService: IssueService;
  private userService: UserService;
  private emailService: EmailService;

  constructor() {
    this.issueService = new IssueService();
    this.userService = new UserService();
    this.emailService = new EmailService();
  }

  /**
   * Helper to get User ID from the 'token' cookie
   */
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

  // GET: Fetch all issues for the logged-in user
  async getIssues(req: Request) {
    const userId = await this.getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const issues = await this.issueService.getUserIssues(userId);
    return NextResponse.json(issues);
  }

  // POST: Create a new issue
  async createIssue(req: Request) {
    const userId = await this.getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const body = await req.json();
      if (!body.title || !body.type) {
        return NextResponse.json({ error: "Title and Type are required" }, { status: 400 });
      }

      // 1. Create the issue in the database
      const issue = await this.issueService.createIssue(userId, body);

      // --- NEW: SEND EMAIL NOTIFICATION ---
      // We fetch the user profile to get their email address
      const user = await this.userService.getUserProfile(userId);
      
      // Trigger the email (we don't await this so the API remains fast)
      this.emailService.sendIssueCreatedEmail(user.email, issue.title, issue.id);
      // ------------------------------------

      return NextResponse.json(issue, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


  // PUT: Update an issue status (e.g. OPEN -> CLOSED)
  async updateIssue(req: Request) {
    const userId = await this.getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const { searchParams } = new URL(req.url);
      const issueId = searchParams.get("id");
      const body = await req.json();

      if (!issueId || !body.status) {
        return NextResponse.json({ error: "ID and Status required" }, { status: 400 });
      }

      const updated = await this.issueService.updateIssueStatus(issueId, body.status);
      return NextResponse.json(updated);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // DELETE: Remove an issue
  async deleteIssue(req: Request) {
    const userId = await this.getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const issueId = searchParams.get("id");

    if (!issueId) {
      return NextResponse.json({ error: "Issue ID required" }, { status: 400 });
    }

    await this.issueService.deleteIssue(issueId);
    return NextResponse.json({ success: true });
  }
}