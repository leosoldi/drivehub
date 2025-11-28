import { Request, Response } from "express";
import { AuthService } from "../../services/auth/auth.service";

export class AuthController {
  static async googleLogin(req: Request, res: Response) {
    try {
      const { idToken, userType } = req.body;

      if (!idToken || !userType) {
        return res
          .status(400)
          .json({ message: "idToken e userType são obrigatórios" });
      }

      const result = await AuthService.googleLogin({
        idToken,
        userType,
      });

      return res.json(result);
    } catch (err) {
      console.error("Erro no login Google:", err);
      return res
        .status(401)
        .json({ message: "Falha na autenticação com Google" });
    }
  }
}
