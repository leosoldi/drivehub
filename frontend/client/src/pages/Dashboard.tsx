import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Calendar,
  Calculator,
  Check,
  CheckSquare,
  ChevronRight,
  Clock,
  ClipboardList,
  DollarSign,
  Eye,
  FileText,
  History,
  Mail,
  Menu,
  Plus,
  Printer,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  Wrench,
  X,
  Send,
  MessageSquare,
  User,
  ChevronDown,
  HelpCircle,
  LogOut,
  BarChart3,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalCadastroCliente } from "@/components/ModalCadastroCliente";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalSolicitacaoOpen, setModalSolicitacaoOpen] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<typeof solicitacoesOrcamento[0] | null>(null);
  const [respostaOrcamento, setRespostaOrcamento] = useState("");
  const [notificationCount] = useState(3);
  const [modalNovoAgendamento, setModalNovoAgendamento] = useState(false);
  const [modalNovoOrcamento, setModalNovoOrcamento] = useState(false);
  const [modalCadastroCliente, setModalCadastroCliente] = useState(false);
  const [modalSelecionarChecklist, setModalSelecionarChecklist] = useState(false);
  const [checklistSelecionado, setChecklistSelecionado] = useState<any>(null);
  
  // Form state for new appointment
  const [formDataAgendamento, setFormDataAgendamento] = useState({
    placa: "",
    data: "",
    horario: "",
    duracao: "2h",
    servico: "",
    observacoes: "",
    enviarWhatsApp: true,
    enviarEmail: true,
  });
  
  // Form state for new budget - Estados do modal de orçamento
  const [placa, setPlaca] = useState("");
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(false);
  const [itensServico, setItensServico] = useState<Array<{
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    total: number;
  }>>([]);
  const [itensMaoObra, setItensMaoObra] = useState<Array<{
    descricao: string;
    valor: number;
  }>>([]);
  const [observacoes, setObservacoes] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [validade, setValidade] = useState("");
  
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
  
  // Calcular subtotais
  const subtotalServicos = itensServico.reduce((acc, item) => acc + item.total, 0);
  const subtotalMaoObra = itensMaoObra.reduce((acc, item) => acc + item.valor, 0);
  const totalFinal = subtotalServicos + subtotalMaoObra - desconto;

  const oficinaNome = "Auto Center Silva";

  // Mock data - Checklists cadastrados
  const checklistsCadastrados = [
    {
      id: 1,
      titulo: "Revisão dos 10.000 km",
      descricao: "Checklist completo para revisão preventiva aos 10 mil quilômetros rodados",
      categoria: "Revisão Geral",
      itens: [
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
        "Inspecionar pastilhas de freio",
        "Verificar amortecedores",
      ],
      usos: 23,
      ultimoUso: "Há 2 dias",
      cor: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      titulo: "Inspeção de Freios",
      descricao: "Verificação completa do sistema de freios",
      categoria: "Freios",
      itens: [
        "Verificar espessura das pastilhas",
        "Inspecionar discos de freio",
        "Checar nível de fluido de freio",
        "Testar freio de mão",
        "Verificar mangueiras e conexões",
      ],
      usos: 45,
      ultimoUso: "Há 1 dia",
      cor: "bg-red-100 text-red-700",
    },
    {
      id: 3,
      titulo: "Checklist de Suspensão",
      descricao: "Inspeção completa do sistema de suspensão",
      categoria: "Suspensão",
      itens: [
        "Verificar amortecedores",
        "Inspecionar molas",
        "Checar buchas e coxins",
        "Verificar barras estabilizadoras",
        "Testar direção e folgas",
      ],
      usos: 18,
      ultimoUso: "Há 5 dias",
      cor: "bg-purple-100 text-purple-700",
    },
  ];

  // Funções auxiliares do modal de orçamento
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

  const handleAtualizarServico = (index: number, field: string, value: any) => {
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

  const handleAtualizarMaoObra = (index: number, field: string, value: any) => {
    const novosItens = [...itensMaoObra];
    novosItens[index] = { ...novosItens[index], [field]: value };
    setItensMaoObra(novosItens);
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
    setModalNovoOrcamento(false);
    
    // Reset form
    setPlaca("");
    setVeiculoEncontrado(false);
    setItensServico([]);
    setItensMaoObra([]);
    setObservacoes("");
    setDesconto(0);
    setValidade("");
  };

  const handleLogout = () => {
    setLocation("/");
  };

  const menuItems = [
    { icon: <ClipboardList size={20} />, label: "Dashboard", path: "/dashboard", active: true },
    { icon: <Users size={20} />, label: "Clientes", path: "/clientes" },
    { icon: <FileText size={20} />, label: "Ordens de Serviço", path: "/ordens-servico" },
    { icon: <Calendar size={20} />, label: "Agendamentos", path: "/agendamentos" },
    { icon: <CheckSquare size={20} />, label: "Checklists", path: "/checklists" },
    { icon: <Calculator size={20} />, label: "Orçamentos", path: "/orcamentos" },
    { icon: <TrendingUp size={20} />, label: "Relatórios", path: "/relatorios" },
    { icon: <Settings size={20} />, label: "Configurações", path: "/configuracoes" },
  ];

  const acoesRapidas = [
    { icon: <UserPlus size={28} />, titulo: "Adicionar Cliente", descricao: "Cadastrar novo Cliente", cor: "text-[#1E40AF]", onClick: () => setModalCadastroCliente(true) },
    { icon: <FileText size={28} />, titulo: "Adicionar nova O.S", descricao: "Criar nova Ordem de Serviço", cor: "text-[#F97316]", path: "/ordens-servico", onClick: () => setLocation("/ordens-servico") },
    { icon: <Calendar size={28} />, titulo: "Criar Agendamento", descricao: "Agendar serviço", cor: "text-green-600", onClick: () => setModalNovoAgendamento(true) },
    { icon: <CheckSquare size={28} />, titulo: "Adicionar Checklist", descricao: "Criar novo Checklist", cor: "text-[#1E40AF]", onClick: () => setModalSelecionarChecklist(true) },
    { icon: <Calculator size={28} />, titulo: "Adicionar Orçamento", descricao: "Criar novo Orçamento", cor: "text-purple-600", onClick: () => setModalNovoOrcamento(true) },
  ];

  const osEmAndamento = [
    { numero: "#2024-0523", cliente: "João Silva", veiculo: "VW Gol 1.6 - ABC-1234", valor: "R$ 850,00", data: "18/10/2024" },
    { numero: "#2024-0524", cliente: "Maria Santos", veiculo: "Fiat Uno 1.0 - XYZ-5678", valor: "R$ 1.200,00", data: "18/10/2024" },
    { numero: "#2024-0525", cliente: "Pedro Costa", veiculo: "Chevrolet Onix 1.4 - DEF-9012", valor: "R$ 650,00", data: "19/10/2024" },
  ];

  const solicitacoesOrcamento = [
    { id: "#SOL-2024-001", cliente: "João Silva", veiculo: "VW Gol 1.6 - ABC-1234", servico: "Troca de óleo e filtros", data: "24/10/2024", status: "Pendente" },
    { id: "#SOL-2024-002", cliente: "Maria Santos", veiculo: "Fiat Uno 1.0 - XYZ-5678", servico: "Revisão completa", data: "24/10/2024", status: "Em Análise" },
    { id: "#SOL-2024-003", cliente: "Pedro Costa", veiculo: "Chevrolet Onix 1.4 - DEF-9012", servico: "Alinhamento e balanceamento", data: "23/10/2024", status: "Respondido" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo DrivHub - Desktop / Informações do Estabelecimento - Mobile */}
      <div className="px-6 py-6 border-b">
        {/* Desktop: Logo DrivHub */}
        <div className="hidden lg:flex items-center justify-center">
          <span className="text-3xl font-bold">
            <span className="text-[#1E40AF]">Driv</span>
            <span className="text-[#F97316]">Hub</span>
          </span>
        </div>
        {/* Mobile: Informações do Estabelecimento */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 text-base">{oficinaNome}</p>
            <p className="text-sm text-gray-500">Plano Basic</p>
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
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-[#F97316] bg-[#FFF7ED] hover:bg-[#FFF7ED] hover:text-[#F97316]"
              onClick={() => {
                setLocation("/dashboard");
              }}
            >
              <BarChart3 className="h-5 w-5" />
              Visão Geral
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visão geral do dashboard com estatísticas e métricas</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 2. Meu Perfil */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/perfil-parceiro");
              }}
            >
              <User className="h-5 w-5" />
              Meu Perfil
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visualizar e editar informações do perfil</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 3. Cliente */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/clientes/novo");
              }}
            >
              <Users className="h-5 w-5" />
              Clientes
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visualizar e gerenciar clientes cadastrados</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 4. Agenda */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/agendamentos/novo");
              }}
            >
              <Calendar className="h-5 w-5" />
              Agenda
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Gerenciar agendamentos e compromissos</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 5. Ordem de Serviço */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/ordens-servico");
              }}
            >
              <Wrench className="h-5 w-5" />
              Ordem de Serviço
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Gerenciar ordens de serviço em andamento</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 6. Checklist */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/checklist");
              }}
            >
              <CheckSquare className="h-5 w-5" />
              Checklist
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Listas de verificação e tarefas pendentes</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 7. Orçamento */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/orcamentos/novo");
              }}
            >
              <ClipboardList className="h-5 w-5" />
              Orçamentos
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Criar e gerenciar orçamentos para clientes</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 8. Mensagem */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/mensagens");
              }}
            >
              <MessageSquare className="h-5 w-5" />
              Mensagens
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Comunicação e mensagens com clientes</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 9. Financeiro */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/financeiro");
              }}
            >
              <Wallet className="h-5 w-5" />
              Financeiro
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Controle financeiro e relatórios de receitas</p>
          </TooltipContent>
        </Tooltip>
        
        {/* 10. Histórico */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-6 h-14 text-base font-normal text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("/historico-parceiro");
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
      </div>
      
      {/* Logout Button at Bottom */}
      <div className="border-t p-6">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-14 text-base font-normal text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <X className="h-5 w-5" />
          Sair da conta
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <SidebarContent />
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
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-xl md:rounded-2xl p-6 md:p-8 text-white">
            <h1 className="text-xl md:text-3xl font-bold mb-2">
              Bem-vindo, <span className="text-white">{oficinaNome}</span>
            </h1>
            <p className="text-sm md:text-base text-white/90">
              Gerencie seus serviços, agendamentos e clientes de forma eficiente.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">8</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Agendamentos Hoje</div>
                  <div className="text-xs text-green-600 mt-1">+2 desde ontem</div>
                </div>
                <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                  <Calendar className="text-[#1E40AF]" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">12</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">OS Aguardando Aprovação</div>
                  <div className="text-xs text-orange-600 mt-1">Requer atenção</div>
                </div>
                <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
                  <Clock className="text-[#F97316]" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">5</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Serviços em Andamento</div>
                  <div className="text-xs text-green-600 mt-1">Finalize em breve</div>
                </div>
                <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                  <Wrench className="text-green-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">R$ 18.450</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Faturamento este Mês</div>
                  <div className="text-xs text-green-600 mt-1">+15% vs mês anterior</div>
                </div>
                <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                  <DollarSign className="text-green-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {acoesRapidas.map((acao, index) => (
                <button
                  key={index}
                  onClick={() => acao.onClick ? acao.onClick() : alert(`Navegando para ${acao.titulo}`)}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className={`${acao.cor} mb-3 md:mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                    {acao.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{acao.titulo}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{acao.descricao}</p>
                </button>
              ))}
            </div>
          </div>

          {/* OS em Andamento */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="hidden md:inline">Ordens de Serviço em Andamento</span>
                <span className="md:hidden">OS em Andamento</span>
                <span className="text-sm md:text-lg bg-[#F97316] text-white px-2 md:px-3 py-1 rounded-full">12</span>
              </h2>
              <Button variant="outline" className="text-[#F97316] border-[#F97316] text-sm">
                Ver Todas <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>

            {/* Desktop Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">OS Nº</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Veículo</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {osEmAndamento.map((os, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{os.numero}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{os.cliente}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{os.veiculo}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">{os.valor}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{os.data}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
                            Aguardando Aprovação
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Eye size={16} className="text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Bell size={16} className="text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {osEmAndamento.map((os, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{os.numero}</div>
                      <div className="text-sm text-gray-900 mt-1">{os.cliente}</div>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
                      Em Andamento
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{os.veiculo}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-green-600">{os.valor}</div>
                    <div className="text-xs text-gray-500">{os.data}</div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t">
                    <button className="flex-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-1">
                      <Eye size={14} /> Ver
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-1">
                      <Bell size={14} /> Lembrete
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Veículo</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Serviço Solicitado</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {solicitacoesOrcamento.map((solicitacao, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{solicitacao.id}</td>
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
                            <button className="p-2 hover:bg-[#F97316]/10 rounded-lg" title="Responder">
                              <Send size={16} className="text-[#F97316]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {solicitacoesOrcamento.map((solicitacao, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{solicitacao.id}</div>
                      <div className="text-sm text-gray-900 mt-1">{solicitacao.cliente}</div>
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
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Visualização e Resposta de Solicitação */}
      <Dialog open={modalSolicitacaoOpen} onOpenChange={setModalSolicitacaoOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F97316]">
              {solicitacaoSelecionada?.status === 'Respondido' ? 'Visualizar Solicitação' : 'Responder Solicitação'}
            </DialogTitle>
            <DialogDescription>
              Solicitação {solicitacaoSelecionada?.id} - {solicitacaoSelecionada?.cliente}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Informações da Solicitação */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <Label className="text-gray-600 text-sm">Cliente</Label>
                <p className="font-semibold text-gray-900">{solicitacaoSelecionada?.cliente}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Veículo</Label>
                <p className="font-semibold text-gray-900">{solicitacaoSelecionada?.veiculo}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Serviço Solicitado</Label>
                <p className="font-semibold text-gray-900">{solicitacaoSelecionada?.servico}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-600 text-sm">Data</Label>
                  <p className="font-semibold text-gray-900">{solicitacaoSelecionada?.data}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Status</Label>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    solicitacaoSelecionada?.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                    solicitacaoSelecionada?.status === 'Em Análise' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {solicitacaoSelecionada?.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Descrição do Cliente (mockada) */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Descrição do Problema</Label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  Preciso realizar {solicitacaoSelecionada?.servico.toLowerCase()} no meu veículo. Gostaria de um orçamento detalhado com o valor das peças e mão de obra.
                </p>
              </div>
            </div>

            {/* Campo de Resposta */}
            {solicitacaoSelecionada?.status !== 'Respondido' && (
              <div className="space-y-2">
                <Label htmlFor="resposta-orcamento" className="text-gray-700 font-medium">
                  Sua Resposta / Orçamento *
                </Label>
                <Textarea
                  id="resposta-orcamento"
                  placeholder="Digite aqui o orçamento detalhado com valores de peças, mão de obra e prazo de execução..."
                  value={respostaOrcamento}
                  onChange={(e) => setRespostaOrcamento(e.target.value)}
                  className="border-gray-300 min-h-[150px]"
                />
              </div>
            )}

            {/* Resposta Enviada (quando já respondido) */}
            {solicitacaoSelecionada?.status === 'Respondido' && (
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Orçamento Enviado</Label>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Orçamento:</strong> R$ 350,00
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Prazo:</strong> 2 dias úteis
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Detalhes:</strong> Serviço completo de {solicitacaoSelecionada?.servico.toLowerCase()} incluindo peças originais e mão de obra especializada. Garantia de 90 dias.
                  </p>
                </div>
              </div>
            )}

            {/* Informações */}
            {solicitacaoSelecionada?.status !== 'Respondido' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">ℹ️ Informação:</span><br />
                  Seja claro e detalhado no orçamento. Inclua valores de peças, mão de obra e prazo de execução.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setModalSolicitacaoOpen(false);
                setRespostaOrcamento("");
              }}
              className="border-gray-300"
            >
              {solicitacaoSelecionada?.status === 'Respondido' ? 'Fechar' : 'Cancelar'}
            </Button>
            {solicitacaoSelecionada?.status !== 'Respondido' && (
              <Button
                onClick={() => {
                  if (!respostaOrcamento.trim()) {
                    toast.error("Por favor, preencha o orçamento antes de enviar.");
                    return;
                  }
                  toast.success("Orçamento enviado com sucesso!");
                  setModalSolicitacaoOpen(false);
                  setRespostaOrcamento("");
                }}
                disabled={!respostaOrcamento.trim()}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Orçamento
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Novo Agendamento */}
      <Dialog open={modalNovoAgendamento} onOpenChange={setModalNovoAgendamento}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="text-[#1E40AF]" size={24} />
              Novo Agendamento
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Buscar Veículo */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Buscar Veículo</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placa do Veículo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    placeholder="ABC-1234"
                    value={formDataAgendamento.placa}
                    onChange={(e) => setFormDataAgendamento({ ...formDataAgendamento, placa: e.target.value.toUpperCase() })}
                    className="uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Data e Horário */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Data e Horário</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formDataAgendamento.data}
                    onChange={(e) => setFormDataAgendamento({ ...formDataAgendamento, data: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário <span className="text-red-500">*</span>
                  </label>
                  <Select value={formDataAgendamento.horario} onValueChange={(value) => setFormDataAgendamento({ ...formDataAgendamento, horario: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"].map((h) => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração Estimada
                  </label>
                  <Select value={formDataAgendamento.duracao} onValueChange={(value) => setFormDataAgendamento({ ...formDataAgendamento, duracao: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hora</SelectItem>
                      <SelectItem value="2h">2 horas</SelectItem>
                      <SelectItem value="3h">3 horas</SelectItem>
                      <SelectItem value="4h">4 horas</SelectItem>
                      <SelectItem value="5h">5 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Serviço */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Serviço</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Serviço <span className="text-red-500">*</span>
                </label>
                <Select value={formDataAgendamento.servico} onValueChange={(value) => setFormDataAgendamento({ ...formDataAgendamento, servico: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Troca de óleo">Troca de óleo</SelectItem>
                    <SelectItem value="Revisão completa">Revisão completa</SelectItem>
                    <SelectItem value="Alinhamento e balanceamento">Alinhamento e balanceamento</SelectItem>
                    <SelectItem value="Troca de pneus">Troca de pneus</SelectItem>
                    <SelectItem value="Reparo de freios">Reparo de freios</SelectItem>
                    <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <Textarea
                placeholder="Adicione observações sobre o agendamento..."
                value={formDataAgendamento.observacoes}
                onChange={(e) => setFormDataAgendamento({ ...formDataAgendamento, observacoes: e.target.value })}
                rows={3}
              />
            </div>

            {/* Notificações */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Notificações</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="whatsapp-agendamento"
                    checked={formDataAgendamento.enviarWhatsApp}
                    onCheckedChange={(checked) => setFormDataAgendamento({ ...formDataAgendamento, enviarWhatsApp: checked as boolean })}
                  />
                  <label htmlFor="whatsapp-agendamento" className="text-sm text-gray-700">
                    Enviar confirmação por WhatsApp
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="email-agendamento"
                    checked={formDataAgendamento.enviarEmail}
                    onCheckedChange={(checked) => setFormDataAgendamento({ ...formDataAgendamento, enviarEmail: checked as boolean })}
                  />
                  <label htmlFor="email-agendamento" className="text-sm text-gray-700">
                    Enviar confirmação por E-mail
                  </label>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setModalNovoAgendamento(false);
                  setFormDataAgendamento({
                    placa: "",
                    data: "",
                    horario: "",
                    duracao: "2h",
                    servico: "",
                    observacoes: "",
                    enviarWhatsApp: true,
                    enviarEmail: true,
                  });
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (!formDataAgendamento.placa || !formDataAgendamento.data || !formDataAgendamento.horario || !formDataAgendamento.servico) {
                    toast.error("Por favor, preencha todos os campos obrigatórios.");
                    return;
                  }
                  toast.success("Agendamento criado com sucesso!");
                  setModalNovoAgendamento(false);
                  setFormDataAgendamento({
                    placa: "",
                    data: "",
                    horario: "",
                    duracao: "2h",
                    servico: "",
                    observacoes: "",
                    enviarWhatsApp: true,
                    enviarEmail: true,
                  });
                }}
                className="flex-1 bg-[#1E40AF] hover:bg-[#1e3a8a]"
              >
                Criar Agendamento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal: Criar Novo Orçamento */}
      <Dialog open={modalNovoOrcamento} onOpenChange={setModalNovoOrcamento}>
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
              <Button variant="outline" onClick={() => setModalNovoOrcamento(false)}>
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

      {/* Modal: Cadastro de Cliente */}
      <ModalCadastroCliente 
        open={modalCadastroCliente} 
        onOpenChange={setModalCadastroCliente} 
      />

      {/* Modal: Selecionar Checklist */}
      <Dialog open={modalSelecionarChecklist} onOpenChange={setModalSelecionarChecklist}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Selecionar Checklist</DialogTitle>
            <DialogDescription className="text-gray-600">
              Escolha um checklist cadastrado para aplicar ao veículo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Lista de Checklists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistsCadastrados.map((checklist) => (
                <div
                  key={checklist.id}
                  onClick={() => {
                    setChecklistSelecionado(checklist);
                    toast.success(`Checklist "${checklist.titulo}" selecionado!`);
                    setModalSelecionarChecklist(false);
                    // Aqui você pode adicionar lógica adicional, como navegar para uma página de preenchimento
                    // ou abrir outro modal para aplicar o checklist a um veículo específico
                  }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#1E40AF] hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#1E40AF] transition-colors">
                        {checklist.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{checklist.descricao}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${checklist.cor}`}>
                        {checklist.categoria}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{checklist.usos}</span> usos
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{checklist.ultimoUso}</div>
                    </div>
                  </div>

                  {/* Prévia dos itens */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      {checklist.itens.length} itens neste checklist:
                    </p>
                    <div className="space-y-1">
                      {checklist.itens.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckSquare size={12} className="text-[#1E40AF]" />
                          <span>{item}</span>
                        </div>
                      ))}
                      {checklist.itens.length > 3 && (
                        <p className="text-xs text-gray-500 italic ml-5">
                          +{checklist.itens.length - 3} itens adicionais...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Button
                      className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChecklistSelecionado(checklist);
                        toast.success(`Checklist "${checklist.titulo}" selecionado!`);
                        setModalSelecionarChecklist(false);
                      }}
                    >
                      Selecionar este Checklist
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão para criar novo checklist */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full border-2 border-dashed border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50"
                onClick={() => {
                  setModalSelecionarChecklist(false);
                  setLocation("/checklist");
                }}
              >
                <Plus size={16} className="mr-2" /> Criar Novo Checklist
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalSelecionarChecklist(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

