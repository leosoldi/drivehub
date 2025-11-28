import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  Wrench,
  Car,
  UserPlus,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type HistoricoItem = {
  id: string;
  tipo: "OS" | "Agendamento" | "Orçamento" | "Cliente" | "Checklist";
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  status: "Concluído" | "Cancelado" | "Em Andamento";
  cliente?: string;
  valor?: number;
};

export default function HistoricoParceiro() {
  const [, setLocation] = useLocation();
  const [notificationCount] = useState(3);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState("7dias");
  const [busca, setBusca] = useState("");

  const oficinaNome = "Auto Center Silva";

  const handleLogout = () => {
    setLocation("/");
  };

  // Mock data - histórico de atividades
  const historico: HistoricoItem[] = [
    {
      id: "1",
      tipo: "OS",
      titulo: "OS #2024-0530 Concluída",
      descricao: "Troca de óleo e filtros - Honda Civic",
      data: "17/11/2024",
      hora: "16:45",
      status: "Concluído",
      cliente: "Carlos Mendes",
      valor: 450.00,
    },
    {
      id: "2",
      tipo: "Agendamento",
      titulo: "Novo Agendamento Criado",
      descricao: "Revisão dos 20.000km - Toyota Corolla",
      data: "17/11/2024",
      hora: "14:30",
      status: "Em Andamento",
      cliente: "Ana Paula",
    },
    {
      id: "3",
      tipo: "Orçamento",
      titulo: "Orçamento Enviado",
      descricao: "Troca de pastilhas de freio - VW Gol",
      data: "17/11/2024",
      hora: "11:20",
      status: "Em Andamento",
      cliente: "João Silva",
      valor: 680.00,
    },
    {
      id: "4",
      tipo: "Cliente",
      titulo: "Novo Cliente Cadastrado",
      descricao: "Maria Santos - (41) 99999-8888",
      data: "16/11/2024",
      hora: "18:15",
      status: "Concluído",
      cliente: "Maria Santos",
    },
    {
      id: "5",
      tipo: "Checklist",
      titulo: "Checklist Realizado",
      descricao: "Inspeção completa - Fiat Uno",
      data: "16/11/2024",
      hora: "15:50",
      status: "Concluído",
      cliente: "Pedro Costa",
    },
    {
      id: "6",
      tipo: "OS",
      titulo: "OS #2024-0529 Concluída",
      descricao: "Alinhamento e balanceamento - Chevrolet Onix",
      data: "16/11/2024",
      hora: "13:30",
      status: "Concluído",
      cliente: "Roberto Lima",
      valor: 180.00,
    },
    {
      id: "7",
      tipo: "Agendamento",
      titulo: "Agendamento Cancelado",
      descricao: "Troca de pneus - Ford Ka",
      data: "15/11/2024",
      hora: "10:00",
      status: "Cancelado",
      cliente: "Fernanda Souza",
    },
    {
      id: "8",
      tipo: "Orçamento",
      titulo: "Orçamento Aprovado",
      descricao: "Reparo de suspensão - Hyundai HB20",
      data: "15/11/2024",
      hora: "09:15",
      status: "Concluído",
      cliente: "Lucas Oliveira",
      valor: 1250.00,
    },
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "OS":
        return <FileText className="h-5 w-5" />;
      case "Agendamento":
        return <Calendar className="h-5 w-5" />;
      case "Orçamento":
        return <DollarSign className="h-5 w-5" />;
      case "Cliente":
        return <UserPlus className="h-5 w-5" />;
      case "Checklist":
        return <ClipboardCheck className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "OS":
        return "bg-blue-100 text-blue-700";
      case "Agendamento":
        return "bg-green-100 text-green-700";
      case "Orçamento":
        return "bg-purple-100 text-purple-700";
      case "Cliente":
        return "bg-orange-100 text-orange-700";
      case "Checklist":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Concluído":
        return <CheckCircle className="h-4 w-4" />;
      case "Cancelado":
        return <XCircle className="h-4 w-4" />;
      case "Em Andamento":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "text-green-600 bg-green-50";
      case "Cancelado":
        return "text-red-600 bg-red-50";
      case "Em Andamento":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const historicoFiltrado = historico.filter((item) => {
    const matchTipo = filtroTipo === "todos" || item.tipo.toLowerCase() === filtroTipo.toLowerCase();
    const matchBusca = busca === "" || 
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      (item.cliente && item.cliente.toLowerCase().includes(busca.toLowerCase()));
    return matchTipo && matchBusca;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard">
              <span className="cursor-pointer">
                <span className="text-2xl font-bold text-[#1E40AF]">Driv</span><span className="text-2xl font-bold text-[#F97316]">Hub</span>
              </span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-4">
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

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="hidden md:inline font-medium">
                      {oficinaNome}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setLocation("/perfil")}>
                    <User className="mr-2 h-4 w-4" />
                    Meu Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/configuracoes")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/ajuda")}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Ajuda
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button onClick={() => setLocation("/dashboard")} className="text-[#1E40AF] hover:underline">
            Dashboard
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Histórico</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Atividades</h1>
          <p className="text-gray-600">
            Acompanhe todas as atividades realizadas na sua oficina
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Buscar
              </label>
              <Input
                placeholder="Buscar por cliente, descrição..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tipo de Atividade
              </label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="os">Ordens de Serviço</SelectItem>
                  <SelectItem value="agendamento">Agendamentos</SelectItem>
                  <SelectItem value="orçamento">Orçamentos</SelectItem>
                  <SelectItem value="cliente">Clientes</SelectItem>
                  <SelectItem value="checklist">Checklists</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Período
              </label>
              <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {historicoFiltrado.map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getTipoColor(item.tipo)} flex items-center justify-center`}>
                  {getTipoIcon(item.tipo)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.titulo}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.descricao}</p>
                      {item.cliente && (
                        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.cliente}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.data}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.hora}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="outline" className={`${getStatusColor(item.status)} border-0`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </Badge>
                    {item.valor && (
                      <span className="text-sm font-semibold text-[#1E40AF]">
                        R$ {item.valor.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {historicoFiltrado.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma atividade encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros para ver mais resultados
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
