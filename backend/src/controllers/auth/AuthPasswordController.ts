import { Request, Response } from "express";
import { AuthPasswordService } from "../../services/auth/AuthPasswordService";

export class AuthPasswordController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      const result = await AuthPasswordService.login({
        email,
        password,
        role,
      });

      return res.json(result);
    } catch (err: any) {
      console.error(err);
      return res
        .status(401)
        .json({ error: err.message || "Não foi possível fazer login." });
    }
  }
}
