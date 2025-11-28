import { prisma } from "../../config/prisma";

export class DriverService {
  static async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { driver: true },
    });

    return user;
  }
}
