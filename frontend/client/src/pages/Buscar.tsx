import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Search,
  Wrench,
  Star,
  Clock,
  Navigation,
  SlidersHorizontal,
  Eye,
  Calendar,
  DollarSign,
  CheckCircle2,
  Check,
  Car,
} from "lucide-react";

// Dados mockados de parceiros
const mockParceiros = [
  {
    id: 1,
    nome: "Auto Center Silva",
    descricao: "Especializada em manutenção preventiva e corretiva com mais de 15 anos de experiência.",
    endereco: "Rua das Flores, 123 - Centro",
    distancia: 2.5,
    avaliacao: 4.8,
    totalAvaliacoes: 120,
    aberto: true,
    horario: "Seg-Sex: 8h às 18h | Sáb: 8h às 12h",
    servicos: ["Troca de óleo", "Freios", "Suspensão", "Revisão"],
    imagem: null,
    verificado: true,
  },
  {
    id: 2,
    nome: "Oficina Mecânica Santos",
    descricao: "Atendimento rápido e eficiente com equipe qualificada e peças originais.",
    endereco: "Av. Principal, 456 - Jardim",
    distancia: 3.2,
    avaliacao: 4.6,
    totalAvaliacoes: 85,
    aberto: true,
    horario: "Seg-Sex: 7h às 17h",
    servicos: ["Alinhamento", "Balanceamento", "Troca de óleo", "Ar condicionado"],
    imagem: null,
    verificado: true,
  },
  {
    id: 3,
    nome: "Autopeças Premium",
    descricao: "Peças originais e alternativas com garantia. Entrega rápida e preços competitivos.",
    endereco: "Rua Comercial, 789 - Vila Nova",
    distancia: 4.1,
    avaliacao: 4.9,
    totalAvaliacoes: 200,
    aberto: false,
    horario: "Seg-Sáb: 8h às 19h",
    servicos: ["Peças originais", "Peças alternativas", "Acessórios", "Entrega"],
    imagem: null,
    verificado: true,
  },
];

