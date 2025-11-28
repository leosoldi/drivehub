import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckCircle2,
  CreditCard,
  Wrench,
  Info,
  MessageCircle,
  Share2,
  Heart,
  Locate,
  Pencil,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Dados mockados do parceiro
const mockParceiroDetalhes = {
  id: 1,
  nome: "Auto Center Silva",
  tipo: "Oficina Mecânica",
  descricaoCurta: "Especializada em manutenção preventiva e corretiva com 15 anos de experiência",
  descricaoCompleta: `O Auto Center Silva atua há mais de 15 anos no mercado automotivo, oferecendo serviços de manutenção preventiva e corretiva com qualidade e transparência. Nossa equipe é formada por profissionais certificados e capacitados para atender todas as marcas e modelos de veículos.

Contamos com equipamentos modernos e peças de qualidade, garantindo a satisfação dos nossos clientes. Nosso compromisso é oferecer um serviço ágil, eficiente e com preços justos, sempre priorizando a segurança e o bem-estar dos motoristas.

Venha nos conhecer e confira por que somos referência em manutenção automotiva na região!`,
  endereco: {
    rua: "Rua das Flores, 123 - Centro",
    cidade: "Curitiba",
    estado: "Paraná",
    cep: "80000-000",
    referencia: "Próximo ao Shopping Center",
  },
  distancia: 2.5,
  avaliacao: 4.8,
  totalAvaliacoes: 234,
  aberto: true,
  horarioAtual: "Fecha às 18:00",
  telefone: "(41) 3333-4444",
  whatsapp: "(41) 99999-8888",
  email: "contato@autocentrosilva.com.br",
  verificado: true,
  imagemCapa: null,
  imagemPerfil: null,
  horarioFuncionamento: [
    { dia: "Segunda-feira", horario: "08:00 - 18:00", hoje: false },
    { dia: "Terça-feira", horario: "08:00 - 18:00", hoje: false },
    { dia: "Quarta-feira", horario: "08:00 - 18:00", hoje: true },
    { dia: "Quinta-feira", horario: "08:00 - 18:00", hoje: false },
    { dia: "Sexta-feira", horario: "08:00 - 18:00", hoje: false },
    { dia: "Sábado", horario: "08:00 - 12:00", hoje: false },
    { dia: "Domingo", horario: "Fechado", hoje: false },
  ],
  formasPagamento: [
    "Cartão de Crédito",
    "Cartão de Débito",
    "Pix",
    "Dinheiro",
    "Boleto",
    "Parcelamento em até 12x",
  ],
  servicosPrestados: [
    "Troca de óleo e filtros",
    "Revisão preventiva",
    "Alinhamento e balanceamento",
    "Freios (pastilhas e discos)",
    "Suspensão",
    "Sistema de arrefecimento",
    "Sistema elétrico",
    "Ar condicionado automotivo",
    "Diagnóstico eletrônico",
    "Troca de correia dentada",
  ],
  avaliacoes: [
    {
      id: 1,
      nome: "João Silva",
      avatar: null,
      data: "Há 2 dias",
      estrelas: 5,
      comentario: "Excelente atendimento! Profissionais competentes e preço justo. Super recomendo!",
      util: 12,
      resposta: {
        texto: "Obrigado pelo feedback, João! Ficamos felizes em atendê-lo.",
        data: "Há 1 dia",
      },
    },
    {
      id: 2,
      nome: "Maria Santos",
      avatar: null,
      data: "Há 5 dias",
      estrelas: 5,
      comentario: "Melhor oficina da região! Sempre faço a manutenção do meu carro aqui. Confiança total!",
      util: 8,
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      avatar: null,
      data: "Há 1 semana",
      estrelas: 4,
      comentario: "Bom serviço, mas o tempo de espera foi um pouco longo. No geral, recomendo.",
      util: 5,
      resposta: {
        texto: "Agradecemos o feedback, Pedro. Estamos trabalhando para melhorar nossos prazos!",
        data: "Há 6 dias",
      },
    },
  ],
  estatisticasAvaliacoes: {
    5: { quantidade: 200, percentual: 85 },
    4: { quantidade: 23, percentual: 10 },
    3: { quantidade: 7, percentual: 3 },
    2: { quantidade: 3, percentual: 1 },
    1: { quantidade: 1, percentual: 1 },
  },
};

