import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bell,
  Car,
  ChevronRight,
  ChevronDown,
  Download,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  Phone,
  Search,
  Settings,
  Trash2,
  User,
  UserPlus,
  X,
  BarChart3,
  Users,
  Calendar,
  FileText,
  CheckSquare,
  ClipboardList,
  MessageSquare,
  Wallet,
  History,
} from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ParceiroSidebar from "@/components/ParceiroSidebar";

export default function CadastroCliente() {
  const [, setLocation] = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const oficinaNome = "Auto Center Silva";
  
  const handleLogout = () => {
    setLocation("/");
  };

  // Form state
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

  // Mock data
  const [clientes] = useState([
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@email.com",
      marca: "Volkswagen",
      modelo: "Gol",
      ano: "2020",
      cor: "Preto",
      placa: "ABC-1234",
      dataCadastro: "18/10/2024",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Maria Santos",
      telefone: "(11) 91234-5678",
      email: "maria.santos@email.com",
      marca: "Fiat",
      modelo: "Uno",
      ano: "2019",
      cor: "Branco",
      placa: "XYZ-5678",
      dataCadastro: "17/10/2024",
      status: "Ativo",
    },
  ]);

  const marcas = ["Volkswagen", "Fiat", "Chevrolet", "Ford", "Toyota", "Honda", "Hyundai", "Nissan"];
  const cores = ["Preto", "Branco", "Prata", "Vermelho", "Azul", "Cinza", "Verde"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
    // Validação básica
    if (!formData.nomeCompleto || !formData.telefone || !formData.email || !formData.marca || !formData.placa) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    toast.success("✅ Cliente cadastrado com sucesso!");
    handleLimpar();
  };



  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <ParceiroSidebar oficinaNome={oficinaNome} activePath="/clientes/novo" />
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Mobile Only */}
            <Link href="/dashboard" className="lg:hidden">
              <span className="cursor-pointer">
                <span className="text-2xl font-bold text-[#1E40AF]">Driv</span><span className="text-2xl font-bold text-[#F97316]">Hub</span>
              </span>
            </Link>
            {/* Right Side */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setLocation("/notificacoes")}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button - Posicionado à direita da notificação */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Desktop - Nome do Estabelecimento (após notificação) */}
              <div className="hidden lg:block h-8 w-px bg-gray-300"></div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">{oficinaNome}</p>
                  <p className="text-xs text-gray-500">Plano Basic</p>
                </div>
              </div>

              {/* Mobile Menu Drawer - Abre na direita */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="right" className="w-64 p-0 lg:hidden">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menu de Navegação</SheetTitle>
                  </SheetHeader>
                  <ParceiroSidebar oficinaNome={oficinaNome} activePath="/clientes/novo" />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setLocation("/dashboard")} className="text-[#1E40AF] hover:underline">
            Dashboard
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Cadastro de Cliente</span>
        </div>

        {/* Seção 1: Cadastro Rápido */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Cadastro Rápido de Cliente</h1>
            <p className="text-gray-600">Cadastre o cliente e vincule o veículo para começar a usar nossos serviços</p>
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            {/* Dados do Cliente */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4 pb-2 border-b">
                Informações do Cliente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Ex: João da Silva"
                      value={formData.nomeCompleto}
                      onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone/WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="email"
                      placeholder="cliente@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enviaremos notificações para este e-mail</p>
                </div>
              </div>
            </div>

            {/* Dados do Veículo */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4 pb-2 border-b">
                Informações do Veículo
              </h3>
              <div className="space-y-4">
                {/* Linha 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                      <Select value={formData.marca} onValueChange={(value) => handleInputChange("marca", value)}>
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
                      onChange={(e) => handleInputChange("modelo", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Ex: 2020"
                      value={formData.ano}
                      onChange={(e) => handleInputChange("ano", e.target.value)}
                    />
                  </div>
                </div>

                {/* Linha 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor <span className="text-red-500">*</span>
                    </label>
                    <Select value={formData.cor} onValueChange={(value) => handleInputChange("cor", value)}>
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
                      onChange={(e) => handleInputChange("motor", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placa <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="ABC-1234 ou ABC1D23"
                      value={formData.placa}
                      onChange={(e) => handleInputChange("placa", e.target.value.toUpperCase())}
                      className="uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleLimpar} className="gap-2">
                <X size={16} /> Limpar
              </Button>
              <Button onClick={handleCadastrar} className="bg-[#1E40AF] hover:bg-[#1E3B8F] text-white gap-2">
                <UserPlus size={16} /> Cadastrar Cliente
              </Button>
            </div>
          </div>
        </div>

        {/* Seção 2: Tabela de Clientes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Clientes Cadastrados</h2>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                {clientes.length}
              </span>
            </div>
            <Button variant="outline" className="gap-2">
              <Download size={16} /> Exportar
            </Button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Buscar por nome, telefone, e-mail ou placa..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="todas">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as marcas</SelectItem>
                {marcas.map((marca) => (
                  <SelectItem key={marca} value={marca}>
                    {marca}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="todos">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os períodos</SelectItem>
                <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                <SelectItem value="ano">Este ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <Checkbox />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">E-mail</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Veículo</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Placa</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Data Cadastro</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{cliente.nome}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone size={12} /> {cliente.telefone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{cliente.email}</td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {cliente.marca} {cliente.modelo}
                        </div>
                        <div className="text-sm text-gray-600">
                          {cliente.ano} • {cliente.cor}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-900 rounded-md font-mono text-sm">
                        {cliente.placa}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{cliente.dataCadastro}</td>
                    <td className="px-4 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {cliente.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm">
                        <Menu size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards Mobile */}
          <div className="md:hidden space-y-4">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="border rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1E40AF] rounded-full flex items-center justify-center text-white font-bold">
                      {cliente.nome.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{cliente.nome}</div>
                      <div className="text-sm text-gray-600">{cliente.telefone}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {cliente.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} /> {cliente.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Car size={14} /> {cliente.marca} {cliente.modelo} - {cliente.placa}
                  </div>
                  <div className="text-gray-600">
                    {cliente.ano} • {cliente.cor}
                  </div>
                  <div className="text-gray-500 text-xs">Cadastrado em {cliente.dataCadastro}</div>
                </div>
                <div className="flex gap-2 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Menu size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t">
            <div className="text-sm text-gray-600">Exibindo 1-{clientes.length} de {clientes.length} clientes</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-[#1E40AF] text-white">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

