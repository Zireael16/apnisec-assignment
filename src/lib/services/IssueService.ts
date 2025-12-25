import { IssueRepository } from "../repositories/IssueRepository";
import { Issue, Status } from "@prisma/client";

export class IssueService {
  private issueRepo: IssueRepository;

  constructor() {
    this.issueRepo = new IssueRepository();
  }

  async createIssue(userId: string, data: any) {
    return await this.issueRepo.create({
      title: data.title,
      description: data.description,
      type: data.type, // Cloud Security, VAPT, etc.
      priority: data.priority || "MEDIUM",
      status: "OPEN",
      // Connect the issue to the User who created it
      user: {
        connect: { id: userId },
      },
    });
  }

  async getUserIssues(userId: string) {
    return await this.issueRepo.findByUserId(userId);
  }

  async updateIssueStatus(issueId: string, status: Status) {
    return await this.issueRepo.update(issueId, { status });
  }
  
  async deleteIssue(issueId: string) {
    return await this.issueRepo.delete(issueId);
  }
}