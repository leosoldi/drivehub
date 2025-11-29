import { useState, useEffect } from "react";
import { X, Car, Calendar, Palette, Settings, Hash, FileText, MapPin } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { api, setAuthToken } from "@/services/api";


interface CadastroVeiculoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  motor: string;
  placa: string;
  chassi: string;
  quilometragem: string;
  ipvaMes: string;
  ipvaAno: string;
  licenciamento: string;
  principal: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const MARCAS = [
  "Volkswagen",
  "Fiat",
  "Chevrolet",
  "Ford",
  "Toyota",
  "Honda",
  "Hyundai",
  "Nissan",
  "Renault",
  "Jeep",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Outro",
];

const CORES = [
  { value: "preto", label: "⚫ Preto" },
  { value: "branco", label: "⚪ Branco" },
  { value: "prata", label: "🔘 Prata/Cinza" },
  { value: "vermelho", label: "🔴 Vermelho" },
  { value: "azul", label: "🔵 Azul" },
  { value: "verde", label: "🟢 Verde" },
  { value: "amarelo", label: "🟡 Amarelo" },
  { value: "laranja", label: "🟠 Laranja" },
  { value: "marrom", label: "🟤 Marrom" },
  { value: "outro", label: "Outra" },
];

const MOTORES = ["1.0", "1.3", "1.4", "1.5", "1.6", "1.8", "2.0", "2.5", "3.0", "Outro"];

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CadastroVeiculoModal({
  isOpen,
  onClose,
  onSuccess,
}: CadastroVeiculoModalProps) {
  const [formData, setFormData] = useState<FormData>({
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    motor: "",
    placa: "",
    chassi: "",
    quilometragem: "",
    ipvaMes: "",
    ipvaAno: "",
    licenciamento: "",
    principal: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 + 1 }, (_, i) => currentYear + 1 - i);

  useEffect(() => {
    const hasData = Object.values(formData).some((value) => value !== "" && value !== false);
    setHasChanges(hasData);
  }, [formData]);

  const formatPlaca = (value: string): string => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      // Formato antigo: ABC-1234 ou Mercosul: ABC1D23
      const letters = cleaned.slice(0, 3);
      const rest = cleaned.slice(3);

      // Detectar se é Mercosul (tem letra na posição 4)
      if (rest.length >= 2 && /[A-Z]/.test(rest[1])) {
        return `${letters}${rest}`;
      } else {
        return `${letters}-${rest}`;
      }
    }
    return cleaned.slice(0, 7);
  };

  const formatChassi = (value: string): string => {
    return value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 17);
  };

  const validatePlaca = (placa: string): boolean => {
    const regexAntiga = /^[A-Z]{3}-\d{4}$/;
    const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    return regexAntiga.test(placa) || regexMercosul.test(placa);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "marca":
        return value ? "" : "Selecione a marca do veículo";
      case "modelo":
        return value.length >= 2 ? "" : "Informe o modelo do veículo";
      case "ano":
        return value ? "" : "Selecione o ano";
      case "cor":
        return value ? "" : "Selecione a cor";
      case "motor":
        return value ? "" : "Informe o motor";
      case "placa":
        if (!value) return "Informe a placa do veículo";
        return validatePlaca(value) ? "" : "Formato de placa inválido";
      case "chassi":
        if (value && value.length !== 17) return "Chassi deve ter 17 caracteres";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (typeof value === "string" && errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    const value = formData[name as keyof FormData];
    if (typeof value === "string") {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields = ["marca", "modelo", "ano", "cor", "motor", "placa"];

    requiredFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      if (typeof value === "string") {
        const error = validateField(field, value);
        if (error) newErrors[field] = error;
      }
    });

    // Validar campos opcionais se preenchidos
    if (formData.chassi) {
      const error = validateField("chassi", formData.chassi);
      if (error) newErrors.chassi = error;
    }

    setErrors(newErrors);

    // Scroll até primeiro erro
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      element?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Por favor, corrija os erros no formulário");
    return;
  }

  setIsLoading(true);

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado para cadastrar veículos.");
      return;
    }

    // seta token no Axios
    setAuthToken(token)

    // payload compatível com o backend
    const payload = {
      vehicleBrand: formData.marca,
      vehicleModel: formData.modelo,
      vehicleYear: formData.ano,
      vehicleColor: formData.cor,
      vehicleEngine: formData.motor,
      vehiclePlate: formData.placa,
      vehicleChassis: formData.chassi,
      vehicleMileage: formData.quilometragem,
      vehicleIpvaMonth: formData.ipvaMes,
      vehicleIpvaYear: formData.ipvaAno,
      vehicleLicensing: formData.licenciamento,
      isPrimaryVehicle: formData.principal,
    };

    await api.post("/vehicle", payload);

    toast.success("Veículo cadastrado com sucesso!");

    onSuccess?.();
    handleClose();

  } catch (error: any) {
    toast.error("Erro ao cadastrar veículo", {
      description: error.response?.data?.error || "Tente novamente.",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    if (hasChanges && !isLoading) {
      if (
        window.confirm(
          "Você tem alterações não salvas. Deseja realmente sair e descartar as alterações?"
        )
      ) {
        resetForm();
        onClose();
      }
    } else {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      marca: "",
      modelo: "",
      ano: "",
      cor: "",
      motor: "",
      placa: "",
      chassi: "",
      quilometragem: "",
      ipvaMes: "",
      ipvaAno: "",
      licenciamento: "",
      principal: false,
    });
    setErrors({});
    setHasChanges(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-right from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Cadastrar Novo Veículo</h2>
              </div>
              <p className="text-white/90 text-sm">Preencha os dados do seu veículo</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(85vh-180px)]">
          <div className="px-6 py-6 space-y-6">
            {/* Seção 1: Informações Básicas */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
                <Car className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Informações do Veículo</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Marca */}
                <div id="field-marca">
                  <Label htmlFor="marca" className="text-gray-700">
                    Marca <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.marca}
                    onValueChange={(value) => handleInputChange("marca", value)}
                  >
                    <SelectTrigger
                      id="marca"
                      className={`mt-1 h-12 ${errors.marca ? "border-red-500" : ""}`}
                      onBlur={() => handleBlur("marca")}
                    >
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {MARCAS.map((marca) => (
                        <SelectItem key={marca} value={marca}>
                          {marca}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.marca && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.marca}
                    </p>
                  )}
                </div>

                {/* Modelo */}
                <div id="field-modelo">
                  <Label htmlFor="modelo" className="text-gray-700">
                    Modelo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="modelo"
                    type="text"
                    placeholder="Ex: Gol, Civic, Corolla"
                    value={formData.modelo}
                    onChange={(e) => handleInputChange("modelo", e.target.value)}
                    onBlur={() => handleBlur("modelo")}
                    className={`mt-1 h-12 ${errors.modelo ? "border-red-500" : ""}`}
                  />
                  {errors.modelo && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.modelo}
                    </p>
                  )}
                </div>

                {/* Ano */}
                <div id="field-ano">
                  <Label htmlFor="ano" className="text-gray-700">
                    Ano <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.ano}
                    onValueChange={(value) => handleInputChange("ano", value)}
                  >
                    <SelectTrigger
                      id="ano"
                      className={`mt-1 h-12 ${errors.ano ? "border-red-500" : ""}`}
                      onBlur={() => handleBlur("ano")}
                    >
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ano && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.ano}
                    </p>
                  )}
                </div>

                {/* Cor */}
                <div id="field-cor">
                  <Label htmlFor="cor" className="text-gray-700">
                    Cor <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.cor}
                    onValueChange={(value) => handleInputChange("cor", value)}
                  >
                    <SelectTrigger
                      id="cor"
                      className={`mt-1 h-12 ${errors.cor ? "border-red-500" : ""}`}
                      onBlur={() => handleBlur("cor")}
                    >
                      <SelectValue placeholder="Selecione a cor" />
                    </SelectTrigger>
                    <SelectContent>
                      {CORES.map((cor) => (
                        <SelectItem key={cor.value} value={cor.value}>
                          {cor.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cor && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.cor}
                    </p>
                  )}
                </div>

                {/* Motor */}
                <div id="field-motor">
                  <Label htmlFor="motor" className="text-gray-700">
                    Motor <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.motor}
                    onValueChange={(value) => handleInputChange("motor", value)}
                  >
                    <SelectTrigger
                      id="motor"
                      className={`mt-1 h-12 ${errors.motor ? "border-red-500" : ""}`}
                      onBlur={() => handleBlur("motor")}
                    >
                      <SelectValue placeholder="Ex: 1.6" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOTORES.map((motor) => (
                        <SelectItem key={motor} value={motor}>
                          {motor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.motor && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.motor}
                    </p>
                  )}
                </div>

                {/* Placa */}
                <div id="field-placa">
                  <Label htmlFor="placa" className="text-gray-700">
                    Placa <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="placa"
                    type="text"
                    placeholder="ABC-1234 ou ABC1D23"
                    value={formData.placa}
                    onChange={(e) => handleInputChange("placa", formatPlaca(e.target.value))}
                    onBlur={() => handleBlur("placa")}
                    className={`mt-1 h-12 uppercase ${errors.placa ? "border-red-500" : ""}`}
                    maxLength={8}
                  />
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    ℹ️ Aceita formato antigo (ABC-1234) e Mercosul (ABC1D23)
                  </p>
                  {errors.placa && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.placa}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Divisor */}
            <div className="border-t border-gray-200 my-6" />

            {/* Seção 2: Informações Adicionais */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Informações Adicionais</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Chassi */}
                <div id="field-chassi">
                  <Label htmlFor="chassi" className="text-gray-700">
                    Chassi
                  </Label>
                  <Input
                    id="chassi"
                    type="text"
                    placeholder="17 caracteres"
                    value={formData.chassi}
                    onChange={(e) => handleInputChange("chassi", formatChassi(e.target.value))}
                    onBlur={() => handleBlur("chassi")}
                    className={`mt-1 h-12 font-mono uppercase ${errors.chassi ? "border-red-500" : ""}`}
                    maxLength={17}
                  />
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    ℹ️ Encontre no documento do veículo
                  </p>
                  {errors.chassi && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.chassi}
                    </p>
                  )}
                </div>

                {/* Quilometragem */}
                <div id="field-quilometragem">
                  <Label htmlFor="quilometragem" className="text-gray-700">
                    Quilometragem Atual
                  </Label>
                  <div className="relative">
                    <Input
                      id="quilometragem"
                      type="number"
                      placeholder="Ex: 45000"
                      value={formData.quilometragem}
                      onChange={(e) => handleInputChange("quilometragem", e.target.value)}
                      className="mt-1 h-12 pr-12"
                      min="0"
                      max="999999"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      km
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Informe a quilometragem atual do veículo
                  </p>
                </div>

                {/* IPVA */}
                <div id="field-ipva" className="md:col-span-1">
                  <Label className="text-gray-700">Vencimento do IPVA</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Select
                      value={formData.ipvaMes}
                      onValueChange={(value) => handleInputChange("ipvaMes", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {MESES.map((mes, index) => (
                          <SelectItem key={mes} value={(index + 1).toString()}>
                            {mes}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.ipvaAno}
                      onValueChange={(value) => handleInputChange("ipvaAno", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={currentYear.toString()}>{currentYear}</SelectItem>
                        <SelectItem value={(currentYear + 1).toString()}>
                          {currentYear + 1}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">O IPVA vence no mês final da placa</p>
                </div>

                {/* Licenciamento */}
                <div id="field-licenciamento">
                  <Label htmlFor="licenciamento" className="text-gray-700">
                    Licenciamento
                  </Label>
                  <Input
                    id="licenciamento"
                    type="date"
                    value={formData.licenciamento}
                    onChange={(e) => handleInputChange("licenciamento", e.target.value)}
                    className="mt-1 h-12"
                  />
                  <p className="text-gray-500 text-xs mt-1">Data de validade do licenciamento</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="principal"
                checked={formData.principal}
                onCheckedChange={(checked) => handleInputChange("principal", checked as boolean)}
              />
              <Label htmlFor="principal" className="text-sm text-gray-700 cursor-pointer">
                Definir como veículo principal
              </Label>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 sm:flex-none h-12 px-6"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 sm:flex-none h-12 px-8 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Salvando..." : "Salvar Veículo"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
