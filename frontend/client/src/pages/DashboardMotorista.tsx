import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle,
  Wrench,
  AlertTriangle,
  DollarSign,
  Search,
  Calendar,
  ClipboardList,
  Car,
  Clock,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  FileText,
  TrendingUp,
  Eye,
  File,
  Menu,
  Home,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardMotorista() {
  const [location, setLocation] = useLocation();
  const [notificationCount] = useState(3);
  const [modalOrcamentoOpen, setModalOrcamentoOpen] = useState(false);
  const [modalNotificacoesOpen, setModalNotificacoesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dados mockados
  const userName = "João da Silva";
  const stats = {
    servicosRealizados: 8,
    pecasTrocadas: 12,
    revisoesPendentes: 5,
    totalGasto: 4524.0,
  };

  // Dados do veículo selecionado
  const veiculoSelecionado = {
    modelo: "Honda Civic EXL",
    cor: "Preto",
    ano: "2022",
    placa: "ABC-1234",
    foto: "/car-default.png",
  };

  // Notificações e Alertas
  const notificacoesAlertas = [
    {
      data: "25/01/2025",
      categoria: "Agendamento",
      descricao: "Seu Agendamento está próximo",
      prioridade: "Alta",
      veiculo: "Honda Civic EXL - ABC-1234",
    },
    {
      data: "25/01/2025",
      categoria: "Orçamento",
      descricao: "Tem Orçamento te esperando",
      prioridade: "Média",
      veiculo: "Honda Civic EXL - ABC-1234",
    },
    {
      data: "20/01/2025",
      categoria: "Revisão",
      descricao: "Seu Civic está próximo dos 10.000 km",
      prioridade: "Alta",
      veiculo: "Honda Civic EXL - ABC-1234",
    },
    {
      data: "15/01/2025",
      categoria: "IPVA",
      descricao: "Vencimento do IPVA em 15 dias",
      prioridade: "Média",
      veiculo: "Honda Civic EXL - ABC-1234",
    },
  ];

  // Histórico de Serviços
  const historicoServicos = [
    {
      data: "06/11/2024",
      estabelecimento: "Oficina João",
      veiculo: "Gol 1.6 - ABC-1234",
      servico: "Disco de Freio",
      valor: 400.0,
    },
    {
      data: "28/10/2024",
      estabelecimento: "Auto Center Silva",
      veiculo: "Civic EXL - ABC-1234",
      servico: "Troca de Óleo",
      valor: 250.0,
    },
    {
      data: "15/10/2024",
      estabelecimento: "Mecânica Central",
      veiculo: "Gol 1.6 - ABC-1234",
      servico: "Alinhamento e Balanceamento",
      valor: 180.0,
    },
    {
      data: "02/10/2024",
      estabelecimento: "Oficina João",
      veiculo: "Civic EXL - ABC-1234",
      servico: "Pastilha de Freio",
      valor: 320.0,
    },
  ];

  const acoesRapidas = [
    {
      icon: Search,
      title: "Buscar Serviço",
      description: "Busque seus serviço",
      color: "text-blue-600",
      hoverColor: "hover:border-blue-600",
      link: "/buscar",
    },
    {
      icon: Calendar,
      title: "Agendamento",
      description: "Organize seus Agendamentos",
      color: "text-orange-600",
      hoverColor: "hover:border-orange-600",
      link: "/agendamentos-motorista",
    },
    {
      icon: ClipboardList,
      title: "Orçamento",
      description: "Solicite orçamentos de serviços",
      color: "text-green-600",
      hoverColor: "hover:border-green-600",
      link: "/solicitacao-orcamento",
    },
    {
      icon: Car,
      title: "Meus Veículos",
      description: "Gerencie seus veículos",
      color: "text-green-600",
      hoverColor: "hover:border-green-600",
      link: "/meus-veiculos",
    },
    {
      icon: Clock,
      title: "Histórico",
      description: "Ver histórico completo",
      color: "text-gray-700",
      hoverColor: "hover:border-gray-700",
      link: "/historico",
    },
  ];

  const handleLogout = () => {
    // Implementar lógica de logout
    setLocation("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo DrivHub - Desktop / Informações do Usuário - Mobile */}
      <div className="px-6 py-6 border-b">
        {/* Desktop: Logo DrivHub */}
        <div className="hidden lg:flex items-center justify-center">
          <span className="text-3xl font-bold">
            <span className="text-[#1E40AF]">Driv</span>
            <span className="text-[#F97316]">Hub</span>
          </span>
        </div>
        {/* Mobile: Informações do Usuário */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 text-base">{userName}</p>
            <p className="text-sm text-gray-500">Motorista</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 py-6 overflow-y-auto">
        {/* 1. Visão Geral */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/dashboard-motorista"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/dashboard-motorista");
                setMobileMenuOpen(false);
              }}
            >
              <Home className="h-5 w-5" />
              Visão Geral
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visão geral do dashboard com estatísticas</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 2. Meus Veículos */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/meus-veiculos"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/meus-veiculos");
                setMobileMenuOpen(false);
              }}
            >
              <Car className="h-5 w-5" />
              Meus Veículos
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Gerenciar seus veículos cadastrados</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 3. Agendamentos */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/agendamentos-motorista"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/agendamentos-motorista");
                setMobileMenuOpen(false);
              }}
            >
              <Calendar className="h-5 w-5" />
              Agendamentos
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visualizar e gerenciar seus agendamentos</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 4. Buscar Serviços */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/buscar"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/buscar");
                setMobileMenuOpen(false);
              }}
            >
              <Search className="h-5 w-5" />
              Buscar Serviços
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Encontrar oficinas e serviços automotivos</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 5. Orçamentos */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/solicitacao-orcamento"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/solicitacao-orcamento");
                setMobileMenuOpen(false);
              }}
            >
              <FileText className="h-5 w-5" />
              Orçamentos
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visualizar e gerenciar orçamentos recebidos</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 6. Histórico */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/historico"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/historico");
                setMobileMenuOpen(false);
              }}
            >
              <History className="h-5 w-5" />
              Histórico
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Histórico completo de serviços realizados</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 7. Meu Perfil */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                location === "/meu-perfil-motorista"
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setLocation("/meu-perfil-motorista");
                setMobileMenuOpen(false);
              }}
            >
              <User className="h-5 w-5" />
              Meu Perfil
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Gerenciar informações pessoais e veículos</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Logout Button at Bottom */}
      <div className="border-t p-6">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-14 text-base font-normal text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            handleLogout();
            setMobileMenuOpen(false);
          }}
        >
          <LogOut className="h-5 w-5" />
          Sair da conta
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="p-0 w-64">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu de Navegação</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Mobile Only */}
              <Link href="/dashboard-motorista" className="lg:hidden">
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

              {/* User Info - Desktop Only */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-base">{userName}</p>
                  <p className="text-sm text-gray-500">Motorista</p>
                </div>
              </div>

              {/* Menu Button - Mobile Only (Right Side) */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Seção de Boas-vindas */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-8 mb-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bem-vindo, <span className="text-blue-700">{userName}</span> 👋🏻
          </h1>
          <p className="text-lg text-gray-700">
            Gerencie a manutenção de seu veículo de maneira simples e eficiente.
          </p>
        </div>

        {/* Cards de Estatísticas (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Card 1: Serviços Realizados */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.servicosRealizados}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Serviços Realizados</div>
              </div>
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          {/* Card 2: Peças Trocadas */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.pecasTrocadas}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Peças Trocadas</div>
              </div>
              <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
                <Wrench className="text-orange-600" size={20} />
              </div>
            </div>
          </div>

          {/* Card 3: Revisões Pendentes */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.revisoesPendentes}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Revisões Pendentes</div>
              </div>
              <div className="p-2 md:p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>

          {/* Card 4: Total Gasto */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">R$ {stats.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Total Gasto</div>
              </div>
              <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Seção: Ações Rápidas */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {acoesRapidas.map((acao, index) => (
              <button
                key={index}
                onClick={() => setLocation(acao.link)}
                className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className={`${acao.color} mb-3 md:mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                  <acao.icon size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
                  {acao.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">{acao.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Seção: Notificações e Alertas */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Notificações e Alertas
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabela Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descrição</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {notificacoesAlertas.map((alerta, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900">{alerta.data}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {alerta.categoria}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{alerta.descricao}</td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setModalNotificacoesOpen(true)}
                        >
                          Ver mais
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards Mobile */}
            <div className="md:hidden divide-y divide-gray-200">
              {notificacoesAlertas.map((alerta, index) => (
                <div key={index} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                        {alerta.categoria}
                      </span>
                      <p className="text-xs text-gray-500">{alerta.data}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-900 mb-3">{alerta.descricao}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setModalNotificacoesOpen(true)}
                  >
                    Ver mais
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seção: Histórico Simples */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Histórico Simples
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabela Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estabelecimento</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Veículo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Serviço/Peça</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Valor</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {historicoServicos.map((servico, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900">{servico.data}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{servico.estabelecimento}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{servico.veiculo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{servico.servico}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.valor)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setModalOrcamentoOpen(true)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 transition-colors">
                            <File size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards Mobile */}
            <div className="md:hidden divide-y divide-gray-200">
              {historicoServicos.map((servico, index) => (
                <div key={index} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{servico.estabelecimento}</p>
                      <p className="text-xs text-gray-500">{servico.data}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.valor)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{servico.veiculo}</p>
                  <p className="text-sm text-gray-900 mb-3">{servico.servico}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setModalOrcamentoOpen(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={16} />
                      Visualizar
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                      <File size={16} />
                      Arquivo
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Ver Mais */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setLocation("/historico")}
              >
                Ver Mais
              </Button>
            </div>
          </div>
        </div>
      </main>

        {/* Modal de Orçamento */}
        <Dialog open={modalOrcamentoOpen} onOpenChange={setModalOrcamentoOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Detalhes do Serviço</DialogTitle>
            <DialogDescription>
              Visualize os detalhes do serviço realizado
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informações do Serviço */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Informações do Serviço</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Data</p>
                  <p className="font-medium text-gray-900">06/11/2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estabelecimento</p>
                  <p className="font-medium text-gray-900">Oficina João</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Veículo</p>
                  <p className="font-medium text-gray-900">Gol 1.6 - ABC-1234</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Serviço</p>
                  <p className="font-medium text-gray-900">Disco de Freio</p>
                </div>
              </div>
            </div>

            {/* Serviços e Peças */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Serviços e Peças</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Disco de freio dianteiro</p>
                    <p className="text-sm text-gray-600">Quantidade: 2</p>
                  </div>
                  <p className="font-semibold text-gray-900">R$ 280,00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Pastilhas de freio</p>
                    <p className="text-sm text-gray-600">Quantidade: 1</p>
                  </div>
                  <p className="font-semibold text-gray-900">R$ 120,00</p>
                </div>
              </div>
            </div>

            {/* Mão de Obra */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Mão de Obra</h3>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Troca de disco e pastilhas de freio</p>
                  <p className="font-semibold text-gray-900">R$ 150,00</p>
                </div>
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal Serviços/Peças:</span>
                  <span className="font-medium text-gray-900">R$ 400,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mão de Obra:</span>
                  <span className="font-medium text-gray-900">R$ 150,00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-[#1E40AF]">R$ 550,00</span>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Observações</h3>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Serviço realizado com sucesso. Recomenda-se revisar os freios a cada 10.000 km.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setModalOrcamentoOpen(false)}
            >
              Fechar
            </Button>
            <Button
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
              onClick={() => {
                toast.success("Arquivo baixado com sucesso!");
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Baixar Comprovante
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>

        {/* Modal de Notificações */}
        <Dialog open={modalNotificacoesOpen} onOpenChange={setModalNotificacoesOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Notificações e Alertas</DialogTitle>
            <DialogDescription>
              Visualize todas as suas notificações e alertas importantes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {notificacoesAlertas.map((alerta, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {alerta.categoria}
                    </span>
                    <span className="text-sm text-gray-500">{alerta.data}</span>
                  </div>
                  {alerta.prioridade === "Alta" && (
                    <Badge variant="destructive" className="text-xs">
                      Prioridade Alta
                    </Badge>
                  )}
                </div>
                <p className="text-gray-900 mb-2">{alerta.descricao}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Car className="h-4 w-4" />
                  <span>{alerta.veiculo}</span>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalNotificacoesOpen(false)}
            >
              Fechar
            </Button>
            <Button
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
              onClick={() => {
                toast.success("Todas as notificações foram marcadas como lidas!");
                setModalNotificacoesOpen(false);
              }}
            >
              Marcar Todas como Lidas
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
