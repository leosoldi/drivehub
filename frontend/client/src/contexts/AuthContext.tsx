// client/src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type {
  AuthUser,
  UserRole,
  GoogleLoginResponse,
  PasswordLoginResponse,
} from "@/services/auth";
import {
  loginWithGoogle,
  loginWithPassword,
  restoreSession,
  logout as authLogout,
} from "@/services/auth";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  loginGoogle: (params: {
    idToken: string;
    userType: UserRole;
  }) => Promise<GoogleLoginResponse>;

  loginPassword: (params: {
    email: string;
    password: string;
    userType: UserRole;
  }) => Promise<PasswordLoginResponse>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // restaura sessão se tiver algo no localStorage
  useEffect(() => {
    const session = restoreSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
    setLoading(false);
  }, []);

  async function loginGoogleFn({
    idToken,
    userType,
  }: {
    idToken: string;
    userType: UserRole;
  }): Promise<GoogleLoginResponse> {
    const data = await loginWithGoogle(idToken, userType);

    setUser(data.user);
    setToken(data.token);

    // data já contém redirectPath
    return data;
  }

  async function loginPasswordFn({
    email,
    password,
    userType,
  }: {
    email: string;
    password: string;
    userType: UserRole;
  }): Promise<PasswordLoginResponse> {
    const data = await loginWithPassword({
      email,
      password,
      userType,
    });

    setUser(data.user);
    setToken(data.token);

    // data também contém redirectPath
    return data;
  }

  function logout() {
    authLogout();
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        loginGoogle: loginGoogleFn,
        loginPassword: loginPasswordFn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
