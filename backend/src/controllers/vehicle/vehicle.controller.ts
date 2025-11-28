import { Request, Response } from "express";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { prisma } from "../../config/prisma";

export class VehicleController {

  static async create(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;

      const driver = await prisma.driver.findUnique({
        where: { userId }
      });

      if (!driver) {
        return res.status(400).json({ message: "Driver não encontrado." });
      }

      const vehicle = await VehicleService.create(driver.id, req.body);
      return res.status(201).json(vehicle);

    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    const userId = req.user!.userId;

    const driver = await prisma.driver.findUnique({
      where: { userId }
    });

    const vehicles = await VehicleService.list(driver!.id);
    return res.json(vehicles);
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updated = await VehicleService.update(id, req.body);
      return res.json(updated);

    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await VehicleService.delete(id);
      return res.status(204).send();

    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
