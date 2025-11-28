import { Request, Response } from "express";
import { AuthManualService } from "../../services/auth/AuthManualService";

export class AuthManualController {
  static async registerDriver(req: Request, res: Response) {
    try {
      const user = await AuthManualService.registerDriver(req.body);
      return res.status(201).json({ user });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro ao cadastrar motorista." });
    }
  }

  static async registerWorkshop(req: Request, res: Response) {
    try {
      const user = await AuthManualService.registerWorkshop(req.body);
      return res.status(201).json({ user });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro ao cadastrar oficina." });
    }
  }
}
