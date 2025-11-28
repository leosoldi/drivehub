import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

export default function Login() {
  const [, setLocation] = useLocation();
  const { loginGoogle, loginPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [motoristaEmail, setMotoristaEmail] = useState("");
  const [motoristaPassword, setMotoristaPassword] = useState("");
  const [parceiroEmail, setParceiroEmail] = useState("");
  const [parceiroPassword, setParceiroPassword] = useState("");
  const [parceiroService, setParceiroService] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleMotoristaLogin = async () => {
    if (!motoristaEmail || !motoristaPassword) {
      alert("Por favor, preencha email e senha");
      return;
    }

    try {
      const { redirectPath } = await loginPassword({
        email: motoristaEmail,
        password: motoristaPassword,
        userType: "MOTORISTA",
      });

      setLocation(redirectPath);
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao fazer login de motorista"
      );
    }
  };

  const handleParceiroLogin = async () => {
    if (!parceiroEmail || !parceiroPassword) {
      alert("Por favor, preencha email e senha");
      return;
    }

    try {
      const { redirectPath } = await loginPassword({
        email: parceiroEmail,
        password: parceiroPassword,
        userType: "OFICINA",
      });

      setLocation(redirectPath);
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao fazer login do parceiro"
      );
    }
  };

  async function signInWithGoogle(userType: "MOTORISTA" | "OFICINA") {
    if (!googleClientId) {
      alert("Client ID do Google não configurado (VITE_GOOGLE_CLIENT_ID).");
      return;
    }

    if (!window.google?.accounts?.id) {
      alert(
        "SDK do Google ainda não carregou. Tente novamente em alguns segundos."
      );
      return;
    }

    setLoadingGoogle(true);

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async (response: any) => {
        try {
          const credential = response.credential as string | undefined;

          if (!credential) {
            alert("Não foi possível obter o token do Google.");
            return;
          }

          const { redirectPath } = await loginGoogle({
            idToken: credential,
            userType,
          });

          setLocation(redirectPath);
        } catch (err) {
          console.error(err);
          alert("Erro ao fazer login com Google.");
        } finally {
          setLoadingGoogle(false);
        }
      },
    });

    // Abre o seletor de conta / one-tap
    window.google.accounts.id.prompt((notification: any) => {
      // Se o usuário fechar o prompt ou ele não for exibido, liberamos o botão novamente
      if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
        setLoadingGoogle(false);
      }
    });
  }

  async function handleGoogleLoginMotorista() {
    await signInWithGoogle("MOTORISTA");
  }

  async function handleGoogleLoginParceiro() {
    await signInWithGoogle("OFICINA");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1E40AF]/[0.03]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => setLocation("/")}
              className="text-2xl font-bold tracking-tight"
              aria-label="DrivHub Home"
            >
              <span className="text-[#1E40AF]">Driv</span>
              <span className="text-[#F97316]">Hub</span>
            </button>

            {/* Botão Cadastre-se */}
            <Button
              className="bg-[#F97316] text-white hover:bg-[#EA580C] transition-all"
              onClick={() => setLocation("/cadastro")}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Tabs defaultValue="motorista" className="w-full">
            {/* Card Container */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Abas */}
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-0 h-auto rounded-none">
                <TabsTrigger
                  value="motorista"
                  className="rounded-none py-4 text-base font-semibold data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white data-[state=active]:border-b-4 data-[state=active]:border-[#1E40AF] data-[state=inactive]:text-gray-600"
                >
                  Motorista
                </TabsTrigger>
                <TabsTrigger
                  value="parceiro"
                  className="rounded-none py-4 text-base font-semibold data-[state=active]:bg-[#F97316] data-[state=active]:text-white data-[state=active]:border-b-4 data-[state=active]:border-[#F97316] data-[state=inactive]:text-gray-600"
                >
                  Parceiro
                </TabsTrigger>
              </TabsList>

              {/* Motorista */}
              <TabsContent value="motorista" className="p-8 space-y-6 m-0">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Bem-vindo de volta!
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Acesse agora e encontre os melhores serviços automotivos
                    perto de você!
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motorista-email">Email</Label>
                  <Input
                    id="motorista-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={motoristaEmail}
                    onChange={e => setMotoristaEmail(e.target.value)}
                    className="h-12 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motorista-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="motorista-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={motoristaPassword}
                      onChange={e => setMotoristaPassword(e.target.value)}
                      className="h-12 pr-10 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button className="text-sm text-[#1E40AF] hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>

                <Button
                  onClick={handleMotoristaLogin}
                  className="w-full h-12 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-base font-semibold"
                >
                  Entrar
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OU</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium"
                  onClick={handleGoogleLoginMotorista}
                  disabled={loadingGoogle}
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loadingGoogle ? "Conectando..." : "Entrar com Google"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <button
                    onClick={() => setLocation("/cadastro")}
                    className="text-[#1E40AF] font-bold hover:underline"
                  >
                    Cadastre-se
                  </button>
                </p>
              </TabsContent>

              {/* Parceiro */}
              <TabsContent value="parceiro" className="p-8 space-y-6 m-0">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Bem-vindo, Parceiro!
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Gerencie seu negócio e alcance milhares de motoristas na sua
                    região!
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parceiro-service">Tipo de Serviço</Label>
                  <Select
                    value={parceiroService}
                    onValueChange={setParceiroService}
                  >
                    <SelectTrigger
                      id="parceiro-service"
                      className="h-12 focus:border-[#F97316] focus:ring-[#F97316]"
                    >
                      <SelectValue placeholder="Selecione seu serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oficina">Oficina Mecânica</SelectItem>
                      <SelectItem value="autopecas">Autopeças</SelectItem>
                      <SelectItem value="guincho">Guincho</SelectItem>
                      <SelectItem value="lavarapido">Lava-rápido</SelectItem>
                      <SelectItem value="estetica">
                        Estética Automotiva
                      </SelectItem>
                      <SelectItem value="estacionamento">
                        Estacionamento
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parceiro-email">Email</Label>
                  <Input
                    id="parceiro-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={parceiroEmail}
                    onChange={e => setParceiroEmail(e.target.value)}
                    className="h-12 focus:border-[#F97316] focus:ring-[#F97316]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parceiro-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="parceiro-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={parceiroPassword}
                      onChange={e => setParceiroPassword(e.target.value)}
                      className="h-12 pr-10 focus:border-[#F97316] focus:ring-[#F97316]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button className="text-sm text-[#F97316] hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>

                <Button
                  onClick={handleParceiroLogin}
                  className="w-full h-12 bg-[#F97316] hover:bg-[#EA580C] text-white text-base font-semibold"
                >
                  Entrar como Parceiro
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OU</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium"
                  onClick={handleGoogleLoginParceiro}
                  disabled={loadingGoogle}
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loadingGoogle ? "Conectando..." : "Entrar com Google"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <button
                    onClick={() => setLocation("/cadastro")}
                    className="text-[#F97316] font-bold hover:underline"
                  >
                    Cadastre-se como Parceiro
                  </button>
                </p>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
