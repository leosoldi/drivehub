import { useState, useEffect } from "react";
import { X, Car, FileText } from "lucide-react";
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
import { api } from "@/services/api";

interface Veiculo {
  id: number | string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  motor: string;
  placa: string;
  chassi?: string;
  quilometragem?: number;
  ipva?: {
    vencimento: string;
  };
  licenciamento?: {
    vencimento: string;
  };
  principal?: boolean;
}

interface EditarVeiculoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  veiculo: Veiculo | null;
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

export default function EditarVeiculoModal({
  isOpen,
  onClose,
  onSuccess,
  veiculo,
}: EditarVeiculoModalProps) {
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
  const [initialData, setInitialData] = useState<FormData | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 + 1 }, (_, i) => currentYear + 1 - i);

  useEffect(() => {
    if (veiculo && isOpen) {
      const ipvaMatch = veiculo.ipva?.vencimento.match(/(\w+)\/(\d{4})/);
      const ipvaMes = ipvaMatch ? (MESES.indexOf(ipvaMatch[1]) + 1).toString() : "";
      const ipvaAno = ipvaMatch ? ipvaMatch[2] : "";

      const licenciamentoDate = veiculo.licenciamento?.vencimento
        ? veiculo.licenciamento.vencimento.split("/").reverse().join("-")
        : "";

      const data = {
        marca: veiculo.marca,
        modelo: veiculo.modelo ?? "",
        ano: veiculo.ano ? veiculo.ano.toString() : "",
        cor: veiculo.cor.toLowerCase(),
        motor: veiculo.motor ?? "",
        placa: veiculo.placa ?? "",
        chassi: veiculo.chassi || "",
        quilometragem: veiculo.quilometragem?.toString() || "",
        ipvaMes,
        ipvaAno,
        licenciamento: licenciamentoDate,
        principal: veiculo.principal || false,
      };

      setFormData(data);
      setInitialData(data);
      setHasChanges(false);
    }
  }, [veiculo, isOpen]);

  useEffect(() => {
    if (initialData) {
      const changed = JSON.stringify(formData) !== JSON.stringify(initialData);
      setHasChanges(changed);
    }
  }, [formData, initialData]);

  const formatPlaca = (value: string): string => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) {
      const letters = cleaned.slice(0, 3);
      const rest = cleaned.slice(3);
      if (rest.length >= 2 && /[A-Z]/.test(rest[1])) return `${letters}${rest}`;
      return `${letters}-${rest}`;
    }
    return cleaned.slice(0, 7);
  };

  const formatChassi = (value: string): string =>
    value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 17);

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
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    const value = formData[name as keyof FormData];
    if (typeof value === "string") {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    ["marca", "modelo", "ano", "cor", "motor", "placa"].forEach((field) => {
      const value = formData[field as keyof FormData];
      if (typeof value === "string") {
        const error = validateField(field, value);
        if (error) newErrors[field] = error;
      }
    });
    if (formData.chassi) {
      const error = validateField("chassi", formData.chassi);
      if (error) newErrors.chassi = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    if (!veiculo?.id) {
      toast.error("Veículo inválido.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        vehicleBrand: formData.marca,
        vehicleModel: formData.modelo,
        vehicleYear: formData.ano,
        vehicleColor: formData.cor,
        vehicleEngine: formData.motor,
        vehiclePlate: formData.placa,
        vehicleChassis: formData.chassi || null,
        vehicleMileage: formData.quilometragem || null,
        vehicleIpvaMonth: formData.ipvaMes || null,
        vehicleIpvaYear: formData.ipvaAno || null,
        vehicleLicensingDate: formData.licenciamento || null,
        isPrimaryVehicle: formData.principal,
      };

      await api.put(`/vehicle/${veiculo.id}`, payload);

      toast.success("Veículo atualizado com sucesso!");
      onSuccess?.();
      handleClose();
    } catch (error: any) {
      toast.error("Erro ao atualizar veículo", {
        description: error.response?.data?.error || "Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (hasChanges && !isLoading) {
      if (window.confirm("Você tem alterações não salvas. Deseja realmente sair?")) {
        resetForm();
        onClose();
      }
    } else {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setErrors({});
    setHasChanges(false);
    setInitialData(null);
  };

  if (!isOpen || !veiculo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Editar Veículo</h2>
              </div>
              <p className="text-white/90 text-sm">
                Atualize os dados do seu {veiculo.marca} {veiculo.modelo}
              </p>
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(85vh-180px)]">
          <div className="px-6 py-6 space-y-6">

            {/* Seção 1 */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
                <Car className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Informações do Veículo</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Marca */}
                <div id="field-marca">
                  <Label htmlFor="marca">Marca *</Label>
                  <Select
                    value={formData.marca}
                    onValueChange={(value) => handleInputChange("marca", value)}
                  >
                    <SelectTrigger id="marca" className={errors.marca ? "border-red-500" : ""}>
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
                </div>

                {/* Modelo */}
                <div id="field-modelo">
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => handleInputChange("modelo", e.target.value)}
                    className={errors.modelo ? "border-red-500" : ""}
                  />
                </div>

                {/* Ano */}
                <div id="field-ano">
                  <Label htmlFor="ano">Ano *</Label>
                  <Select
                    value={formData.ano}
                    onValueChange={(value) => handleInputChange("ano", value)}
                  >
                    <SelectTrigger id="ano" className={errors.ano ? "border-red-500" : ""}>
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
                </div>

                {/* Cor */}
                <div id="field-cor">
                  <Label htmlFor="cor">Cor *</Label>
                  <Select
                    value={formData.cor}
                    onValueChange={(value) => handleInputChange("cor", value)}
                  >
                    <SelectTrigger id="cor" className={errors.cor ? "border-red-500" : ""}>
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
                </div>

                {/* Motor */}
                <div id="field-motor">
                  <Label htmlFor="motor">Motor *</Label>
                  <Select
                    value={formData.motor}
                    onValueChange={(value) => handleInputChange("motor", value)}
                  >
                    <SelectTrigger id="motor" className={errors.motor ? "border-red-500" : ""}>
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
                </div>

                {/* Placa */}
                <div id="field-placa">
                  <Label htmlFor="placa">Placa *</Label>
                  <Input
                    id="placa"
                    type="text"
                    value={formData.placa}
                    onChange={(e) => handleInputChange("placa", formatPlaca(e.target.value))}
                    className={`uppercase ${errors.placa ? "border-red-500" : ""}`}
                    maxLength={8}
                  />
                </div>

              </div>
            </div>

            <div className="border-t border-gray-200 my-6" />

            {/* Seção 2 */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Informações Adicionais</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Chassi */}
                <div id="field-chassi">
                  <Label htmlFor="chassi">Chassi</Label>
                  <Input
                    id="chassi"
                    type="text"
                    value={formData.chassi}
                    onChange={(e) => handleInputChange("chassi", formatChassi(e.target.value))}
                    className={errors.chassi ? "border-red-500" : ""}
                    maxLength={17}
                  />
                </div>

                {/* Quilometragem */}
                <div id="field-quilometragem">
                  <Label htmlFor="quilometragem">Quilometragem</Label>
                  <Input
                    id="quilometragem"
                    type="number"
                    value={formData.quilometragem}
                    onChange={(e) => handleInputChange("quilometragem", e.target.value)}
                  />
                </div>

                {/* IPVA */}
                <div id="field-ipva">
                  <Label>IPVA</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Select
                      value={formData.ipvaMes}
                      onValueChange={(value) => handleInputChange("ipvaMes", value)}
                    >
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                </div>

                {/* Licenciamento */}
                <div id="field-licenciamento">
                  <Label htmlFor="licenciamento">Licenciamento</Label>
                  <Input
                    id="licenciamento"
                    type="date"
                    value={formData.licenciamento}
                    onChange={(e) => handleInputChange("licenciamento", e.target.value)}
                  />
                </div>

              </div>
            </div>

          </div>
        </form>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <Checkbox
                id="principal"
                checked={formData.principal}
                onCheckedChange={(checked) =>
                  handleInputChange("principal", checked as boolean)
                }
              />
              <Label htmlFor="principal">Definir como principal</Label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </Button>

              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !hasChanges}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