export default function Buscar() {
  const [, setLocation] = useLocation();
  const [searchLocation, setSearchLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [filterDistance, setFilterDistance] = useState(50);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [parceiros] = useState(mockParceiros);
  
  // Estados para os modais
  const [isAgendarModalOpen, setIsAgendarModalOpen] = useState(false);
  const [isOrcamentoModalOpen, setIsOrcamentoModalOpen] = useState(false);
  const [selectedParceiro, setSelectedParceiro] = useState<typeof mockParceiros[0] | null>(null);
  
  // Estados do formulário de agendamento
  const [agendamentoData, setAgendamentoData] = useState("");
  const [agendamentoHorario, setAgendamentoHorario] = useState("");
  const [agendamentoServico, setAgendamentoServico] = useState("");
  const [agendamentoObservacoes, setAgendamentoObservacoes] = useState("");
  const [agendamentoVeiculo, setAgendamentoVeiculo] = useState("");
  const [veiculoAgendamento, setVeiculoAgendamento] = useState<typeof veiculosCadastrados[0] | null>(null);
  
  // Estados do formulário de orçamento
  const [orcamentoServico, setOrcamentoServico] = useState("");
  const [orcamentoDescricao, setOrcamentoDescricao] = useState("");
  const [orcamentoVeiculo, setOrcamentoVeiculo] = useState("");
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<typeof veiculosCadastrados[0] | null>(null);
  
  // Dados mockados do motorista logado
  const motoristaLogado = {
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
  };
  
  // Dados mockados de veículos cadastrados do motorista
  const veiculosCadastrados = [
    {
      id: 1,
      marca: "Honda",
      modelo: "Civic",
      ano: 2020,
      cor: "Prata",
      placa: "ABC-1234",
      motor: "2.0 16V",
    },
    {
      id: 2,
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2019,
      cor: "Branco",
      placa: "XYZ-5678",
      motor: "1.8 16V",
    },
    {
      id: 3,
      marca: "Volkswagen",
      modelo: "Gol",
      ano: 2021,
      cor: "Preto",
      placa: "DEF-9012",
      motor: "1.0 12V",
    },
  ];

  const handleSearch = () => {
    console.log("Buscando...", { searchLocation, serviceType });
  };

  const handleUseLocation = () => {
    alert("Buscando sua localização...");
    // Aqui seria implementada a geolocalização real
  };

  const handleOpenAgendarModal = (parceiro: typeof mockParceiros[0]) => {
    setSelectedParceiro(parceiro);
    setIsAgendarModalOpen(true);
  };
  
  const handleOpenOrcamentoModal = (parceiro: typeof mockParceiros[0]) => {
    setSelectedParceiro(parceiro);
    setIsOrcamentoModalOpen(true);
  };
  
  const handleSubmitAgendamento = () => {
    console.log("Agendamento:", {
      parceiro: selectedParceiro?.nome,
      data: agendamentoData,
      horario: agendamentoHorario,
      servico: agendamentoServico,
      observacoes: agendamentoObservacoes,
    });
    alert(`Agendamento solicitado com ${selectedParceiro?.nome}!\nData: ${agendamentoData}\nHorário: ${agendamentoHorario}`);
    setIsAgendarModalOpen(false);
    // Limpar formulário
    setAgendamentoData("");
    setAgendamentoHorario("");
    setAgendamentoServico("");
    setAgendamentoObservacoes("");
  };
  
  const handleSubmitOrcamento = () => {
    console.log("Orçamento:", {
      parceiro: selectedParceiro?.nome,
      servico: orcamentoServico,
      descricao: orcamentoDescricao,
      veiculo: orcamentoVeiculo,
    });
    alert(`Orçamento solicitado para ${selectedParceiro?.nome}!\nServiço: ${orcamentoServico}`);
    setIsOrcamentoModalOpen(false);
    // Limpar formulário
    setOrcamentoServico("");
    setOrcamentoDescricao("");
    setOrcamentoVeiculo("");
  };

  const clearFilters = () => {
    setFilterName("");
    setFilterRating(0);
    setFilterDistance(50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <main className="flex-1">
        {/* Seção de Busca */}
        <section className="bg-gradient-to-br from-[#1E40AF]/5 to-[#1E40AF]/10 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Campo Localização */}
                <div className="md:col-span-4">
                  <Label htmlFor="search-location" className="text-gray-700 font-medium mb-2 block">
                    Localização
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="search-location"
                      type="text"
                      placeholder="Digite sua cidade ou CEP"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]"
                    />
                  </div>
                </div>

                {/* Campo Tipo de Serviço */}
                <div className="md:col-span-3">
                  <Label htmlFor="search-service" className="text-gray-700 font-medium mb-2 block">
                    Tipo de Serviço
                  </Label>
                  <div className="relative">
                    <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger 
                        id="search-service"
                        className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#F97316] focus:ring-[#F97316]"
                      >
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oficina">Oficina Mecânica</SelectItem>
                        <SelectItem value="autopecas">Autopeças</SelectItem>
                        <SelectItem value="guincho">Guincho</SelectItem>
                        <SelectItem value="lavacar">Lava-rápido</SelectItem>
                        <SelectItem value="funilaria">Funilaria e Pintura</SelectItem>
                        <SelectItem value="estetica">Estética Automotiva</SelectItem>
                        <SelectItem value="borracharia">Borracharia</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Botão Buscar */}
                <div className="md:col-span-3 flex items-end">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold h-12 rounded-xl"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Buscar
                  </Button>
                </div>

                {/* Botão Localização Atual */}
                <div className="md:col-span-2 flex items-end">
                  <Button
                    onClick={handleUseLocation}
                    variant="outline"
                    className="w-full border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF]/10 h-12 rounded-xl"
                  >
                    <Navigation className="h-5 w-5 mr-2" />
                    Usar GPS
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Filtros e Resultados */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sidebar de Filtros */}
                <aside className="lg:col-span-3">
                  <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
                    {/* Cabeçalho dos Filtros */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-gray-700" />
                        <h3 className="font-bold text-gray-900">Filtros</h3>
                      </div>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-[#1E40AF] hover:text-[#1E3A8A] font-medium"
                      >
                        Limpar
                      </button>
                    </div>

                    {/* Filtro por Nome */}
                    <div className="mb-6">
                      <Label htmlFor="filter-name" className="text-gray-700 font-medium mb-2 block">
                        Buscar por nome
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="filter-name"
                          type="text"
                          placeholder="Nome do estabelecimento..."
                          value={filterName}
                          onChange={(e) => setFilterName(e.target.value)}
                          className="pl-9 h-10 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    {/* Filtro por Avaliação */}
                    <div className="mb-6">
                      <Label className="text-gray-700 font-medium mb-3 block">
                        Avaliação mínima
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setFilterRating(rating)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              filterRating === rating
                                ? "bg-[#F97316] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {"⭐".repeat(rating)} {rating}+
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filtro por Distância */}
                    <div className="mb-6">
                      <Label htmlFor="filter-distance" className="text-gray-700 font-medium mb-2 block">
                        Raio de busca
                      </Label>
                      <Select value={filterDistance.toString()} onValueChange={(v) => setFilterDistance(Number(v))}>
                        <SelectTrigger className="h-10 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Até 1 km</SelectItem>
                          <SelectItem value="5">Até 5 km</SelectItem>
                          <SelectItem value="10">Até 10 km</SelectItem>
                          <SelectItem value="20">Até 20 km</SelectItem>
                          <SelectItem value="50">Até 50 km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Filtros Avançados */}
                    <div className="border-t pt-4">
                      <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="text-sm text-[#1E40AF] hover:text-[#1E3A8A] font-medium"
                      >
                        {showAdvancedFilters ? "Ocultar" : "Mostrar"} filtros avançados {showAdvancedFilters ? "▲" : "▼"}
                      </button>
                    </div>
                  </div>
                </aside>

                {/* Grid de Resultados */}
                <div className="lg:col-span-9">
                  {/* Cabeçalho dos Resultados */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Encontramos <span className="text-[#F97316]">{parceiros.length}</span> parceiros próximos a você
                    </h2>
                  </div>

                  {/* Grid de Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parceiros.map((parceiro) => (
                      <div
                        key={parceiro.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Imagem de Capa */}
                        <div className="h-32 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] relative">
                          {/* Foto de Perfil */}
                          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                              <span className="text-2xl font-bold text-[#1E40AF]">
                                {parceiro.nome.charAt(0)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="pt-12 px-6 pb-6">
                          {/* Nome e Badge */}
                          <div className="text-center mb-3">
                            <div className="flex items-center justify-center gap-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {parceiro.nome}
                              </h3>
                              {parceiro.verificado && (
                                <CheckCircle2 className="h-5 w-5 text-[#1E40AF]" />
                              )}
                            </div>
                          </div>

                          {/* Descrição */}
                          <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                            {parceiro.descricao}
                          </p>

                          {/* Informações */}
                          <div className="space-y-2 mb-4">
                            {/* Endereço */}
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{parceiro.endereco}</span>
                            </div>

                            {/* Distância */}
                            <div className="flex items-center gap-2 text-sm">
                              <Navigation className="h-4 w-4 text-[#1E40AF]" />
                              <span className="text-[#1E40AF] font-semibold">
                                A {parceiro.distancia} km de você
                              </span>
                            </div>

                            {/* Horário */}
                            <div className="flex items-start gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="text-gray-700">{parceiro.horario}</span>
                                {parceiro.aberto ? (
                                  <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                                    Aberto agora
                                  </span>
                                ) : (
                                  <span className="ml-2 inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                    Fechado
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Avaliação */}
                            <div className="flex items-center gap-2 text-sm">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(parceiro.avaliacao)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-bold text-gray-900">{parceiro.avaliacao}</span>
                              <span className="text-gray-500">({parceiro.totalAvaliacoes} avaliações)</span>
                            </div>
                          </div>

                          {/* Principais Serviços */}
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Principais serviços:</p>
                            <div className="flex flex-wrap gap-2">
                              {parceiro.servicos.slice(0, 4).map((servico, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-[#1E40AF]/10 text-[#1E40AF] text-xs font-medium rounded-lg"
                                >
                                  {servico}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Botões de Ação */}
                          <div className="space-y-2 pt-4 border-t">
                            {/* Linha 1: Perfil e Agendar */}
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[#1E40AF] border-[#1E40AF] hover:bg-[#1E40AF]/10"
                                onClick={() => setLocation(`/parceiro/${parceiro.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Perfil
                              </Button>
                              <Button
                                size="sm"
                                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
                                onClick={() => handleOpenAgendarModal(parceiro)}
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                Agendar
                              </Button>
                            </div>
                            {/* Linha 2: Solicitar Orçamento */}
                            <Button
                              size="sm"
                              className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                              onClick={() => handleOpenOrcamentoModal(parceiro)}
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Solicitar Orçamento
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Modal de Agendamento */}
      <Dialog open={isAgendarModalOpen} onOpenChange={setIsAgendarModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1E40AF]">
              Agendar Serviço
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Informações do Parceiro */}
            {selectedParceiro && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-4">
                  {/* Foto do Perfil */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1E40AF]">
                        {selectedParceiro.nome.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Informações Básicas */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {selectedParceiro.nome}
                      </h3>
                      {selectedParceiro.verificado && (
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Avaliações */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {selectedParceiro.avaliacao.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({selectedParceiro.totalAvaliacoes} avaliações)
                      </span>
                    </div>
                    
                    {/* Endereço */}
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        {selectedParceiro.endereco}
                      </span>
                    </div>
                    
                    {/* Horário de Funcionamento */}
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="text-gray-700">{selectedParceiro.horario}</span>
                        {selectedParceiro.aberto ? (
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
                  </div>
                </div>
              </div>
            )}

            {/* Serviço */}
            <div className="space-y-2">
              <Label htmlFor="agendamento-servico" className="text-gray-700 font-medium">
                Tipo de Serviço *
              </Label>
              <Select value={agendamentoServico} onValueChange={setAgendamentoServico}>
                <SelectTrigger id="agendamento-servico" className="border-gray-300">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {selectedParceiro?.servicos.map((servico) => (
                    <SelectItem key={servico} value={servico}>
                      {servico}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Seleção de Veículo */}
            <div className="space-y-2">
              <Label htmlFor="agendamento-veiculo" className="text-gray-700 font-medium">
                Selecione o Veículo *
              </Label>
              <Select 
                value={agendamentoVeiculo} 
                onValueChange={(value) => {
                  setAgendamentoVeiculo(value);
                  const veiculo = veiculosCadastrados.find(v => v.id.toString() === value);
                  setVeiculoAgendamento(veiculo || null);
                }}
              >
                <SelectTrigger id="agendamento-veiculo" className="border-gray-300">
                  <SelectValue placeholder="Escolha um veículo cadastrado" />
                </SelectTrigger>
                <SelectContent>
                  {veiculosCadastrados.map((veiculo) => (
                    <SelectItem key={veiculo.id} value={veiculo.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        {veiculo.marca} {veiculo.modelo} {veiculo.ano} - {veiculo.placa}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Seção de Dados do Veículo */}
            {veiculoAgendamento && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">Veículo encontrado!</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Dados do Veículo:</p>
                    <p className="font-bold text-gray-900">
                      {veiculoAgendamento.marca} {veiculoAgendamento.modelo}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ano: {veiculoAgendamento.ano} • Cor: {veiculoAgendamento.cor}
                    </p>
                    <p className="text-sm text-gray-600">
                      Motor: {veiculoAgendamento.motor}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-200 rounded font-mono text-sm">
                      {veiculoAgendamento.placa}
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
            
            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="agendamento-data" className="text-gray-700 font-medium">
                Data *
              </Label>
              <Input
                id="agendamento-data"
                type="date"
                value={agendamentoData}
                onChange={(e) => setAgendamentoData(e.target.value)}
                className="border-gray-300"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {/* Horário */}
            <div className="space-y-2">
              <Label htmlFor="agendamento-horario" className="text-gray-700 font-medium">
                Horário *
              </Label>
              <Select value={agendamentoHorario} onValueChange={setAgendamentoHorario}>
                <SelectTrigger id="agendamento-horario" className="border-gray-300">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="agendamento-observacoes" className="text-gray-700 font-medium">
                Observações (opcional)
              </Label>
              <Textarea
                id="agendamento-observacoes"
                placeholder="Descreva detalhes sobre o serviço ou seu veículo..."
                value={agendamentoObservacoes}
                onChange={(e) => setAgendamentoObservacoes(e.target.value)}
                className="border-gray-300 min-h-[100px]"
              />
            </div>
            
            {/* Informações do Parceiro */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Horário de funcionamento:</span><br />
                {selectedParceiro?.horario}
              </p>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAgendarModalOpen(false)}
              className="border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitAgendamento}
              disabled={!agendamentoData || !agendamentoHorario || !agendamentoServico}
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de Solicitar Orçamento */}
      <Dialog open={isOrcamentoModalOpen} onOpenChange={setIsOrcamentoModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F97316]">
              Solicitar Orçamento
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Informações do Parceiro */}
            {selectedParceiro && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-4">
                  {/* Foto do Perfil */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1E40AF]">
                        {selectedParceiro.nome.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Informações Básicas */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {selectedParceiro.nome}
                      </h3>
                      {selectedParceiro.verificado && (
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Avaliações */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {selectedParceiro.avaliacao.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({selectedParceiro.totalAvaliacoes} avaliações)
                      </span>
                    </div>
                    
                    {/* Endereço */}
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">
                        {selectedParceiro.endereco}
                      </span>
                    </div>
                    
                    {/* Horário de Funcionamento */}
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="text-gray-700">{selectedParceiro.horario}</span>
                        {selectedParceiro.aberto ? (
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
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 space-y-4">
            {/* Tipo de Serviço */}
            <div className="space-y-2">
              <Label htmlFor="orcamento-servico" className="text-gray-700 font-medium">
                Tipo de Serviço *
              </Label>
              <Select value={orcamentoServico} onValueChange={setOrcamentoServico}>
                <SelectTrigger id="orcamento-servico" className="border-gray-300">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {selectedParceiro?.servicos.map((servico) => (
                    <SelectItem key={servico} value={servico}>
                      {servico}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Seletor de Veículo */}
            <div className="space-y-2">
              <Label htmlFor="orcamento-veiculo" className="text-gray-700 font-medium">
                Selecione o Veículo *
              </Label>
              <Select 
                value={orcamentoVeiculo} 
                onValueChange={(value) => {
                  setOrcamentoVeiculo(value);
                  const veiculo = veiculosCadastrados.find(v => v.id.toString() === value);
                  setVeiculoSelecionado(veiculo || null);
                }}
              >
                <SelectTrigger id="orcamento-veiculo" className="border-gray-300">
                  <SelectValue placeholder="Escolha um veículo cadastrado" />
                </SelectTrigger>
                <SelectContent>
                  {veiculosCadastrados.map((veiculo) => (
                    <SelectItem key={veiculo.id} value={veiculo.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        {veiculo.marca} {veiculo.modelo} {veiculo.ano} - {veiculo.placa}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Seção de Dados do Veículo */}
            {veiculoSelecionado && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">Veículo encontrado!</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Dados do Veículo:</p>
                    <p className="font-bold text-gray-900">
                      {veiculoSelecionado.marca} {veiculoSelecionado.modelo}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ano: {veiculoSelecionado.ano} • Cor: {veiculoSelecionado.cor}
                    </p>
                    <p className="text-sm text-gray-600">
                      Motor: {veiculoSelecionado.motor}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-200 rounded font-mono text-sm">
                      {veiculoSelecionado.placa}
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
            
            {/* Descrição do Problema */}
            <div className="space-y-2">
              <Label htmlFor="orcamento-descricao" className="text-gray-700 font-medium">
                Descrição do Problema *
              </Label>
              <Textarea
                id="orcamento-descricao"
                placeholder="Descreva detalhadamente o problema ou serviço que precisa..."
                value={orcamentoDescricao}
                onChange={(e) => setOrcamentoDescricao(e.target.value)}
                className="border-gray-300 min-h-[120px]"
              />
            </div>
            
            {/* Informações */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">ℹ️ Informação:</span><br />
                O parceiro entrará em contato com você em até 24 horas com o orçamento detalhado.
              </p>
            </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOrcamentoModalOpen(false)}
              className="border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitOrcamento}
              disabled={!orcamentoServico || !orcamentoVeiculo || !orcamentoDescricao}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Enviar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