export default function PerfilParceiro() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/parceiro/:id");
  const parceiro = mockParceiroDetalhes;
  const [modalRespostaOpen, setModalRespostaOpen] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<typeof parceiro.avaliacoes[0] | null>(null);
  const [textoResposta, setTextoResposta] = useState("");

  const handleVoltar = () => {
    setLocation("/buscar");
  };

  const handleAgendar = () => {
    alert("Modal de agendamento será implementado");
  };

  const handleOrcamento = () => {
    alert("Modal de orçamento será implementado");
  };

  const handleAbrirModalResposta = (avaliacao: typeof parceiro.avaliacoes[0]) => {
    setAvaliacaoSelecionada(avaliacao);
    setTextoResposta("");
    setModalRespostaOpen(true);
  };

  const handleEnviarResposta = () => {
    if (!textoResposta.trim()) {
      alert("Por favor, escreva uma resposta antes de enviar.");
      return;
    }
    // Aqui seria a lógica para salvar a resposta no banco de dados
    alert(`Resposta enviada com sucesso para ${avaliacaoSelecionada?.nome}!`);
    setModalRespostaOpen(false);
    setTextoResposta("");
    setAvaliacaoSelecionada(null);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />

      {/* Botão Voltar */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={handleVoltar}
          className="flex items-center gap-2 text-[#4169E1] hover:underline transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar aos resultados</span>
        </button>
      </div>

      {/* Seção Hero: Capa e Perfil */}
      <div className="relative w-full">
        {/* Imagem de Capa */}
        <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-r from-[#4169E1] to-[#FF8534] relative group">
          {parceiro.imagemCapa ? (
            <img
              src={parceiro.imagemCapa}
              alt={`Capa de ${parceiro.nome}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          )}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => alert("Modal de edição de imagem de capa")}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        {/* Container de Informações */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-24 md:-mt-32">
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {/* Foto de Perfil */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative group">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white shadow-lg bg-gradient-to-br from-[#4169E1] to-[#FF8534] flex items-center justify-center">
                        {parceiro.imagemPerfil ? (
                          <img
                            src={parceiro.imagemPerfil}
                            alt={parceiro.nome}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-4xl font-bold">
                            {parceiro.nome.charAt(0)}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                        onClick={() => alert("Modal de edição de foto de perfil")}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      {parceiro.verificado && (
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <div className="flex items-center gap-1 justify-center md:justify-start">
                        {renderStars(parceiro.avaliacao)}
                        <span className="ml-2 font-semibold text-lg">
                          {parceiro.avaliacao}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        ({parceiro.totalAvaliacoes} avaliações)
                      </p>
                    </div>
                  </div>

                  {/* Informações Principais */}
                  <div className="flex-1">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {parceiro.nome}
                          </h1>
                          <div className="flex items-center gap-2 mt-2">
                            <Wrench className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-600">{parceiro.tipo}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#4169E1] hover:bg-blue-50"
                          onClick={() => alert("Modal de edição de informações básicas")}
                        >
                          <Pencil className="w-5 h-5" />
                        </Button>
                      </div>

                      <p className="text-gray-700 text-base md:text-lg">
                        {parceiro.descricaoCurta}
                      </p>

                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {parceiro.endereco.rua}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Locate className="w-5 h-5 text-[#4169E1]" />
                          <span className="text-[#4169E1] font-medium">
                            A {parceiro.distancia} km de você
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {parceiro.aberto ? (
                            <>
                              <div className="w-3 h-3 bg-green-500 rounded-full" />
                              <span className="text-green-600 font-medium">
                                Aberto agora
                              </span>
                              <span className="text-gray-600">
                                • {parceiro.horarioAtual}
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 bg-red-500 rounded-full" />
                              <span className="text-red-600 font-medium">
                                Fechado
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <a
                            href={`tel:${parceiro.telefone}`}
                            className="text-gray-700 hover:text-[#4169E1] transition-colors"
                          >
                            {parceiro.telefone}
                          </a>
                          <a
                            href={`https://wa.me/${parceiro.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                          >
                            <MessageCircle className="w-5 h-5 text-green-500 hover:text-green-600 transition-colors" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-col gap-3 md:justify-center">
                    <Button
                      onClick={handleAgendar}
                      className="bg-[#4169E1] hover:bg-[#3558C7] text-white h-14 px-8 text-base font-semibold w-full md:w-[250px]"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Agendar Serviço
                    </Button>
                    <Button
                      onClick={handleOrcamento}
                      className="bg-[#FF8534] hover:bg-[#E67529] text-white h-14 px-8 text-base font-semibold w-full md:w-[250px]"
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      Solicitar Orçamento
                    </Button>
                    <div className="flex gap-2 justify-center md:justify-start mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Seções de Informações Detalhadas */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal (Esquerda) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seção Sobre */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl">
                  <div className="flex items-center gap-2">
                    <Info className="w-6 h-6 text-[#4169E1]" />
                    Sobre
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#4169E1] hover:bg-blue-50"
                    onClick={() => alert("Modal de edição de descrição")}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {parceiro.descricaoCompleta}
                </div>
              </CardContent>
            </Card>

            {/* Seção Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#4169E1]" />
                    Localização
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#4169E1] hover:bg-blue-50"
                    onClick={() => alert("Modal de edição de endereço")}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-700 font-medium">
                    {parceiro.endereco.rua}
                  </p>
                  <p className="text-gray-600">
                    {parceiro.endereco.cidade}, {parceiro.endereco.estado}
                  </p>
                  <p className="text-gray-600">CEP: {parceiro.endereco.cep}</p>
                  {parceiro.endereco.referencia && (
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {parceiro.endereco.referencia}
                    </p>
                  )}
                </div>

                {/* Mapa Placeholder */}
                <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Mapa será integrado aqui</p>
                    <Button variant="link" className="text-[#4169E1] mt-2">
                      Como chegar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção Serviços Prestados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-[#4169E1]" />
                    Serviços Prestados
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#4169E1] hover:bg-blue-50"
                    onClick={() => alert("Modal de edição de serviços")}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {parceiro.servicosPrestados.map((servico, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{servico}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seção Avaliações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="w-6 h-6 text-[#4169E1]" />
                  Avaliações dos Clientes
                  <Badge variant="secondary" className="ml-2">
                    {parceiro.totalAvaliacoes}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Resumo de Avaliações */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="text-center md:text-left">
                      <div className="text-5xl font-bold text-gray-900">
                        {parceiro.avaliacao}
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                        {renderStars(parceiro.avaliacao)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Baseado em {parceiro.totalAvaliacoes} avaliações
                      </p>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((estrela) => {
                        const stats = parceiro.estatisticasAvaliacoes[estrela as keyof typeof parceiro.estatisticasAvaliacoes];
                        return (
                          <div
                            key={estrela}
                            className="flex items-center gap-3"
                          >
                            <span className="text-sm text-gray-600 w-12">
                              {estrela} ★
                            </span>
                            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  estrela === 5
                                    ? "bg-green-500"
                                    : estrela === 4
                                      ? "bg-blue-500"
                                      : estrela === 3
                                        ? "bg-yellow-500"
                                        : estrela === 2
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                }`}
                                style={{ width: `${stats.percentual}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-12 text-right">
                              {stats.quantidade}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Lista de Avaliações */}
                <div className="space-y-6">
                  {parceiro.avaliacoes.map((avaliacao) => (
                    <div key={avaliacao.id} className="space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4169E1] to-[#FF8534] flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {avaliacao.nome.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {avaliacao.nome}
                              </p>
                              <p className="text-sm text-gray-500">
                                {avaliacao.data}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(avaliacao.estrelas)}
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2">
                            {avaliacao.comentario}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500"
                            >
                              👍 Útil ({avaliacao.util})
                            </Button>
                            {!avaliacao.resposta && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[#4169E1] border-[#4169E1] hover:bg-blue-50"
                                onClick={() => handleAbrirModalResposta(avaliacao)}
                              >
                                Responder
                              </Button>
                            )}
                          </div>

                          {avaliacao.resposta && (
                            <div className="mt-3 ml-4 p-4 bg-blue-50 border-l-4 border-[#4169E1] rounded">
                              <p className="text-sm font-semibold text-[#4169E1] mb-1">
                                Resposta da oficina
                              </p>
                              <p className="text-sm text-gray-700">
                                {avaliacao.resposta.texto}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {avaliacao.resposta.data}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Carregar mais avaliações
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral (Direita) */}
          <div className="space-y-6">
            {/* Seção Horário de Funcionamento */}
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#4169E1]" />
                    Horário de Funcionamento
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#4169E1] hover:bg-blue-50"
                    onClick={() => alert("Modal de edição de horários")}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parceiro.aberto ? (
                    <Badge className="bg-green-500 text-white w-full justify-center py-2 text-sm">
                      🟢 Aberto agora - {parceiro.horarioAtual}
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white w-full justify-center py-2 text-sm">
                      🔴 Fechado
                    </Badge>
                  )}

                  <div className="space-y-2 mt-4">
                    {parceiro.horarioFuncionamento.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center py-2 px-3 rounded ${
                          item.hoje ? "bg-blue-50 font-semibold" : ""
                        }`}
                      >
                        <span className="text-gray-700">
                          {item.dia}
                          {item.hoje && (
                            <Badge
                              variant="secondary"
                              className="ml-2 text-xs"
                            >
                              Hoje
                            </Badge>
                          )}
                        </span>
                        <span
                          className={
                            item.horario === "Fechado"
                              ? "text-red-600"
                              : "text-gray-900"
                          }
                        >
                          {item.horario}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção Formas de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#4169E1]" />
                    Formas de Pagamento
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#4169E1] hover:bg-blue-50"
                    onClick={() => alert("Modal de edição de formas de pagamento")}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {parceiro.formasPagamento.map((forma, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{forma}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Parcelamos em até 12x sem juros
                </p>
              </CardContent>
            </Card>

            {/* Widget de Contato */}
            <Card className="bg-gradient-to-br from-[#4169E1] to-[#3558C7] text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>Entre em Contato</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => alert("Modal de edição de contatos")}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(`tel:${parceiro.telefone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button
                  variant="secondary"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${parceiro.whatsapp.replace(/\D/g, "")}`,
                      "_blank"
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(`mailto:${parceiro.email}`)}
                >
                  Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal de Resposta */}
      <Dialog open={modalRespostaOpen} onOpenChange={setModalRespostaOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#4169E1]">
              Responder Avaliação
            </DialogTitle>
            <DialogDescription>
              Responda à avaliação de {avaliacaoSelecionada?.nome}
            </DialogDescription>
          </DialogHeader>

          {avaliacaoSelecionada && (
            <div className="space-y-4">
              {/* Avaliação Original */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">
                    {avaliacaoSelecionada.nome}
                  </p>
                  <div className="flex items-center gap-1">
                    {renderStars(avaliacaoSelecionada.estrelas)}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {avaliacaoSelecionada.data}
                </p>
                <p className="text-gray-700 mt-2">
                  {avaliacaoSelecionada.comentario}
                </p>
              </div>

              {/* Campo de Resposta */}
              <div className="space-y-2">
                <Label htmlFor="resposta" className="text-base font-semibold">
                  Sua Resposta
                </Label>
                <Textarea
                  id="resposta"
                  placeholder="Escreva sua resposta aqui..."
                  value={textoResposta}
                  onChange={(e) => setTextoResposta(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
                <p className="text-sm text-gray-500">
                  Sua resposta será visível publicamente na seção de avaliações.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setModalRespostaOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEnviarResposta}
              className="bg-[#4169E1] hover:bg-[#3558C7] text-white"
            >
              Enviar Resposta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
