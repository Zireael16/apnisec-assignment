import { IssueHandler } from "@/lib/handlers/IssueHandler";

const issueHandler = new IssueHandler();

export async function GET(req: Request) {
  return issueHandler.getIssues(req);
}

export async function POST(req: Request) {
  return issueHandler.createIssue(req);
}

export async function PUT(req: Request) {
  return issueHandler.updateIssue(req);
}

export async function DELETE(req: Request) {
  return issueHandler.deleteIssue(req);
}