import { prisma } from "../../config/prisma";

export class VehicleService {
  static async create(driverId: string, data: any) {
    return prisma.vehicle.create({
      data: {
        ...data,
        driverId
      }
    });
  }

  static async list(driverId: string) {
    return prisma.vehicle.findMany({
      where: { driverId },
      orderBy: { createdAt: "desc" }
    });
  }

  static async update(vehicleId: string, data: any) {
    return prisma.vehicle.update({
      where: { id: vehicleId },
      data
    });
  }

  static async delete(vehicleId: string) {
    return prisma.vehicle.delete({
      where: { id: vehicleId }
    });
  }

  static async findById(vehicleId: string) {
    return prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
  }
}
