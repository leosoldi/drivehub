import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import MotoristaLayout from "@/components/MotoristaLayout";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ClipboardList,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ChevronRight,
  DollarSign,
  Wrench,
  Check,
  Car,
  MapPin,
  Star,
  ExternalLink,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { APP_LOGO, APP_TITLE } from "@/const";

export default function SolicitacaoOrcamento() {
  const [, setLocation] = useLocation();
  const [notificationCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrcamento, setSelectedOrcamento] = useState<any>(null);
  
  const userName = "João da Silva";
  
  // Dados mockados do motorista logado
  const motoristaLogado = {
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
  };
  
  // Dados mockados de veículos (para referência)
  const veiculosDetalhados: Record<string, any> = {
    "Honda Civic - ABC-1234": {
      marca: "Honda",
      modelo: "Civic",
      ano: 2020,
      cor: "Prata",
      placa: "ABC-1234",
      motor: "2.0 16V",
    },
    "Toyota Corolla - XYZ-5678": {
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2019,
      cor: "Branco",
      placa: "XYZ-5678",
      motor: "1.8 16V",
    },
  };

  const handleOpenModal = (orcamento: any) => {
    setSelectedOrcamento(orcamento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrcamento(null);
  };

  // Dados mockados completos dos parceiros
  const parceirosDetalhados: Record<string, any> = {
    "Auto Center Silva": {
      nome: "Auto Center Silva",
      avaliacao: 4.8,
      totalAvaliacoes: 234,
      endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
      horario: "Seg-Sex: 8h-18h | Sáb: 8h-12h",
      aberto: true,
      verificado: true,
    },
    "Oficina do João": {
      nome: "Oficina do João",
      avaliacao: 4.5,
      totalAvaliacoes: 156,
      endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      horario: "Seg-Sex: 9h-19h | Sáb: 9h-13h",
      aberto: true,
      verificado: true,
    },
    "MegaAuto Peças": {
      nome: "MegaAuto Peças",
      avaliacao: 4.9,
      totalAvaliacoes: 412,
      endereco: "Rua Augusta, 500 - Consolação, São Paulo - SP",
      horario: "Seg-Sáb: 8h-20h | Dom: 9h-14h",
      aberto: false,
      verificado: true,
    },
    "Mecânica Express": {
      nome: "Mecânica Express",
      avaliacao: 4.6,
      totalAvaliacoes: 189,
      endereco: "Rua da Consolação, 789 - Jardins, São Paulo - SP",
      horario: "Seg-Sex: 8h-17h",
      aberto: true,
      verificado: false,
    },
  };
  
  // Dados mockados de orçamentos solicitados
  const orcamentosSolicitados = [
    {
      id: "ORC-001",
      estabelecimento: "Auto Center Silva",
      veiculo: "Honda Civic - ABC-1234",
      servico: "Revisão Completa",
      descricao: "Revisão dos 30.000 km com troca de óleo e filtros",
      dataSolicitacao: "15/01/2025",
      status: "Respondido",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 850.00,
      servicosPecas: [
        { descricao: "Óleo sintético 5W30", quantidade: 4, valorUnitario: 45.00, valorTotal: 180.00 },
        { descricao: "Filtro de óleo", quantidade: 1, valorUnitario: 35.00, valorTotal: 35.00 },
        { descricao: "Filtro de ar", quantidade: 1, valorUnitario: 55.00, valorTotal: 55.00 },
        { descricao: "Filtro de combustível", quantidade: 1, valorUnitario: 80.00, valorTotal: 80.00 },
      ],
      maoObra: [
        { descricao: "Revisão completa 30.000 km", valor: 500.00 },
      ],
      subtotalServicos: 350.00,
      subtotalMaoObra: 500.00,
    },   {
      id: "ORC-002",
      estabelecimento: "Oficina do João",
      veiculo: "Toyota Corolla - XYZ-5678",
      servico: "Troca de Óleo",
      descricao: "Troca de óleo sintético e filtro de óleo",
      dataSolicitacao: "09/11/2025",
      status: "Respondido",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 450.0,
    },
    {
      id: "ORC-003",
      estabelecimento: "MegaAuto Peças",
      veiculo: "Honda Civic - ABC-1234",
      servico: "Alinhamento e Balanceamento",
      descricao: "Alinhamento e balanceamento das 4 rodas",
      dataSolicitacao: "08/11/2025",
      status: "Respondido",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 180.0,
    },
  ];

  // Dados mockados de histórico de orçamentos
  const historicoOrcamentos = [
    {
      id: "ORC-H001",
      estabelecimento: "Auto Center Silva",
      veiculo: "Honda Civic - ABC-1234",
      servico: "Troca de Pastilhas de Freio",
      dataSolicitacao: "05/11/2025",
      dataResposta: "06/11/2025",
      status: "Aprovado",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 320.0,
    },
    {
      id: "ORC-002",
      estabelecimento: "Oficina do João",
      veiculo: "Toyota Corolla - XYZ-5678",
      servico: "Troca de Óleo",
      descricao: "Troca de óleo sintético e filtro de óleo",
      dataSolicitacao: "09/11/2025",
      status: "Respondido",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 450.0,
      servicosPecas: [
        { descricao: "Óleo sintético 10W40", quantidade: 4, valorUnitario: 50.00, valorTotal: 200.00 },
        { descricao: "Filtro de óleo", quantidade: 1, valorUnitario: 40.00, valorTotal: 40.00 },
      ],
      maoObra: [
        { descricao: "Troca de óleo e filtro", valor: 210.00 },
      ],
      subtotalServicos: 240.00,
      subtotalMaoObra: 210.00,
    },
    {
      id: "ORC-003",
      estabelecimento: "MegaAuto Peças",
      veiculo: "Honda Civic - ABC-1234",
      servico: "Alinhamento e Balanceamento",
      descricao: "Alinhamento e balanceamento das 4 rodas",
      dataSolicitacao: "08/11/2025",
      status: "Respondido",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 180.0,
      servicosPecas: [
        { descricao: "Peso de balanceamento", quantidade: 8, valorUnitario: 5.00, valorTotal: 40.00 },
      ],
      maoObra: [
        { descricao: "Alinhamento computadorizado", valor: 70.00 },
        { descricao: "Balanceamento 4 rodas", valor: 70.00 },
      ],
      subtotalServicos: 40.00,
      subtotalMaoObra: 140.00,
    },
    {
      id: "ORC-H004",
      estabelecimento: "Auto Center Silva",
      veiculo: "Toyota Corolla - XYZ-5678",
      servico: "Troca de Pneus",
      dataSolicitacao: "25/10/2025",
      dataResposta: "26/10/2025",
      status: "Aprovado",
      statusCor: "bg-green-100 text-green-800",
      valorOrcado: 1200.0,
    },
  ];

  // Filtrar histórico
  const filteredHistorico = historicoOrcamentos.filter((orc) => {
    const matchesSearch =
      orc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orc.estabelecimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orc.servico.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Todos" || orc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MotoristaLayout userName={userName} notificationCount={notificationCount}>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 md:mb-6">
          <Link href="/dashboard-motorista">
            <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Solicitação de Orçamento</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Solicitação de Orçamento
            </h1>
            <p className="text-gray-600">
              Gerencie suas solicitações de orçamento e acompanhe as respostas dos parceiros
            </p>
          </div>
          <Button
            onClick={() => setLocation("/buscar")}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>

        {/* Orçamentos Solicitados */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Orçamentos Solicitados</h2>
            <Badge variant="secondary">{orcamentosSolicitados.length}</Badge>
          </div>

          {/* Cards de Orçamentos */}
          <div className="space-y-4">
            {orcamentosSolicitados.map((orc) => (
              <div
                key={orc.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-5"
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-lg flex-1">
                    {orc.estabelecimento}
                  </h3>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${orc.statusCor}`}>
                    {orc.status}
                  </span>
                </div>
                
                {/* Informações do Orçamento */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Car className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{orc.veiculo}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{orc.servico}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{orc.dataSolicitacao}</span>
                  </div>
                  {orc.valorOrcado && (
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-green-600">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orc.valorOrcado)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Botão Ver Detalhes */}
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50"
                  onClick={() => handleOpenModal(orc)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de Orçamentos */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Histórico de Orçamentos</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Buscar por ID, estabelecimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Recusado">Recusado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabela Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estabelecimento</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Serviço</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHistorico.map((orc) => (
                    <tr key={orc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{orc.estabelecimento}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{orc.servico}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orc.valorOrcado)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{orc.dataSolicitacao}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${orc.statusCor}`}>
                          {orc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleOpenModal(orc)}
                          className="p-1.5 text-gray-600 hover:text-[#1E40AF] hover:bg-blue-50 rounded"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards Mobile */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredHistorico.map((orc) => (
                <div key={orc.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{orc.id}</div>
                      <div className="text-sm text-gray-900 mt-1">{orc.estabelecimento}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${orc.statusCor}`}>
                      {orc.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-900 mb-2">{orc.servico}</div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orc.valorOrcado)}
                    </div>
                    <div className="text-xs text-gray-500">{orc.dataSolicitacao}</div>
                  </div>
                  <button className="w-full px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-1">
                    <Eye size={14} /> Ver Detalhes
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Modal de Solicitação de Orçamento */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F97316]">
              {selectedOrcamento?.status === "Aguardando Resposta" ? "Detalhes da Solicitação" : "Orçamento Recebido"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Informações do Parceiro */}
            {selectedOrcamento && parceirosDetalhados[selectedOrcamento.estabelecimento] && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-4">
                  {/* Foto do Perfil */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1E40AF]">
                        {parceirosDetalhados[selectedOrcamento.estabelecimento].nome.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Informações Básicas */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {parceirosDetalhados[selectedOrcamento.estabelecimento].nome}
                      </h3>
                      {parceirosDetalhados[selectedOrcamento.estabelecimento].verificado && (
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Avaliações */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {parceirosDetalhados[selectedOrcamento.estabelecimento].avaliacao.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({parceirosDetalhados[selectedOrcamento.estabelecimento].totalAvaliacoes} avaliações)
                      </span>
                    </div>
                    
                    {/* Endereço */}
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        {parceirosDetalhados[selectedOrcamento.estabelecimento].endereco}
                      </span>
                    </div>
                    
                    {/* Horário de Funcionamento */}
                    <div className="flex items-start gap-2 mb-3">
                      <Clock className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="text-gray-700">{parceirosDetalhados[selectedOrcamento.estabelecimento].horario}</span>
                        {parceirosDetalhados[selectedOrcamento.estabelecimento].aberto ? (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Aberto agora
                          </span>
                        ) : (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Fechado
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Status do Orçamento */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${selectedOrcamento.statusCor}`}>
                        {selectedOrcamento.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Botão Ver Perfil */}
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => {
                    toast.info("Redirecionando para o perfil do parceiro...");
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Perfil do Parceiro
                </Button>
              </div>
            )}
            
            {/* Seção de Dados do Veículo e Motorista */}
            {selectedOrcamento && veiculosDetalhados[selectedOrcamento.veiculo] && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">Informações da Solicitação</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Dados do Veículo:</p>
                    <p className="font-bold text-gray-900">
                      {veiculosDetalhados[selectedOrcamento.veiculo].marca} {veiculosDetalhados[selectedOrcamento.veiculo].modelo}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ano: {veiculosDetalhados[selectedOrcamento.veiculo].ano} • Cor: {veiculosDetalhados[selectedOrcamento.veiculo].cor}
                    </p>
                    <p className="text-sm text-gray-600">
                      Motor: {veiculosDetalhados[selectedOrcamento.veiculo].motor}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-200 rounded font-mono text-sm">
                      {veiculosDetalhados[selectedOrcamento.veiculo].placa}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Dados do Motorista:</p>
                    <p className="font-bold text-gray-900">{motoristaLogado.nome}</p>
                    <p className="text-sm text-gray-600">{motoristaLogado.telefone}</p>
                    <p className="text-sm text-gray-600">{motoristaLogado.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 space-y-4">
            {/* Veículo */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Veículo</Label>
              <Input
                value={selectedOrcamento?.veiculo || ""}
                disabled
                className="border-gray-300 bg-gray-50"
              />
            </div>
            
            {/* Tipo de Serviço */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Tipo de Serviço</Label>
              <Input
                value={selectedOrcamento?.servico || ""}
                disabled
                className="border-gray-300 bg-gray-50"
              />
            </div>
            
            {/* Descrição do Problema */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Descrição do Problema</Label>
              <Textarea
                value={selectedOrcamento?.descricao || ""}
                disabled
                className="border-gray-300 bg-gray-50 min-h-[100px]"
              />
            </div>
            
            {/* Data de Solicitação */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Data de Solicitação</Label>
              <Input
                value={selectedOrcamento?.dataSolicitacao || ""}
                disabled
                className="border-gray-300 bg-gray-50"
              />
            </div>
            
            {/* Detalhamento do Orçamento (apenas se respondido) */}
            {selectedOrcamento?.valorOrcado && selectedOrcamento.servicosPecas && (
              <div className="space-y-4">
                {/* Serviços e Peças */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Serviços e Peças</h3>
                  <div className="space-y-2">
                    {selectedOrcamento.servicosPecas.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.descricao}</p>
                          <p className="text-sm text-gray-600">Quantidade: {item.quantidade}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.valorTotal)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mão de Obra */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mão de Obra</h3>
                  <div className="space-y-2">
                    {selectedOrcamento.maoObra?.map((item: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-900">{item.descricao}</p>
                          <p className="font-semibold text-gray-900">
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.valor)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Resumo Financeiro */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Resumo do Orçamento</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal Serviços/Peças:</span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedOrcamento.subtotalServicos || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mão de Obra:</span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedOrcamento.subtotalMaoObra || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Desconto:</span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedOrcamento.desconto || 0)}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-[#1E40AF]">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedOrcamento.valorOrcado)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Validade do Orçamento */}
                {selectedOrcamento?.validade && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Validade do Orçamento</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Válido até:</span> {selectedOrcamento.validade}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Informações */}
            {selectedOrcamento?.status === "Aguardando Resposta" ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">ℹ️ Informação:</span><br />
                  O parceiro entrará em contato com você em até 24 horas com o orçamento detalhado.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">✅ Orçamento Recebido:</span><br />
                  O parceiro enviou o orçamento. Você pode aprovar ou recusar.
                </p>
              </div>
            )}
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="border-gray-300"
            >
              Fechar
            </Button>
            {selectedOrcamento?.valorOrcado && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success("Orçamento recusado");
                    handleCloseModal();
                  }}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Recusar
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Orçamento aprovado! O parceiro foi notificado.");
                    handleCloseModal();
                  }}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white"
                >
                  Aprovar Orçamento
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </MotoristaLayout>
  );
}
