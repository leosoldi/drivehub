import "dotenv/config";

export const env = {
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
};
