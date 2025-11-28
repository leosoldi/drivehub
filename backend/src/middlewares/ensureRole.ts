import { Request, Response, NextFunction } from "express";

export function ensureRole(role: "MOTORISTA" | "OFICINA") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acesso negado para este perfil" });
    }

    return next();
  };
}
