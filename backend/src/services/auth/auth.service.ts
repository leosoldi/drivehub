import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(env.googleClientId);

interface GoogleLoginInput {
  idToken: string;
  userType: "MOTORISTA" | "OFICINA";
}

export class AuthService {
  static async googleLogin({ idToken, userType }: GoogleLoginInput) {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      throw new Error("Token do Google inválido");
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name ?? null;
    const picture = payload.picture ?? null;

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId }, { email }],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          name,
          avatarUrl: picture,
          role: userType,
          ...(userType === "MOTORISTA"
            ? { driver: { create: {} } }
            : { workshop: { create: {} } }),
        },
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    const redirectPath =
      user.role === "OFICINA" ? "/dashboard" : "/dashboard-motorista";

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
      redirectPath,
    };
  }
}
