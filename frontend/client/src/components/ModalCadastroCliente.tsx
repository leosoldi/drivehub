import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Phone, Mail, Car, X, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ModalCadastroClienteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModalCadastroCliente({ open, onOpenChange }: ModalCadastroClienteProps) {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    email: "",
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    motor: "",
    placa: "",
  });

  const marcas = [
    "Chevrolet",
    "Fiat",
    "Ford",
    "Honda",
    "Hyundai",
    "Nissan",
    "Renault",
    "Toyota",
    "Volkswagen",
  ];

  const cores = [
    "Branco",
    "Preto",
    "Prata",
    "Cinza",
    "Vermelho",
    "Azul",
    "Verde",
    "Amarelo",
    "Marrom",
  ];

  const handleLimpar = () => {
    setFormData({
      nomeCompleto: "",
      telefone: "",
      email: "",
      marca: "",
      modelo: "",
      ano: "",
      cor: "",
      motor: "",
      placa: "",
    });
  };

  const handleCadastrar = () => {
    // Validação
    if (!formData.nomeCompleto || !formData.telefone || !formData.email) {
      toast.error("Por favor, preencha todas as informações do cliente.");
      return;
    }

    if (!formData.marca || !formData.modelo || !formData.ano || !formData.cor || !formData.motor || !formData.placa) {
      toast.error("Por favor, preencha todas as informações do veículo.");
      return;
    }

    // Validação de e-mail básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação de placa (formato brasileiro)
    const placaRegex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!placaRegex.test(formData.placa.toUpperCase())) {
      toast.error("Por favor, insira uma placa válida (ex: ABC-1234 ou ABC1D23).");
      return;
    }

    toast.success("✅ Cliente e veículo cadastrados com sucesso!");
    onOpenChange(false);
    handleLimpar();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold">
            Cadastro Rápido de Cliente
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Cadastre o cliente e vincule o veículo para começar a usar nossos serviços
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* SEÇÃO 1: INFORMAÇÕES DO CLIENTE */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Informações do Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Ex: João da Silva"
                    value={formData.nomeCompleto}
                    onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone/WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="pl-10"
                    maxLength={15}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="cliente@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enviaremos notificações para este e-mail
                </p>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: INFORMAÇÕES DO VEÍCULO */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Informações do Veículo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Select value={formData.marca} onValueChange={(value) => setFormData({ ...formData, marca: value })}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {marcas.map((marca) => (
                        <SelectItem key={marca} value={marca}>
                          {marca}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: Gol, Civic, Corolla"
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: 2020"
                  value={formData.ano}
                  onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                  maxLength={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor <span className="text-red-500">*</span>
                </label>
                <Select value={formData.cor} onValueChange={(value) => setFormData({ ...formData, cor: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {cores.map((cor) => (
                      <SelectItem key={cor} value={cor}>
                        {cor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motor <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: 1.6, 2.0"
                  value={formData.motor}
                  onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placa <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="ABC-1234 OU ABC1D23"
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  className="uppercase"
                  maxLength={8}
                />
              </div>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleLimpar}
              className="gap-2"
            >
              <X size={16} /> Limpar
            </Button>
            <Button
              onClick={handleCadastrar}
              className="bg-[#1E40AF] hover:bg-[#1E3B8F] text-white gap-2"
            >
              <UserPlus size={16} /> Cadastrar Cliente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
