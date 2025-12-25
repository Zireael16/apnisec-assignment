import { prisma } from "@/lib/database/db";
import { User, Prisma } from "@prisma/client";

export class UserRepository {
  /**
   * Finds a user by their email address.
   * Equivalent to: SELECT * FROM User WHERE email = '...'
   */
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Creates a new user in the database.
   * Equivalent to: INSERT INTO User (...) VALUES (...)
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Update user details
   */
  async update(id: string, data: any): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
}