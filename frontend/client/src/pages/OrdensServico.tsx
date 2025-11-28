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
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  ClipboardCheck,
  DollarSign,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ParceiroSidebar from "@/components/ParceiroSidebar";
import { Menu } from "lucide-react";

type OrdemServico = {
  id: string;
  numero: string;
  cliente: string;
  veiculo: string;
  telefone: string;
  dataAbertura: string;
  dataConclusao?: string;
  status: "Em Andamento" | "Concluída" | "Aguardando Peças" | "Aguardando Aprovação" | "Cancelada";
  temChecklist: boolean;
  temOrcamento: boolean;
  descricao: string;
  servicos: string[];
  valorTotal?: number;
};

export default function OrdensServico() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modalNovaOS, setModalNovaOS] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [osSelecionada, setOsSelecionada] = useState<OrdemServico | null>(null);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalChecklist, setModalChecklist] = useState(false);
  const [modalOrcamento, setModalOrcamento] = useState(false);

  // Dados do formulário de nova OS
  const [novaOS, setNovaOS] = useState({
    cliente: "",
    veiculo: "",
    telefone: "",
    descricao: "",
    temChecklist: false,
    temOrcamento: false,
  });

  const oficinaNome = "Auto Center Silva";

  const handleLogout = () => {
    setLocation("/");
  };

  // Dados mockados de ordens de serviço
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([
    {
      id: "1",
      numero: "#2024-0523",
      cliente: "João Silva",
      veiculo: "VW Gol 1.6 - ABC-1234",
      telefone: "(11) 98765-4321",
      dataAbertura: "2024-11-10",
      status: "Em Andamento",
      temChecklist: true,
      temOrcamento: true,
      descricao: "Troca de óleo e filtros + revisão geral",
      servicos: ["Troca de óleo", "Filtro de ar", "Filtro de combustível"],
      valorTotal: 450.0,
    },
    {
      id: "2",
      numero: "#2024-0524",
      cliente: "Maria Santos",
      veiculo: "Fiat Uno 1.0 - XYZ-5678",
      telefone: "(11) 91234-5678",
      dataAbertura: "2024-11-08",
      dataConclusao: "2024-11-09",
      status: "Concluída",
      temChecklist: true,
      temOrcamento: false,
      descricao: "Alinhamento e balanceamento",
      servicos: ["Alinhamento", "Balanceamento"],
      valorTotal: 180.0,
    },
    {
      id: "3",
      numero: "#2024-0525",
      cliente: "Pedro Costa",
      veiculo: "Chevrolet Onix 1.4 - DEF-9012",
      telefone: "(11) 99876-5432",
      dataAbertura: "2024-11-05",
      status: "Aguardando Peças",
      temChecklist: false,
      temOrcamento: true,
      descricao: "Troca de pastilhas de freio",
      servicos: ["Pastilhas de freio dianteiras", "Pastilhas de freio traseiras"],
      valorTotal: 650.0,
    },
    {
      id: "4",
      numero: "#2024-0526",
      cliente: "Ana Oliveira",
      veiculo: "Honda Civic 2020 - GHI-3456",
      telefone: "(11) 97654-3210",
      dataAbertura: "2024-11-02",
      dataConclusao: "2024-11-03",
      status: "Concluída",
      temChecklist: true,
      temOrcamento: true,
      descricao: "Revisão dos 10.000 km",
      servicos: ["Troca de óleo", "Filtros", "Velas"],
      valorTotal: 850.0,
    },
    {
      id: "5",
      numero: "#2024-0527",
      cliente: "Carlos Mendes",
      veiculo: "Toyota Corolla 2019 - JKL-7890",
      telefone: "(11) 96543-2109",
      dataAbertura: "2024-11-12",
      status: "Aguardando Aprovação",
      temChecklist: true,
      temOrcamento: true,
      descricao: "Reparo de suspensão e troca de amortecedores",
      servicos: ["Amortecedores dianteiros", "Amortecedores traseiros", "Alinhamento"],
      valorTotal: 1250.0,
    },
  ]);

  // Filtrar ordens de serviço
  const osFiltradas = ordensServico.filter((os) => {
    const matchStatus = filtroStatus === "todos" || os.status === filtroStatus;
    const matchBusca =
      os.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      os.numero.toLowerCase().includes(busca.toLowerCase()) ||
      os.veiculo.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  // Estatísticas
  const stats = {
    total: ordensServico.length,
    emAndamento: ordensServico.filter((os) => os.status === "Em Andamento").length,
    concluidas: ordensServico.filter((os) => os.status === "Concluída").length,
    aguardandoPecas: ordensServico.filter((os) => os.status === "Aguardando Peças").length,
  };

  const getStatusColor = (status: OrdemServico["status"]) => {
    switch (status) {
      case "Em Andamento":
        return "bg-blue-100 text-blue-700 border-blue-500";
      case "Concluída":
        return "bg-green-100 text-green-700 border-green-500";
      case "Aguardando Peças":
        return "bg-orange-100 text-orange-700 border-orange-500";
      case "Aguardando Aprovação":
        return "bg-purple-100 text-purple-700 border-purple-500";
      case "Cancelada":
        return "bg-red-100 text-red-700 border-red-500";
      default:
        return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  const getStatusIcon = (status: OrdemServico["status"]) => {
    switch (status) {
      case "Em Andamento":
        return <Clock className="h-4 w-4" />;
      case "Concluída":
        return <CheckCircle className="h-4 w-4" />;
      case "Aguardando Peças":
        return <AlertCircle className="h-4 w-4" />;
      case "Aguardando Aprovação":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleCriarOS = () => {
    // Validação: deve ter pelo menos checklist ou orçamento
    if (!novaOS.temChecklist && !novaOS.temOrcamento) {
      toast.error("A ordem de serviço deve ter pelo menos um Checklist ou Orçamento!");
      return;
    }

    if (!novaOS.cliente || !novaOS.veiculo || !novaOS.descricao) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    // Criar nova OS
    const novaOrdem: OrdemServico = {
      id: String(ordensServico.length + 1),
      numero: `#2024-${String(527 + ordensServico.length).padStart(4, "0")}`,
      cliente: novaOS.cliente,
      veiculo: novaOS.veiculo,
      telefone: novaOS.telefone,
      dataAbertura: new Date().toISOString().split("T")[0],
      status: "Em Andamento",
      temChecklist: novaOS.temChecklist,
      temOrcamento: novaOS.temOrcamento,
      descricao: novaOS.descricao,
      servicos: [],
    };

    setOrdensServico([novaOrdem, ...ordensServico]);
    setModalNovaOS(false);
    setNovaOS({
      cliente: "",
      veiculo: "",
      telefone: "",
      descricao: "",
      temChecklist: false,
      temOrcamento: false,
    });
    toast.success("Ordem de serviço criada com sucesso!");
  };

  const handleExcluirOS = () => {
    if (osSelecionada) {
      setOrdensServico(ordensServico.filter((os) => os.id !== osSelecionada.id));
      setModalExcluir(false);
      setOsSelecionada(null);
      toast.success("Ordem de serviço excluída com sucesso!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <ParceiroSidebar oficinaNome={oficinaNome} activePath="/ordens-servico" />
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
                <span className="text-2xl font-bold text-[#1E40AF]">Driv</span>
                <span className="text-2xl font-bold text-[#F97316]">Hub</span>
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

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Drawer */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="right" className="w-64 p-0 lg:hidden">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menu de Navegação</SheetTitle>
                  </SheetHeader>
                  <ParceiroSidebar oficinaNome={oficinaNome} activePath="/ordens-servico" />
                </SheetContent>
              </Sheet>

              {/* Desktop - Nome do Estabelecimento */}
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
          <span className="text-gray-600">Ordens de Serviço</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ordens de Serviço</h1>
            <p className="text-gray-600">
              Gerencie todas as ordens de serviço da sua oficina
            </p>
          </div>
          <Button
            onClick={() => setModalNovaOS(true)}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova OS
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600 mt-1">Total de OS</div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="text-gray-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.emAndamento}</div>
                <div className="text-sm text-gray-600 mt-1">Em Andamento</div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.concluidas}</div>
                <div className="text-sm text-gray-600 mt-1">Concluídas</div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.aguardandoPecas}</div>
                <div className="text-sm text-gray-600 mt-1">Aguardando Peças</div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="text-orange-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar por cliente, número da OS ou veículo..."
                  className="pl-10"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Concluída">Concluída</SelectItem>
                <SelectItem value="Aguardando Peças">Aguardando Peças</SelectItem>
                <SelectItem value="Aguardando Aprovação">Aguardando Aprovação</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabela de Ordens de Serviço */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Checklist</TableHead>
                <TableHead className="text-center">Orçamento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {osFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    Nenhuma ordem de serviço encontrada
                  </TableCell>
                </TableRow>
              ) : (
                osFiltradas.map((os) => (
                  <TableRow key={os.id}>
                    <TableCell className="font-medium">{os.numero}</TableCell>
                    <TableCell>{os.cliente}</TableCell>
                    <TableCell>{os.veiculo}</TableCell>
                    <TableCell>
                      {new Date(os.dataAbertura).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(os.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(os.status)}
                          {os.status}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {os.temChecklist ? (
                        <button
                          onClick={() => {
                            setOsSelecionada(os);
                            setModalChecklist(true);
                          }}
                          className="inline-flex items-center justify-center hover:bg-gray-100 rounded p-1 transition-colors"
                        >
                          <ClipboardCheck className="h-5 w-5 text-green-600" />
                        </button>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {os.temOrcamento ? (
                        <button
                          onClick={() => {
                            setOsSelecionada(os);
                            setModalOrcamento(true);
                          }}
                          className="inline-flex items-center justify-center hover:bg-gray-100 rounded p-1 transition-colors"
                        >
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </button>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-[#1E40AF]">
                      {os.valorTotal ? `R$ ${os.valorTotal.toFixed(2)}` : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setOsSelecionada(os);
                            setModalDetalhes(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setOsSelecionada(os);
                            setModalExcluir(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Modal: Nova Ordem de Serviço */}
      <Dialog open={modalNovaOS} onOpenChange={setModalNovaOS}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Ordem de Serviço</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar uma nova ordem de serviço. É obrigatório ter pelo menos um Checklist ou Orçamento.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Nome do cliente"
                  value={novaOS.cliente}
                  onChange={(e) => setNovaOS({ ...novaOS, cliente: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 98765-4321"
                  value={novaOS.telefone}
                  onChange={(e) => setNovaOS({ ...novaOS, telefone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="veiculo">Veículo *</Label>
              <Input
                id="veiculo"
                placeholder="Ex: Honda Civic 2020 - ABC-1234"
                value={novaOS.veiculo}
                onChange={(e) => setNovaOS({ ...novaOS, veiculo: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição do Serviço *</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva os serviços a serem realizados..."
                rows={4}
                value={novaOS.descricao}
                onChange={(e) => setNovaOS({ ...novaOS, descricao: e.target.value })}
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm font-medium text-orange-900 mb-3">
                Documentos Obrigatórios (selecione pelo menos um):
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="checklist"
                    checked={novaOS.temChecklist}
                    onCheckedChange={(checked) =>
                      setNovaOS({ ...novaOS, temChecklist: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="checklist"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Checklist de Inspeção
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="orcamento"
                    checked={novaOS.temOrcamento}
                    onCheckedChange={(checked) =>
                      setNovaOS({ ...novaOS, temOrcamento: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="orcamento"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Orçamento
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalNovaOS(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCriarOS}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white"
            >
              Criar Ordem de Serviço
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Detalhes da OS */}
      <Dialog open={modalDetalhes} onOpenChange={setModalDetalhes}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Ordem de Serviço</DialogTitle>
          </DialogHeader>
          {osSelecionada && (
            <div className="space-y-6">
              {/* Número e Status */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">Número da OS</p>
                  <p className="text-2xl font-bold text-gray-900">{osSelecionada.numero}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(osSelecionada.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(osSelecionada.status)}
                    {osSelecionada.status}
                  </span>
                </Badge>
              </div>

              {/* Informações do Cliente */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Informações do Cliente</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nome</p>
                    <p className="font-medium text-gray-900">{osSelecionada.cliente}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="font-medium text-gray-900">{osSelecionada.telefone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Veículo</p>
                    <p className="font-medium text-gray-900">{osSelecionada.veiculo}</p>
                  </div>
                </div>
              </div>

              {/* Datas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Data de Abertura</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(osSelecionada.dataAbertura).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                {osSelecionada.dataConclusao && (
                  <div>
                    <p className="text-sm text-gray-600">Data de Conclusão</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(osSelecionada.dataConclusao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
              </div>

              {/* Descrição */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Descrição do Serviço</h4>
                <p className="text-gray-700">{osSelecionada.descricao}</p>
              </div>

              {/* Documentos */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Documentos Vinculados</h4>
                <div className="flex gap-4">
                  {osSelecionada.temChecklist && (
                    <div className="flex items-center gap-2 text-green-700">
                      <ClipboardCheck className="h-5 w-5" />
                      <span className="text-sm font-medium">Checklist</span>
                    </div>
                  )}
                  {osSelecionada.temOrcamento && (
                    <div className="flex items-center gap-2 text-blue-700">
                      <DollarSign className="h-5 w-5" />
                      <span className="text-sm font-medium">Orçamento</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Valor Total */}
              {osSelecionada.valorTotal && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-lg font-semibold text-gray-900">Valor Total</span>
                  <span className="text-2xl font-bold text-[#1E40AF]">
                    R$ {osSelecionada.valorTotal.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Confirmar Exclusão */}
      <Dialog open={modalExcluir} onOpenChange={setModalExcluir}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a ordem de serviço{" "}
              <strong>{osSelecionada?.numero}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalExcluir(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleExcluirOS}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Checklist */}
      <Dialog open={modalChecklist} onOpenChange={setModalChecklist}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1E40AF]">
              Checklist - OS {osSelecionada?.numero}
            </DialogTitle>
            <DialogDescription>
              {osSelecionada?.cliente} - {osSelecionada?.veiculo}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-semibold">{osSelecionada?.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Veículo</p>
                  <p className="font-semibold">{osSelecionada?.veiculo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data de Abertura</p>
                  <p className="font-semibold">
                    {osSelecionada?.dataAbertura && new Date(osSelecionada.dataAbertura).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold">{osSelecionada?.status}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Itens do Checklist</h3>
              <div className="space-y-2">
                {[
                  "Verificar nível de óleo",
                  "Checar pressão dos pneus",
                  "Testar funcionamento dos freios",
                  "Inspecionar sistema de suspensão",
                  "Verificar filtros de ar e combustível",
                  "Checar bateria e sistema elétrico",
                  "Inspecionar correias e mangueiras",
                  "Verificar fluido de freio",
                  "Testar luzes e sinalização",
                  "Verificar alinhamento e balanceamento",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                    <div className="flex items-center justify-center w-5 h-5 rounded bg-green-100">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Observações</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                Veículo em bom estado geral. Todos os itens verificados estão dentro dos padrões recomendados pelo fabricante.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalChecklist(false)}>
              Fechar
            </Button>
            <Button className="bg-[#1E40AF] hover:bg-[#1E3A8A]">
              <FileText className="h-4 w-4 mr-2" />
              Imprimir Checklist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Orçamento */}
      <Dialog open={modalOrcamento} onOpenChange={setModalOrcamento}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F97316]">
              Orçamento - OS {osSelecionada?.numero}
            </DialogTitle>
            <DialogDescription>
              {osSelecionada?.cliente} - {osSelecionada?.veiculo}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-semibold">{osSelecionada?.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Veículo</p>
                  <p className="font-semibold">{osSelecionada?.veiculo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="font-semibold">{osSelecionada?.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data</p>
                  <p className="font-semibold">
                    {osSelecionada?.dataAbertura && new Date(osSelecionada.dataAbertura).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Serviços e Peças</h3>
              <div className="space-y-3">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Troca de Óleo e Filtro</p>
                      <p className="text-sm text-gray-600">Inclui óleo sintético 5W30 e filtro original</p>
                    </div>
                    <p className="font-semibold text-[#1E40AF]">R$ 280,00</p>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Revisão de Freios</p>
                      <p className="text-sm text-gray-600">Troca de pastilhas dianteiras e fluido de freio</p>
                    </div>
                    <p className="font-semibold text-[#1E40AF]">R$ 450,00</p>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Alinhamento e Balanceamento</p>
                      <p className="text-sm text-gray-600">Serviço completo com equipamento computadorizado</p>
                    </div>
                    <p className="font-semibold text-[#1E40AF]">R$ 120,00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">R$ 850,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mão de Obra</span>
                  <span className="font-semibold">R$ 200,00</span>
                </div>
                <div className="border-t border-blue-200 pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-[#F97316]">
                    R$ {osSelecionada?.valorTotal?.toFixed(2) || "1.050,00"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Observações</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                Orçamento válido por 7 dias. Garantia de 90 dias para peças e serviços. Prazo de execução: 2 dias úteis.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOrcamento(false)}>
              Fechar
            </Button>
            <Button className="bg-[#F97316] hover:bg-[#EA580C]">
              <FileText className="h-4 w-4 mr-2" />
              Enviar Orçamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
