// client/src/services/auth.ts
import { api, setAuthToken } from "./api";

export type UserRole = "MOTORISTA" | "OFICINA";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: UserRole;
}

// resposta padrão de autenticação
export interface AuthResponse {
  token: string;
  user: AuthUser;
  redirectPath: string; // ex: "/app/motorista" ou "/app/parceiro"
}

// aliases para sem quebrar nada que já exista
export type GoogleLoginResponse = AuthResponse;
export type PasswordLoginResponse = AuthResponse;

function persistSession(data: AuthResponse) {
  setAuthToken(data.token);
  localStorage.setItem("drivhub:token", data.token);
  localStorage.setItem("drivhub:user", JSON.stringify(data.user));
}

/**
 * Login com Google (já existente)
 */
export async function loginWithGoogle(
  idToken: string,
  userType: UserRole
): Promise<GoogleLoginResponse> {
  const { data } = await api.post<AuthResponse>("/auth/google", {
    idToken,
    userType,
  });

  persistSession(data);
  return data;
}

/**
 * Login manual com email + senha
 */
export async function loginWithPassword(params: {
  email: string;
  password: string;
  userType: UserRole;
}): Promise<PasswordLoginResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login/password", {
    email: params.email,
    password: params.password,
    role: params.userType, // casa com o backend
  });

  persistSession(data);
  return data;
}

export function logout() {
  localStorage.removeItem("drivhub:token");
  localStorage.removeItem("drivhub:user");
  setAuthToken(undefined);
}

export function restoreSession() {
  const token = localStorage.getItem("drivhub:token");
  const userRaw = localStorage.getItem("drivhub:user");

  if (!token || !userRaw) {
    return null;
  }

  try {
    const user = JSON.parse(userRaw) as AuthUser;
    setAuthToken(token);
    return { token, user };
  } catch {
    logout();
    return null;
  }
}

export const authService = {
  async cadastrarMotoristaManual(payload: {
    email: string;
    name?: string;
    password: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleYear: string;
    vehicleColor: string;
    vehicleEngine: string;
    vehiclePlate: string;
    vehicleChassis?: string;
  }) {
    const { data } = await api.post("/auth/register/driver-manual", payload);
    return data;
  },

  async cadastrarParceiroManual(payload: {
    email: string;
    name: string;
    password: string;
    cnpj: string;
    phone: string;
    cep: string;
    address: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
  }) {
    const { data } = await api.post("/auth/register/workshop-manual", payload);
    return data;
  },
};
