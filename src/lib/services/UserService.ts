import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * Registers a new user.
   * 1. Checks if email exists.
   * 2. Hashes the password.
   * 3. Saves to DB.
   */
  async registerUser(data: any): Promise<User> {
    // 1. Check if user already exists
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // 2. Hash the password (Salt rounds: 10)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Create the user
    return await this.userRepo.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: "USER", // Default role
    });
  }


  async loginUser(data: any) {
    const user = await this.userRepo.findByEmail(data.email);
    if(!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        {expiresIn: "7d"}
    );

    return {user, token};
  }


  async getUserProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");
    
    // Remove password before sending back
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUserProfile(userId: string, data: any) {
    // We only allow updating the Name for now
    return await this.userRepo.update(userId, {
      name: data.name,
    });
  }
}