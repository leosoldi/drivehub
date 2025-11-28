import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bell,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Clock,
  DollarSign,
  Eye,
  ExternalLink,
  FileText,
  Flag,
  HelpCircle,
  LogOut,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
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
import { Menu } from "lucide-react";

interface ItemServico {
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

interface ItemMaoObra {
  descricao: string;
  valor: number;
}

export default function CriarOrcamento() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const oficinaNome = "Auto Center Silva";

  const handleLogout = () => {
    setLocation("/");
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSolicitacaoOpen, setModalSolicitacaoOpen] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<typeof solicitacoesOrcamento[0] | null>(null);
  const [respostaOrcamento, setRespostaOrcamento] = useState("");
  
  // Estados do modal de resposta
  const [itensRespostaServico, setItensRespostaServico] = useState<ItemServico[]>([]);
  const [itensRespostaMaoObra, setItensRespostaMaoObra] = useState<ItemMaoObra[]>([]);
  const [observacoesResposta, setObservacoesResposta] = useState("");
  const [descontoResposta, setDescontoResposta] = useState(0);
  const [validadeResposta, setValidadeResposta] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriodo, setFilterPeriodo] = useState("Últimos 7 dias");
  const [filterStatus, setFilterStatus] = useState("Todos");
  
  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentPageOrcamentos, setCurrentPageOrcamentos] = useState(1);
  const itemsPerPageOrcamentos = 5;

  // Form state
  const [placa, setPlaca] = useState("");
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(false);
  const [itensServico, setItensServico] = useState<ItemServico[]>([]);
  const [itensMaoObra, setItensMaoObra] = useState<ItemMaoObra[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [validade, setValidade] = useState("");

  // Mock data solicitações de orçamento
  const solicitacoesOrcamento = [
    { id: "#SOL-2024-001", cliente: "João Silva", telefone: "(11) 98765-4321", veiculo: "VW Gol 1.6", placa: "ABC-1234", servico: "Troca de óleo e filtros", data: "24/10/2024", status: "Pendente", statusCor: "bg-yellow-100 text-yellow-700" },
    { id: "#SOL-2024-002", cliente: "Maria Santos", telefone: "(11) 97654-3210", veiculo: "Fiat Uno 1.0", placa: "XYZ-5678", servico: "Revisão completa", data: "24/10/2024", status: "Em Análise", statusCor: "bg-blue-100 text-blue-700" },
    { id: "#SOL-2024-003", cliente: "Pedro Costa", telefone: "(11) 96543-2109", veiculo: "Chevrolet Onix 1.4", placa: "DEF-9012", servico: "Alinhamento e balanceamento", data: "23/10/2024", status: "Respondido", statusCor: "bg-green-100 text-green-700" },
    { id: "#SOL-2024-004", cliente: "Ana Oliveira", telefone: "(11) 95432-1098", veiculo: "Honda Civic 2.0", placa: "GHI-3456", servico: "Troca de pastilhas de freio", data: "23/10/2024", status: "Pendente", statusCor: "bg-yellow-100 text-yellow-700" },
    { id: "#SOL-2024-005", cliente: "Carlos Mendes", telefone: "(11) 94321-0987", veiculo: "Toyota Corolla 1.8", placa: "JKL-7890", servico: "Revisão de suspensão", data: "22/10/2024", status: "Em Análise", statusCor: "bg-blue-100 text-blue-700" },
    { id: "#SOL-2024-006", cliente: "Fernanda Lima", telefone: "(11) 93210-9876", veiculo: "Ford Ka 1.0", placa: "MNO-1234", servico: "Troca de bateria", data: "22/10/2024", status: "Respondido", statusCor: "bg-green-100 text-green-700" },
    { id: "#SOL-2024-007", cliente: "Roberto Alves", telefone: "(11) 92109-8765", veiculo: "Hyundai HB20 1.6", placa: "PQR-5678", servico: "Alinhamento e balanceamento", data: "21/10/2024", status: "Pendente", statusCor: "bg-yellow-100 text-yellow-700" },
    { id: "#SOL-2024-008", cliente: "Juliana Rocha", telefone: "(11) 91098-7654", veiculo: "Renault Sandero 1.6", placa: "STU-9012", servico: "Troca de óleo e filtros", data: "21/10/2024", status: "Em Análise", statusCor: "bg-blue-100 text-blue-700" },
  ];
  
  // Cálculos de paginação
  const totalPages = Math.ceil(solicitacoesOrcamento.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = solicitacoesOrcamento.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Mock data veículo
  const veiculoData = {
    marca: "Volkswagen",
    modelo: "Gol",
    ano: "2020",
    cor: "Preto",
    motor: "1.6",
    placa: "ABC-1234",
    cliente: {
      nome: "João da Silva",
      telefone: "(41) 99999-9999",
      email: "joao@email.com",
    },
  };

  // Mock data orçamentos
  const orcamentos = [
    {
      id: 1,
      numeroOS: "#2024-1022-1",
      status: "Pendente",
      proprietario: "João da Silva",
      placa: "ABC-1234",
      dataEnvio: "18/10/2024",
      telefone: "(41) 99999-9999",
      valorTotal: 1150.0,
      statusCor: "bg-orange-100 text-orange-700",
    },
    {
      id: 2,
      numeroOS: "#2024-1021-2",
      status: "Aprovado",
      proprietario: "Maria Santos",
      placa: "XYZ-5678",
      dataEnvio: "17/10/2024",
      telefone: "(41) 98888-8888",
      valorTotal: 850.0,
      statusCor: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      numeroOS: "#2024-1020-1",
      status: "Concluído",
      proprietario: "Pedro Oliveira",
      placa: "DEF-9012",
      dataEnvio: "16/10/2024",
      telefone: "(41) 97777-7777",
      valorTotal: 2300.0,
      statusCor: "bg-blue-100 text-blue-700",
    },
  ];

  const stats = [
    { icon: <Clock size={28} />, numero: "12", label: "Orçamentos Pendentes", sublabel: "Aguardando resposta", cor: "text-orange-600" },
    { icon: <Check size={28} />, numero: "8", label: "Orçamentos Aprovados", sublabel: "Prontos para execução", cor: "text-green-600" },
    { icon: <Flag size={28} />, numero: "45", label: "Orçamentos Concluídos", sublabel: "Este mês", cor: "text-blue-600" },
    { icon: <DollarSign size={28} />, numero: "R$ 42.850", label: "Valor Total em Aberto", sublabel: "Orçamentos pendentes", cor: "text-purple-600" },
  ];

  // Calcular subtotais
  const subtotalServicos = itensServico.reduce((acc, item) => acc + item.total, 0);
  const subtotalMaoObra = itensMaoObra.reduce((acc, item) => acc + item.valor, 0);
  const totalFinal = subtotalServicos + subtotalMaoObra - desconto;

  const handleBuscarVeiculo = () => {
    if (placa.trim()) {
      setVeiculoEncontrado(true);
      toast.success("✅ Veículo encontrado!");
    }
  };

  const handleAdicionarServico = () => {
    setItensServico([...itensServico, { descricao: "", quantidade: 1, valorUnitario: 0, total: 0 }]);
  };

  const handleRemoverServico = (index: number) => {
    setItensServico(itensServico.filter((_, i) => i !== index));
  };

  const handleAtualizarServico = (index: number, field: keyof ItemServico, value: any) => {
    const novosItens = [...itensServico];
    novosItens[index] = { ...novosItens[index], [field]: value };
    
    // Recalcular total
    if (field === "quantidade" || field === "valorUnitario") {
      novosItens[index].total = novosItens[index].quantidade * novosItens[index].valorUnitario;
    }
    
    setItensServico(novosItens);
  };

  const handleAdicionarMaoObra = () => {
    setItensMaoObra([...itensMaoObra, { descricao: "", valor: 0 }]);
  };

  const handleRemoverMaoObra = (index: number) => {
    setItensMaoObra(itensMaoObra.filter((_, i) => i !== index));
  };

  const handleAtualizarMaoObra = (index: number, field: keyof ItemMaoObra, value: any) => {
    const novosItens = [...itensMaoObra];
    novosItens[index] = { ...novosItens[index], [field]: value };
    setItensMaoObra(novosItens);
  };

  // Funções para o modal de resposta
  const handleAdicionarRespostaServico = () => {
    setItensRespostaServico([...itensRespostaServico, { descricao: "", quantidade: 1, valorUnitario: 0, total: 0 }]);
  };

  const handleRemoverRespostaServico = (index: number) => {
    setItensRespostaServico(itensRespostaServico.filter((_, i) => i !== index));
  };

  const handleAtualizarRespostaServico = (index: number, field: keyof ItemServico, value: any) => {
    const novosItens = [...itensRespostaServico];
    novosItens[index] = { ...novosItens[index], [field]: value };
    if (field === "quantidade" || field === "valorUnitario") {
      novosItens[index].total = novosItens[index].quantidade * novosItens[index].valorUnitario;
    }
    setItensRespostaServico(novosItens);
  };

  const handleAdicionarRespostaMaoObra = () => {
    setItensRespostaMaoObra([...itensRespostaMaoObra, { descricao: "", valor: 0 }]);
  };

  const handleRemoverRespostaMaoObra = (index: number) => {
    setItensRespostaMaoObra(itensRespostaMaoObra.filter((_, i) => i !== index));
  };

  const handleAtualizarRespostaMaoObra = (index: number, field: keyof ItemMaoObra, value: any) => {
    const novosItens = [...itensRespostaMaoObra];
    novosItens[index] = { ...novosItens[index], [field]: value };
    setItensRespostaMaoObra(novosItens);
  };

  const subtotalRespostaServicos = itensRespostaServico.reduce((acc, item) => acc + item.total, 0);
  const subtotalRespostaMaoObra = itensRespostaMaoObra.reduce((acc, item) => acc + item.valor, 0);
  const totalResposta = subtotalRespostaServicos + subtotalRespostaMaoObra - descontoResposta;

  const handleEnviarResposta = () => {
    if (itensRespostaServico.length === 0 && itensRespostaMaoObra.length === 0) {
      toast.error("Adicione pelo menos um serviço ou mão de obra");
      return;
    }
    if (!validadeResposta) {
      toast.error("Defina a validade do orçamento");
      return;
    }
    
    toast.success("✅ Orçamento enviado com sucesso!");
    setModalSolicitacaoOpen(false);
    
    // Reset form
    setItensRespostaServico([]);
    setItensRespostaMaoObra([]);
    setObservacoesResposta("");
    setDescontoResposta(0);
    setValidadeResposta("");
  };

  const handleCriarOrcamento = () => {
    if (!placa || !veiculoEncontrado) {
      toast.error("Busque um veículo válido");
      return;
    }
    if (itensServico.length === 0 && itensMaoObra.length === 0) {
      toast.error("Adicione pelo menos um serviço ou mão de obra");
      return;
    }
    if (!validade) {
      toast.error("Defina a validade do orçamento");
      return;
    }
    
    toast.success("✅ Orçamento criado com sucesso!");
    setModalOpen(false);
    
    // Reset form
    setPlaca("");
    setVeiculoEncontrado(false);
    setItensServico([]);
    setItensMaoObra([]);
    setObservacoes("");
    setDesconto(0);
    setValidade("");
  };

  const filteredOrcamentos = orcamentos.filter((orc) => {
    const matchesSearch = 
      orc.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orc.telefone.includes(searchTerm) ||
      orc.proprietario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Todos" || orc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Cálculos de paginação para orçamentos
  const totalPagesOrcamentos = Math.ceil(filteredOrcamentos.length / itemsPerPageOrcamentos);
  const startIndexOrcamentos = (currentPageOrcamentos - 1) * itemsPerPageOrcamentos;
  const endIndexOrcamentos = startIndexOrcamentos + itemsPerPageOrcamentos;
  const currentItemsOrcamentos = filteredOrcamentos.slice(startIndexOrcamentos, endIndexOrcamentos);
  
  const handlePageChangeOrcamentos = (page: number) => {
    setCurrentPageOrcamentos(page);
  };
  
  const handlePreviousPageOrcamentos = () => {
    if (currentPageOrcamentos > 1) {
      setCurrentPageOrcamentos(currentPageOrcamentos - 1);
    }
  };
  
  const handleNextPageOrcamentos = () => {
    if (currentPageOrcamentos < totalPagesOrcamentos) {
      setCurrentPageOrcamentos(currentPageOrcamentos + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <ParceiroSidebar oficinaNome={oficinaNome} activePath="/orcamento/novo" />
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
      <header className="sticky top-0 z-30 bg-white shadow-md">
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
                  <ParceiroSidebar oficinaNome={oficinaNome} activePath="/orcamento/novo" />
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

      {/* Content */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setLocation("/dashboard")} className="text-[#1E40AF] hover:underline">
            Dashboard
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Novo Orçamento</span>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Novo Orçamento</h1>
          <p className="text-gray-600">Crie o seu orçamento.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`${stat.cor}`}>{stat.icon}</div>
                <div className="flex-1">
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.numero}</p>
                  <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.sublabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar orçamento por placa, telefone ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Select value={filterPeriodo} onValueChange={setFilterPeriodo}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hoje">Hoje</SelectItem>
                  <SelectItem value="Últimos 7 dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="Últimos 30 dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="Este mês">Este mês</SelectItem>
                  <SelectItem value="Mês passado">Mês passado</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => setModalOpen(true)}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 whitespace-nowrap"
              >
                <Plus size={16} /> Novo Orçamento
              </Button>
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {["Todos", "Pendente", "Aprovado", "Recusado", "Concluído"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filterStatus === status
                  ? "bg-[#1E40AF] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Solicitação de Orçamento */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
              <span className="hidden md:inline">Solicitações de Orçamento</span>
              <span className="md:hidden">Solicitações</span>
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Veículo</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Serviço Solicitado</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((solicitacao, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{solicitacao.cliente}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{solicitacao.veiculo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{solicitacao.servico}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{solicitacao.data}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${
                          solicitacao.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                          solicitacao.status === 'Em Análise' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          <MessageSquare size={12} /> {solicitacao.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Ver detalhes">
                            <Eye size={16} className="text-gray-600" />
                          </button>
                          <button 
                            className="p-2 hover:bg-[#F97316]/10 rounded-lg" 
                            title="Responder"
                            onClick={() => {
                              setSolicitacaoSelecionada(solicitacao);
                              setModalSolicitacaoOpen(true);
                            }}
                          >
                            <Send size={16} className="text-[#F97316]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Controles de Paginação - Desktop */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1} a {Math.min(endIndex, solicitacoesOrcamento.length)} de {solicitacoesOrcamento.length} solicitações
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Página anterior"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-[#F97316] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Próxima página"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {currentItems.map((solicitacao, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{solicitacao.cliente}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                    solicitacao.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                    solicitacao.status === 'Em Análise' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    <MessageSquare size={10} /> {solicitacao.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-1">{solicitacao.veiculo}</div>
                <div className="text-xs text-gray-600 mb-2">{solicitacao.servico}</div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-500">{solicitacao.data}</div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <button 
                    onClick={() => {
                      setSolicitacaoSelecionada(solicitacao);
                      setModalSolicitacaoOpen(true);
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Eye size={14} /> Ver
                  </button>
                  <button 
                    onClick={() => {
                      setSolicitacaoSelecionada(solicitacao);
                      setModalSolicitacaoOpen(true);
                    }}
                    disabled={solicitacao.status === 'Respondido'}
                    className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center gap-1 ${
                      solicitacao.status === 'Respondido'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#F97316] hover:bg-[#ea580c] text-white'
                    }`}
                  >
                    <Send size={14} /> Responder
                  </button>
                </div>
              </div>
            ))}
            
            {/* Controles de Paginação - Mobile */}
            <div className="bg-white rounded-xl p-4 shadow-sm mt-3">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, solicitacoesOrcamento.length)} de {solicitacoesOrcamento.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} className="text-gray-600" />
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-[#F97316] text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orçamentos List */}

        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Orçamento Enviado</h2>            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
              {filteredOrcamentos.length}
            </span>
          </div>

          {filteredOrcamentos.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Nº OS</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Proprietário</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Placa</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Data</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Telefone</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Valor</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {currentItemsOrcamentos.map((orc) => (
                      <tr key={orc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-[#1E40AF]">{orc.numeroOS}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${orc.statusCor}`}>
                            {orc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#1E40AF] rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {orc.proprietario.charAt(0)}
                            </div>
                            <span className="font-medium">{orc.proprietario}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 rounded font-mono text-sm">{orc.placa}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{orc.dataEnvio}</td>
                        <td className="px-6 py-4">
                          <a href={`tel:${orc.telefone}`} className="flex items-center gap-1 text-[#1E40AF] hover:underline">
                            <Phone size={14} />
                            <span className="text-sm">{orc.telefone}</span>
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-green-600">
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orc.valorTotal)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Controles de Paginação - Desktop */}
                <div className="flex items-center justify-between px-6 py-4 border-t">
                  <div className="text-sm text-gray-600">
                    Mostrando {startIndexOrcamentos + 1} a {Math.min(endIndexOrcamentos, filteredOrcamentos.length)} de {filteredOrcamentos.length} orçamentos
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePreviousPageOrcamentos}
                      disabled={currentPageOrcamentos === 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Página anterior"
                    >
                      <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPagesOrcamentos }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChangeOrcamentos(page)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPageOrcamentos === page
                              ? 'bg-[#F97316] text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleNextPageOrcamentos}
                      disabled={currentPageOrcamentos === totalPagesOrcamentos}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Próxima página"
                    >
                      <ChevronRight size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {currentItemsOrcamentos.map((orc) => (
                  <div key={orc.id} className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-[#1E40AF]">
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-mono font-bold text-[#1E40AF]">{orc.numeroOS}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${orc.statusCor}`}>
                        {orc.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#1E40AF] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {orc.proprietario.charAt(0)}
                        </div>
                        <span className="font-medium">{orc.proprietario}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded font-mono text-xs">{orc.placa}</span>
                        <span>•</span>
                        <span>{orc.dataEnvio}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#1E40AF]" />
                        <a href={`tel:${orc.telefone}`} className="text-[#1E40AF]">{orc.telefone}</a>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="font-bold text-green-600 text-lg">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orc.valorTotal)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">Ver Detalhes</Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Controles de Paginação - Mobile */}
                <div className="bg-white rounded-xl p-4 shadow-sm mt-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-gray-600">
                      {startIndexOrcamentos + 1}-{Math.min(endIndexOrcamentos, filteredOrcamentos.length)} de {filteredOrcamentos.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePreviousPageOrcamentos}
                        disabled={currentPageOrcamentos === 1}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft size={16} className="text-gray-600" />
                      </button>
                      
                      <div className="flex gap-1">
                        {Array.from({ length: totalPagesOrcamentos }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChangeOrcamentos(page)}
                            className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                              currentPageOrcamentos === page
                                ? 'bg-[#F97316] text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={handleNextPageOrcamentos}
                        disabled={currentPageOrcamentos === totalPagesOrcamentos}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <FileText className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum orçamento encontrado</h3>
              <p className="text-gray-600 mb-4">Crie seu primeiro orçamento para começar</p>
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
              >
                <Plus size={16} /> Criar Primeiro Orçamento
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Novo Orçamento - Continua na próxima parte */}



      {/* Modal: Novo Orçamento */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] md:max-h-[90vh] h-full md:h-auto overflow-y-auto w-full md:w-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">
              Criar Novo Orçamento
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* SEÇÃO 1: Identificação do Veículo */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Dados do Veículo</h3>
              
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placa do Veículo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="ABC-1234"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                    maxLength={8}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleBuscarVeiculo}
                    className="bg-[#1E40AF] hover:bg-[#1E3B8F] text-white"
                  >
                    <Search size={16} className="mr-2" /> Buscar
                  </Button>
                </div>
              </div>

              {veiculoEncontrado && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3 text-green-600">
                    <Check size={18} />
                    <span className="font-semibold">Veículo encontrado!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Dados do Veículo:</p>
                      <p className="font-bold text-gray-900">{veiculoData.marca} {veiculoData.modelo}</p>
                      <p className="text-sm text-gray-600">Ano: {veiculoData.ano} • Cor: {veiculoData.cor}</p>
                      <p className="text-sm text-gray-600">Motor: {veiculoData.motor}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-gray-200 rounded font-mono text-sm">{veiculoData.placa}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Dados do Cliente:</p>
                      <p className="font-bold text-gray-900">{veiculoData.cliente.nome}</p>
                      <p className="text-sm text-gray-600">{veiculoData.cliente.telefone}</p>
                      <p className="text-sm text-gray-600">{veiculoData.cliente.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SEÇÃO 2: Serviços/Peças */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b">Serviços e Peças</h3>
              <p className="text-sm text-gray-600 mb-4">Adicione os serviços e peças necessários para este orçamento</p>

              {itensServico.length > 0 && (
                <div className="mb-4 space-y-3">
                  {itensServico.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                      {/* Mobile: Layout em coluna */}
                      <div className="md:hidden space-y-2">
                        <Input
                          placeholder="Ex: Óleo motor 5W30, Filtro..."
                          value={item.descricao}
                          onChange={(e) => handleAtualizarServico(index, "descricao", e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            placeholder="Qtd"
                            value={item.quantidade}
                            onChange={(e) => handleAtualizarServico(index, "quantidade", Number(e.target.value))}
                            min={1}
                          />
                          <Input
                            type="number"
                            placeholder="Valor"
                            value={item.valorUnitario}
                            onChange={(e) => handleAtualizarServico(index, "valorUnitario", Number(e.target.value))}
                            min={0}
                            step={0.01}
                          />
                          <Input
                            value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.total)}
                            readOnly
                            className="bg-gray-100 text-xs"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoverServico(index)}
                          className="w-full p-2 hover:bg-red-100 rounded text-red-600 text-sm flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} /> Remover
                        </button>
                      </div>
                      
                      {/* Desktop: Layout em grid */}
                      <div className="hidden md:grid grid-cols-12 gap-2">
                        <div className="col-span-5">
                          <Input
                            placeholder="Ex: Óleo motor 5W30, Filtro..."
                            value={item.descricao}
                            onChange={(e) => handleAtualizarServico(index, "descricao", e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="Qtd"
                            value={item.quantidade}
                            onChange={(e) => handleAtualizarServico(index, "quantidade", Number(e.target.value))}
                            min={1}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            value={item.valorUnitario}
                            onChange={(e) => handleAtualizarServico(index, "valorUnitario", Number(e.target.value))}
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.total)}
                            readOnly
                            className="bg-gray-100"
                          />
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          <button
                            onClick={() => handleRemoverServico(index)}
                            className="p-2 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-700">Subtotal Serviços/Peças: </span>
                    <span className="text-lg font-bold text-[#1E40AF]">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalServicos)}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAdicionarServico}
                variant="outline"
                className="w-full border-2 border-dashed border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50"
              >
                <Plus size={16} className="mr-2" /> Adicionar Serviço/Peça
              </Button>
            </div>

            {/* SEÇÃO 3: Mão de Obra */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b">Mão de Obra</h3>
              <p className="text-sm text-gray-600 mb-4">Adicione os custos de mão de obra</p>

              {itensMaoObra.length > 0 && (
                <div className="mb-4 space-y-3">
                  {itensMaoObra.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                      {/* Mobile: Layout em coluna */}
                      <div className="md:hidden space-y-2">
                        <Input
                          placeholder="Ex: Troca de óleo, Alinhamento..."
                          value={item.descricao}
                          onChange={(e) => handleAtualizarMaoObra(index, "descricao", e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="R$ 0,00"
                          value={item.valor}
                          onChange={(e) => handleAtualizarMaoObra(index, "valor", Number(e.target.value))}
                          min={0}
                          step={0.01}
                        />
                        <button
                          onClick={() => handleRemoverMaoObra(index)}
                          className="w-full p-2 hover:bg-red-100 rounded text-red-600 text-sm flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} /> Remover
                        </button>
                      </div>
                      
                      {/* Desktop: Layout em grid */}
                      <div className="hidden md:grid grid-cols-12 gap-2">
                        <div className="col-span-8">
                          <Input
                            placeholder="Ex: Troca de óleo, Alinhamento..."
                            value={item.descricao}
                            onChange={(e) => handleAtualizarMaoObra(index, "descricao", e.target.value)}
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            value={item.valor}
                            onChange={(e) => handleAtualizarMaoObra(index, "valor", Number(e.target.value))}
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          <button
                            onClick={() => handleRemoverMaoObra(index)}
                            className="p-2 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-700">Subtotal Mão de Obra: </span>
                    <span className="text-lg font-bold text-green-600">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalMaoObra)}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAdicionarMaoObra}
                variant="outline"
                className="w-full border-2 border-dashed border-green-600 text-green-600 hover:bg-green-50"
              >
                <Plus size={16} className="mr-2" /> Adicionar Mão de Obra
              </Button>
            </div>

            {/* SEÇÃO 4: Observações */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Observações</h3>
              <Textarea
                placeholder="Adicione informações relevantes sobre este orçamento, condições especiais, prazos, etc..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">{observacoes.length}/1000</p>
            </div>

            {/* SEÇÃO 5: Resumo do Orçamento */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Resumo do Orçamento</h3>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal Serviços/Peças:</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalServicos)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal Mão de Obra:</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalMaoObra)}
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <label className="text-sm text-gray-700">Desconto (R$):</label>
                  <Input
                    type="number"
                    placeholder="R$ 0,00"
                    value={desconto}
                    onChange={(e) => setDesconto(Number(e.target.value))}
                    min={0}
                    step={0.01}
                    className="w-full md:w-32 text-right"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <label className="text-sm text-gray-700">Validade do Orçamento:</label>
                  <Input
                    type="date"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    className="w-full md:w-48"
                  />
                </div>
                <hr className="border-gray-400" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg md:text-xl font-bold text-gray-900">TOTAL:</span>
                  <span className="text-xl md:text-2xl font-bold text-[#F97316]">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalFinal)}
                  </span>
                </div>
              </div>
            </div>

            {/* SEÇÃO 6: Ordem de Serviço */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Ordem de Serviço Gerada</h3>
              <p className="text-sm text-gray-600 mb-3">
                A criação deste orçamento irá gerar a seguinte Ordem de Serviço:
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número da OS:</label>
                  <Input
                    value="#2024-1022-1"
                    readOnly
                    className="bg-gray-100 font-mono font-bold w-48"
                  />
                </div>
                <div className="mt-6">
                  <span className="px-3 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                    Aguardando Aprovação
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <FileText size={16} /> Salvar Rascunho
                </Button>
                <Button
                  onClick={handleCriarOrcamento}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
                >
                  <Check size={16} /> Criar e Enviar Orçamento
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Resposta de Solicitação */}
      <Dialog open={modalSolicitacaoOpen} onOpenChange={setModalSolicitacaoOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F97316]">
              Responder Solicitação de Orçamento
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Informações do Cliente */}
            {solicitacaoSelecionada && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-4">
                  {/* Foto do Perfil */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1E40AF]">
                        {solicitacaoSelecionada.cliente.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Informações Básicas */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {solicitacaoSelecionada.cliente}
                      </h3>
                    </div>
                    
                    {/* Telefone */}
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-700">{solicitacaoSelecionada.telefone}</span>
                    </div>
                    
                    {/* Veículo */}
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="text-gray-700">{solicitacaoSelecionada.veiculo}</span>
                        <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded font-mono text-xs">
                          {solicitacaoSelecionada.placa}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status da Solicitação */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${solicitacaoSelecionada.statusCor}`}>
                        {solicitacaoSelecionada.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Seção de Dados do Veículo */}
            {solicitacaoSelecionada && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">Informações da Solicitação</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Serviço Solicitado:</p>
                    <p className="font-bold text-gray-900">{solicitacaoSelecionada.servico}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Data da Solicitação:</p>
                    <p className="text-sm text-gray-700">{solicitacaoSelecionada.data}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 space-y-4">
              {/* Serviços e Peças */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Serviços e Peças</h3>
                {itensRespostaServico.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {itensRespostaServico.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                          <Input
                            placeholder="Ex: Óleo motor 5W30, Filtro..."
                            value={item.descricao}
                            onChange={(e) => handleAtualizarRespostaServico(index, "descricao", e.target.value)}
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              type="number"
                              placeholder="Qtd"
                              value={item.quantidade}
                              onChange={(e) => handleAtualizarRespostaServico(index, "quantidade", Number(e.target.value))}
                              min={1}
                            />
                            <Input
                              type="number"
                              placeholder="Valor"
                              value={item.valorUnitario}
                              onChange={(e) => handleAtualizarRespostaServico(index, "valorUnitario", Number(e.target.value))}
                              min={0}
                              step={0.01}
                            />
                            <Input
                              value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.total)}
                              readOnly
                              className="bg-gray-100"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoverRespostaServico(index)}
                            className="w-full p-2 hover:bg-red-100 rounded text-red-600 text-sm flex items-center justify-center gap-2"
                          >
                            <Trash2 size={16} /> Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-700">Subtotal Serviços/Peças: </span>
                      <span className="text-lg font-bold text-[#1E40AF]">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalRespostaServicos)}
                      </span>
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleAdicionarRespostaServico}
                  variant="outline"
                  className="w-full border-2 border-dashed border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50"
                >
                  <Plus size={16} className="mr-2" /> Adicionar Serviço/Peça
                </Button>
              </div>
              
              {/* Mão de Obra */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Mão de Obra</h3>
                {itensRespostaMaoObra.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {itensRespostaMaoObra.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                          <Input
                            placeholder="Ex: Troca de óleo, Alinhamento..."
                            value={item.descricao}
                            onChange={(e) => handleAtualizarRespostaMaoObra(index, "descricao", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            value={item.valor}
                            onChange={(e) => handleAtualizarRespostaMaoObra(index, "valor", Number(e.target.value))}
                            min={0}
                            step={0.01}
                          />
                          <button
                            onClick={() => handleRemoverRespostaMaoObra(index)}
                            className="w-full p-2 hover:bg-red-100 rounded text-red-600 text-sm flex items-center justify-center gap-2"
                          >
                            <Trash2 size={16} /> Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-700">Subtotal Mão de Obra: </span>
                      <span className="text-lg font-bold text-green-600">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalRespostaMaoObra)}
                      </span>
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleAdicionarRespostaMaoObra}
                  variant="outline"
                  className="w-full border-2 border-dashed border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Plus size={16} className="mr-2" /> Adicionar Mão de Obra
                </Button>
              </div>
              
              {/* Observações */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Observações</h3>
                <Textarea
                  placeholder="Adicione informações relevantes sobre este orçamento, condições especiais, prazos, etc..."
                  value={observacoesResposta}
                  onChange={(e) => setObservacoesResposta(e.target.value)}
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{observacoesResposta.length}/500</p>
              </div>
              
              {/* Resumo Financeiro */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Resumo do Orçamento</h3>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal Serviços/Peças:</span>
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalRespostaServicos)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mão de Obra:</span>
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotalRespostaMaoObra)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Desconto (R$):</span>
                    <Input
                      type="number"
                      value={descontoResposta}
                      onChange={(e) => setDescontoResposta(Number(e.target.value))}
                      className="w-32 h-8 text-sm"
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-[#1E40AF]">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalResposta)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Validade */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Validade do Orçamento</h3>
                <Input
                  type="date"
                  value={validadeResposta}
                  onChange={(e) => setValidadeResposta(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setModalSolicitacaoOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEnviarResposta}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
            >
              <Send size={16} /> Enviar Orçamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

