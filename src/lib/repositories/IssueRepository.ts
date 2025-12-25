import { prisma } from "@/lib/database/db";
import { Issue, Prisma } from "@prisma/client";

export class IssueRepository {
  /**
   * Create a new issue connected to a specific user
   */
  async create(data: Prisma.IssueCreateInput): Promise<Issue> {
    return await prisma.issue.create({
      data,
    });
  }

  /**
   * Get all issues for a specific user
   */
  async findByUserId(userId: string): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Show newest first
    });
  }

  /**
   * Update an issue (e.g., changing status)
   */
  async update(id: string, data: Prisma.IssueUpdateInput): Promise<Issue> {
    return await prisma.issue.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete an issue
   */
  async delete(id: string): Promise<Issue> {
    return await prisma.issue.delete({
      where: { id },
    });
  }
}