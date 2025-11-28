import { Request, Response } from "express";
import { WorkshopService } from "../../services/workshop/workshop.service";

export class WorkshopController {
  static async me(req: Request, res: Response) {
    const userId = req.user!.userId;

    const user = await WorkshopService.getMe(userId);

    if (!user) {
      return res.status(404).json({ message: "Oficina não encontrada" });
    }

    return res.json(user);
  }
}
