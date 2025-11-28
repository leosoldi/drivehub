import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Check, ChevronRight, Eye, EyeOff, Info } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

export default function Cadastro() {
  const [, setLocation] = useLocation();
  const { loginGoogle, loginPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Motorista state
  const [motoristaStep, setMotoristaStep] = useState(1);
  const [motoristaEmail, setMotoristaEmail] = useState("");
  const [motoristaEmailConfirm, setMotoristaEmailConfirm] = useState("");
  const [motoristaMarca, setMotoristaMarca] = useState("");
  const [motoristaModelo, setMotoristaModelo] = useState("");
  const [motoristaAno, setMotoristaAno] = useState("");
  const [motoristaCor, setMotoristaCor] = useState("");
  const [motoristaMotor, setMotoristaMotor] = useState("");
  const [motoristaPlaca, setMotoristaPlaca] = useState("");
  const [motoristaChassi, setMotoristaChassi] = useState("");
  const [motoristaPassword, setMotoristaPassword] = useState("");
  const [motoristaPasswordConfirm, setMotoristaPasswordConfirm] = useState("");
  const [motoristaTerms, setMotoristaTerms] = useState(false);

  // Parceiro state
  const [parceiroStep, setParceiroStep] = useState(1);
  const [parceiroEmail, setParceiroEmail] = useState("");
  const [parceiroEmailConfirm, setParceiroEmailConfirm] = useState("");
  const [parceiroNome, setParceiroNome] = useState("");
  const [parceiroCnpj, setParceiroCnpj] = useState("");
  const [parceiroTelefone, setParceiroTelefone] = useState("");
  const [parceiroCep, setParceiroCep] = useState("");
  const [parceiroEndereco, setParceiroEndereco] = useState("");
  const [parceiroNumero, setParceiroNumero] = useState("");
  const [parceiroComplemento, setParceiroComplemento] = useState("");
  const [parceiroCidade, setParceiroCidade] = useState("");
  const [parceiroEstado, setParceiroEstado] = useState("");
  const [parceiroPassword, setParceiroPassword] = useState("");
  const [parceiroPasswordConfirm, setParceiroPasswordConfirm] =
    useState("");
  const [parceiroTerms, setParceiroTerms] = useState(false);

  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const checkPasswordStrength = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return { hasMinLength, hasUpperCase, hasNumber };
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
          alert("Erro ao cadastrar/login com Google.");
        } finally {
          setLoadingGoogle(false);
        }
      },
    });

    window.google.accounts.id.prompt((notification: any) => {
      if (
        notification.isNotDisplayed?.() ||
        notification.isSkippedMoment?.()
      ) {
        setLoadingGoogle(false);
      }
    });
  }

  async function handleGoogleSignupMotorista() {
    await signInWithGoogle("MOTORISTA");
  }

  async function handleGoogleSignupParceiro() {
    await signInWithGoogle("OFICINA");
  }

  async function handleMotoristaSubmit() {
    if (!motoristaTerms) {
      alert("Você deve aceitar os termos de uso");
      return;
    }

    try {
      await authService.cadastrarMotoristaManual({
        email: motoristaEmail,
        name: undefined,
        password: motoristaPassword,
        vehicleBrand: motoristaMarca,
        vehicleModel: motoristaModelo,
        vehicleYear: motoristaAno,
        vehicleColor: motoristaCor,
        vehicleEngine: motoristaMotor,
        vehiclePlate: motoristaPlaca,
        vehicleChassis: motoristaChassi || undefined,
      });

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
          "Erro ao cadastrar motorista"
      );
    }
  }

  async function handleParceiroSubmit() {
    if (!parceiroTerms) {
      alert("Você deve aceitar os termos de uso");
      return;
    }

    try {
      await authService.cadastrarParceiroManual({
        email: parceiroEmail,
        name: parceiroNome,
        password: parceiroPassword,
        cnpj: parceiroCnpj,
        phone: parceiroTelefone,
        cep: parceiroCep,
        address: parceiroEndereco,
        number: parceiroNumero,
        complement: parceiroComplemento || undefined,
        city: parceiroCidade,
        state: parceiroEstado,
      });

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
          "Erro ao cadastrar parceiro"
      );
    }
  }

  const Stepper = ({
    currentStep,
    totalSteps,
    color,
  }: {
    currentStep: number;
    totalSteps: number;
    color: string;
  }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
    const stepLabels =
      color === "blue"
        ? ["Conta", "Veículo", "Senha"]
        : ["Conta", "Estabelecimento", "Localização", "Senha"];

    const visibleSteps = steps.filter(
      (step) => step >= currentStep && step <= currentStep + 1
    );

    return (
      <div className="py-6">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step < currentStep
                      ? `bg-${color} text-white`
                      : step === currentStep
                      ? `bg-${color} text-white`
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                  style={{
                    backgroundColor:
                      step <= currentStep
                        ? color === "blue"
                          ? "#1E40AF"
                          : "#F97316"
                        : undefined,
                  }}
                >
                  {step < currentStep ? <Check size={20} /> : step}
                </div>
                <span className="text-xs mt-1 text-gray-600 text-center">
                  {stepLabels[step - 1]}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 lg:w-16 h-1 mx-2 ${
                    step < currentStep ? `bg-${color}` : "bg-gray-300"
                  }`}
                  style={{
                    backgroundColor:
                      step < currentStep
                        ? color === "blue"
                          ? "#1E40AF"
                          : "#F97316"
                        : undefined,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center gap-4">
          <div className="text-sm text-gray-600 font-medium">
            Etapa {currentStep} de {totalSteps}
          </div>
          <div className="flex items-center justify-center">
            {visibleSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step < currentStep
                        ? `bg-${color} text-white`
                        : step === currentStep
                        ? `bg-${color} text-white`
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                    style={{
                      backgroundColor:
                        step <= currentStep
                          ? color === "blue"
                            ? "#1E40AF"
                            : "#F97316"
                          : undefined,
                    }}
                  >
                    {step < currentStep ? <Check size={20} /> : step}
                  </div>
                  <span className="text-xs mt-2 text-gray-600 text-center max-w-[80px]">
                    {stepLabels[step - 1]}
                  </span>
                </div>
                {index < visibleSteps.length - 1 && (
                  <div
                    className={`w-8 h-1 mx-3 ${
                      step < currentStep ? `bg-${color}` : "bg-gray-300"
                    }`}
                    style={{
                      backgroundColor:
                        step < currentStep
                          ? color === "blue"
                            ? "#1E40AF"
                            : "#F97316"
                          : undefined,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1E40AF]/[0.03]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => setLocation("/")}
              className="text-2xl font-bold tracking-tight"
              aria-label="DrivHub Home"
            >
              <span className="text-[#1E40AF]">Driv</span>
              <span className="text-[#F97316]">Hub</span>
            </button>

            <Button
              variant="outline"
              className="bg-transparent text-[#1E40AF] border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all"
              onClick={() => setLocation("/login")}
            >
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <Tabs defaultValue="motorista" className="w-full">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Tabs Header */}
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-0 h-auto rounded-none">
                <TabsTrigger
                  value="motorista"
                  className="rounded-none py-4 text-base font-semibold data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                  onClick={() => setMotoristaStep(1)}
                >
                  Motorista
                </TabsTrigger>
                <TabsTrigger
                  value="parceiro"
                  className="rounded-none py-4 text-base font-semibold data-[state=active]:bg-[#F97316] data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                  onClick={() => setParceiroStep(1)}
                >
                  Parceiro
                </TabsTrigger>
              </TabsList>

              {/* MOTORISTA CONTENT */}
              <TabsContent value="motorista" className="m-0">
                <Stepper
                  currentStep={motoristaStep}
                  totalSteps={3}
                  color="blue"
                />

                <div className="p-8">
                  {/* Etapa 1: Conta */}
                  {motoristaStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Criar sua conta
                      </h2>

                      <div className="space-y-2">
                        <Label htmlFor="motorista-email">Email</Label>
                        <Input
                          id="motorista-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={motoristaEmail}
                          onChange={(e) => setMotoristaEmail(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motorista-email-confirm">
                          Confirme seu Email
                        </Label>
                        <Input
                          id="motorista-email-confirm"
                          type="email"
                          placeholder="seu@email.com"
                          value={motoristaEmailConfirm}
                          onChange={(e) =>
                            setMotoristaEmailConfirm(e.target.value)
                          }
                          className="h-12"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">
                            OU
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full h-12"
                        onClick={handleGoogleSignupMotorista}
                        disabled={loadingGoogle}
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          viewBox="0 0 24 24"
                        >
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
                        {loadingGoogle
                          ? "Conectando..."
                          : "Cadastrar com Google"}
                      </Button>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => setMotoristaStep(2)}
                          disabled={
                            !motoristaEmail ||
                            !motoristaEmailConfirm ||
                            motoristaEmail !== motoristaEmailConfirm
                          }
                          className="bg-[#1E40AF] hover:bg-[#1E3A8A]"
                        >
                          Próximo{" "}
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Etapa 2: Veículo */}
                  {motoristaStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Dados do seu veículo
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="motorista-marca">Marca</Label>
                          <Select
                            value={motoristaMarca}
                            onValueChange={setMotoristaMarca}
                          >
                            <SelectTrigger
                              id="motorista-marca"
                              className="h-12"
                            >
                              <SelectValue placeholder="Ex: Volkswagen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="volkswagen">
                                Volkswagen
                              </SelectItem>
                              <SelectItem value="fiat">Fiat</SelectItem>
                              <SelectItem value="chevrolet">
                                Chevrolet
                              </SelectItem>
                              <SelectItem value="ford">Ford</SelectItem>
                              <SelectItem value="toyota">Toyota</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="motorista-modelo">Modelo</Label>
                          <Input
                            id="motorista-modelo"
                            placeholder="Ex: Gol"
                            value={motoristaModelo}
                            onChange={(e) =>
                              setMotoristaModelo(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="motorista-ano">Ano</Label>
                          <Input
                            id="motorista-ano"
                            type="number"
                            placeholder="Ex: 2020"
                            value={motoristaAno}
                            onChange={(e) =>
                              setMotoristaAno(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="motorista-cor">Cor</Label>
                          <Input
                            id="motorista-cor"
                            placeholder="Ex: Preto"
                            value={motoristaCor}
                            onChange={(e) =>
                              setMotoristaCor(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="motorista-motor">Motor</Label>
                          <Input
                            id="motorista-motor"
                            placeholder="Ex: 1.6"
                            value={motoristaMotor}
                            onChange={(e) =>
                              setMotoristaMotor(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="motorista-placa">Placa</Label>
                          <Input
                            id="motorista-placa"
                            placeholder="Ex: ABC-1234"
                            value={motoristaPlaca}
                            onChange={(e) =>
                              setMotoristaPlaca(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="motorista-chassi">
                            Chassi (Opcional)
                          </Label>
                          <Info size={16} className="text-gray-400" />
                        </div>
                        <Input
                          id="motorista-chassi"
                          placeholder="17 caracteres"
                          value={motoristaChassi}
                          onChange={(e) =>
                            setMotoristaChassi(e.target.value)
                          }
                          className="h-12"
                          maxLength={17}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setMotoristaStep(1)}
                          className="border-[#1E40AF] text-[#1E40AF]"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={() => setMotoristaStep(3)}
                          disabled={
                            !motoristaMarca ||
                            !motoristaModelo ||
                            !motoristaAno ||
                            !motoristaCor ||
                            !motoristaMotor ||
                            !motoristaPlaca
                          }
                          className="bg-[#1E40AF] hover:bg-[#1E3A8A]"
                        >
                          Próximo{" "}
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Etapa 3: Senha */}
                  {motoristaStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Proteja sua conta
                      </h2>

                      <div className="space-y-2">
                        <Label htmlFor="motorista-password">Senha</Label>
                        <div className="relative">
                          <Input
                            id="motorista-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 8 caracteres"
                            value={motoristaPassword}
                            onChange={(e) =>
                              setMotoristaPassword(e.target.value)
                            }
                            className="h-12 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motorista-password-confirm">
                          Confirmar Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="motorista-password-confirm"
                            type={
                              showConfirmPassword ? "text" : "password"
                            }
                            placeholder="Digite a senha novamente"
                            value={motoristaPasswordConfirm}
                            onChange={(e) =>
                              setMotoristaPasswordConfirm(e.target.value)
                            }
                            className="h-12 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        {(() => {
                          const strength =
                            checkPasswordStrength(motoristaPassword);
                          return (
                            <>
                              <div
                                className={
                                  strength.hasMinLength
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {strength.hasMinLength ? "✓" : "○"} Mínimo 8
                                caracteres
                              </div>
                              <div
                                className={
                                  strength.hasUpperCase
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {strength.hasUpperCase ? "✓" : "○"} Pelo menos
                                uma letra maiúscula
                              </div>
                              <div
                                className={
                                  strength.hasNumber
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {strength.hasNumber ? "✓" : "○"} Pelo menos um
                                número
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="motorista-terms"
                          checked={motoristaTerms}
                          onCheckedChange={(checked) =>
                            setMotoristaTerms(checked as boolean)
                          }
                        />
                        <label
                          htmlFor="motorista-terms"
                          className="text-sm text-gray-600 leading-tight cursor-pointer"
                        >
                          Aceito os{" "}
                          <button className="text-[#1E40AF] font-semibold hover:underline">
                            Termos de Uso
                          </button>{" "}
                          e{" "}
                          <button className="text-[#1E40AF] font-semibold hover:underline">
                            Política de Privacidade
                          </button>
                        </label>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setMotoristaStep(2)}
                          className="border-[#1E40AF] text-[#1E40AF]"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={handleMotoristaSubmit}
                          disabled={
                            !motoristaPassword ||
                            !motoristaPasswordConfirm ||
                            motoristaPassword !==
                              motoristaPasswordConfirm ||
                            !motoristaTerms
                          }
                          className="bg-[#1E40AF] hover:bg-[#1E3A8A] px-8"
                        >
                          Criar Conta
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* PARCEIRO CONTENT */}
              <TabsContent value="parceiro" className="m-0">
                <Stepper
                  currentStep={parceiroStep}
                  totalSteps={4}
                  color="orange"
                />

                <div className="p-8">
                  {/* Etapa 1: Conta */}
                  {parceiroStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Criar sua conta
                      </h2>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-email">Email</Label>
                        <Input
                          id="parceiro-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={parceiroEmail}
                          onChange={(e) => setParceiroEmail(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-email-confirm">
                          Confirme seu Email
                        </Label>
                        <Input
                          id="parceiro-email-confirm"
                          type="email"
                          placeholder="seu@email.com"
                          value={parceiroEmailConfirm}
                          onChange={(e) =>
                            setParceiroEmailConfirm(e.target.value)
                          }
                          className="h-12"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">
                            OU
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full h-12"
                        onClick={handleGoogleSignupParceiro}
                        disabled={loadingGoogle}
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          viewBox="0 0 24 24"
                        >
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
                        {loadingGoogle
                          ? "Conectando..."
                          : "Cadastrar com Google"}
                      </Button>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => setParceiroStep(2)}
                          disabled={
                            !parceiroEmail ||
                            !parceiroEmailConfirm ||
                            parceiroEmail !== parceiroEmailConfirm
                          }
                          className="bg-[#F97316] hover:bg-[#EA580C]"
                        >
                          Próximo{" "}
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Etapa 2: Estabelecimento */}
                  {parceiroStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Dados do estabelecimento
                      </h2>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-nome">
                          Nome do Estabelecimento
                        </Label>
                        <Input
                          id="parceiro-nome"
                          placeholder="Ex: Auto Center Silva"
                          value={parceiroNome}
                          onChange={(e) => setParceiroNome(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-cnpj">CNPJ</Label>
                        <Input
                          id="parceiro-cnpj"
                          placeholder="00.000.000/0000-00"
                          value={parceiroCnpj}
                          onChange={(e) => setParceiroCnpj(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-telefone">
                          Telefone/WhatsApp
                        </Label>
                        <Input
                          id="parceiro-telefone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          value={parceiroTelefone}
                          onChange={(e) =>
                            setParceiroTelefone(e.target.value)
                          }
                          className="h-12"
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setParceiroStep(1)}
                          className="border-[#F97316] text-[#F97316]"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={() => setParceiroStep(3)}
                          disabled={
                            !parceiroNome ||
                            !parceiroCnpj ||
                            !parceiroTelefone
                          }
                          className="bg-[#F97316] hover:bg-[#EA580C]"
                        >
                          Próximo{" "}
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Etapa 3: Localização */}
                  {parceiroStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Onde você está?
                      </h2>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-cep">CEP</Label>
                        <div className="flex gap-2">
                          <Input
                            id="parceiro-cep"
                            placeholder="00000-000"
                            value={parceiroCep}
                            onChange={(e) => setParceiroCep(e.target.value)}
                            className="h-12"
                          />
                          <Button variant="outline" className="h-12">
                            Buscar
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-endereco">Endereço</Label>
                        <Input
                          id="parceiro-endereco"
                          placeholder="Rua, Av., etc"
                          value={parceiroEndereco}
                          onChange={(e) =>
                            setParceiroEndereco(e.target.value)
                          }
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parceiro-numero">Número</Label>
                          <Input
                            id="parceiro-numero"
                            placeholder="123"
                            value={parceiroNumero}
                            onChange={(e) =>
                              setParceiroNumero(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="parceiro-complemento">
                            Complemento (Opcional)
                          </Label>
                          <Input
                            id="parceiro-complemento"
                            placeholder="Sala, bloco, etc"
                            value={parceiroComplemento}
                            onChange={(e) =>
                              setParceiroComplemento(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parceiro-cidade">Cidade</Label>
                          <Input
                            id="parceiro-cidade"
                            placeholder="Ex: Curitiba"
                            value={parceiroCidade}
                            onChange={(e) =>
                              setParceiroCidade(e.target.value)
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="parceiro-estado">Estado</Label>
                          <Select
                            value={parceiroEstado}
                            onValueChange={setParceiroEstado}
                          >
                            <SelectTrigger
                              id="parceiro-estado"
                              className="h-12"
                            >
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PR">PR</SelectItem>
                              <SelectItem value="SP">SP</SelectItem>
                              <SelectItem value="RJ">RJ</SelectItem>
                              <SelectItem value="MG">MG</SelectItem>
                              <SelectItem value="RS">RS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setParceiroStep(2)}
                          className="border-[#F97316] text-[#F97316]"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={() => setParceiroStep(4)}
                          disabled={
                            !parceiroCep ||
                            !parceiroEndereco ||
                            !parceiroNumero ||
                            !parceiroCidade ||
                            !parceiroEstado
                          }
                          className="bg-[#F97316] hover:bg-[#EA580C]"
                        >
                          Próximo{" "}
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Etapa 4: Senha */}
                  {parceiroStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Proteja sua conta
                      </h2>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-password">Senha</Label>
                        <div className="relative">
                          <Input
                            id="parceiro-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 8 caracteres"
                            value={parceiroPassword}
                            onChange={(e) =>
                              setParceiroPassword(e.target.value)
                            }
                            className="h-12 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parceiro-password-confirm">
                          Confirmar Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="parceiro-password-confirm"
                            type={
                              showConfirmPassword ? "text" : "password"
                            }
                            placeholder="Digite a senha novamente"
                            value={parceiroPasswordConfirm}
                            onChange={(e) =>
                              setParceiroPasswordConfirm(e.target.value)
                            }
                            className="h-12 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        {(() => {
                          const strength =
                            checkPasswordStrength(parceiroPassword);
                          return (
                            <>
                              <div
                                className={
                                  strength.hasMinLength
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {strength.hasMinLength ? "✓" : "○"} Mínimo 8
                                caracteres
                              </div>
                              <div
                                className={
                                  strength.hasUpperCase
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {strength.hasUpperCase ? "✓" : "○"} Pelo menos
                                uma letra maiúscula
                              </div>
                              <div
                                className={
                                  strength.hasNumber
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }
                              >
                                {strength.hasNumber ? "✓" : "○"} Pelo menos um
                                número
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="parceiro-terms"
                          checked={parceiroTerms}
                          onCheckedChange={(checked) =>
                            setParceiroTerms(checked as boolean)
                          }
                        />
                        <label
                          htmlFor="parceiro-terms"
                          className="text-sm text-gray-600 leading-tight cursor-pointer"
                        >
                          Aceito os{" "}
                          <button className="text-[#F97316] font-semibold hover:underline">
                            Termos de Uso
                          </button>{" "}
                          e{" "}
                          <button className="text-[#F97316] font-semibold hover:underline">
                            Política de Privacidade
                          </button>
                        </label>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setParceiroStep(3)}
                          className="border-[#F97316] text-[#F97316]"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={handleParceiroSubmit}
                          disabled={
                            !parceiroPassword ||
                            !parceiroPasswordConfirm ||
                            parceiroPassword !==
                              parceiroPasswordConfirm ||
                            !parceiroTerms
                          }
                          className="bg-[#F97316] hover:bg-[#EA580C] px-8"
                        >
                          Criar Conta
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
