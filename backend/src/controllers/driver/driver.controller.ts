import { Request, Response } from "express";
import { DriverService } from "../../services/driver/driver.service";

export class DriverController {
  static async me(req: Request, res: Response) {
    const userId = req.user!.userId;

    const user = await DriverService.getMe(userId);

    if (!user) {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }

    return res.json(user);
  }
}
