import { useState } from "react";
import { Link, useLocation } from "wouter";
import MotoristaLayout from "@/components/MotoristaLayout";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Car,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  ChevronRight,
  DollarSign,
  Star,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AgendamentosMotorista() {
  const [, setLocation] = useLocation();
  const [notificationCount] = useState(3);
  const userName = "João da Silva";

  // Estado para seleção de veículo
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("todos");

  // Estado para modal de cancelamento
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<number | null>(null);

  // Estado para modal de avaliação
  const [avaliacaoDialogOpen, setAvaliacaoDialogOpen] = useState(false);
  const [agendamentoParaAvaliar, setAgendamentoParaAvaliar] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comentario, setComentario] = useState("");

  // Lista de veículos (mock)
  const veiculos = [
    { id: "todos", nome: "Todos os Veículos" },
    { id: "1", nome: "Honda Civic 2020", placa: "ABC-1234" },
    { id: "2", nome: "Toyota Corolla 2019", placa: "XYZ-5678" },
    { id: "3", nome: "Ford Ka 2021", placa: "DEF-9012" },
  ];

  // Dados mockados de agendamentos
  const agendamentos = [
    {
      id: 1,
      veiculoId: "1",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      servico: "Revisão dos 10.000 km",
      parceiro: "Auto Center Silva",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 98765-4321",
      data: "15/11/2024",
      hora: "09:00",
      status: "confirmado",
      observacoes: "Levar manual do veículo",
    },
    {
      id: 2,
      veiculoId: "1",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      servico: "Troca de pneus",
      parceiro: "Pneus Center",
      endereco: "Av. Principal, 789 - Jardim",
      telefone: "(11) 91234-5678",
      data: "20/11/2024",
      hora: "14:00",
      status: "pendente",
      observacoes: "Verificar alinhamento e balanceamento",
    },
    {
      id: 3,
      veiculoId: "2",
      veiculo: "Toyota Corolla 2019",
      placa: "XYZ-5678",
      servico: "Troca de óleo",
      parceiro: "Oficina do Zé",
      endereco: "Rua Comercial, 456 - Vila Nova",
      telefone: "(11) 99876-5432",
      data: "18/11/2024",
      hora: "10:30",
      status: "confirmado",
      observacoes: "Usar óleo sintético",
    },
    {
      id: 4,
      veiculoId: "3",
      veiculo: "Ford Ka 2021",
      placa: "DEF-9012",
      servico: "Revisão de freios",
      parceiro: "Oficina Mecânica Santos",
      endereco: "Av. Principal, 456 - Jardim",
      telefone: "(11) 98888-7777",
      data: "22/11/2024",
      hora: "15:30",
      status: "pendente",
      observacoes: "",
    },
  ];

  // Dados mockados de histórico de agendamentos
  const historicoAgendamentos = [
    {
      id: 101,
      veiculoId: "1",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      servico: "Revisão dos 5.000 km",
      parceiro: "Auto Center Silva",
      endereco: "Rua das Flores, 123 - Centro",
      data: "10/10/2024",
      hora: "10:00",
      status: "concluido",
      valor: 450.0,
    },
    {
      id: 102,
      veiculoId: "1",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      servico: "Troca de óleo",
      parceiro: "Oficina Mecânica Santos",
      endereco: "Av. Principal, 456 - Jardim",
      data: "15/09/2024",
      hora: "14:30",
      status: "concluido",
      valor: 280.0,
    },
    {
      id: 103,
      veiculoId: "2",
      veiculo: "Toyota Corolla 2019",
      placa: "XYZ-5678",
      servico: "Alinhamento e balanceamento",
      parceiro: "Pneus Center",
      endereco: "Av. Principal, 789 - Jardim",
      data: "20/08/2024",
      hora: "09:00",
      status: "concluido",
      valor: 180.0,
    },
    {
      id: 104,
      veiculoId: "1",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      servico: "Troca de pastilhas de freio",
      parceiro: "Auto Center Silva",
      endereco: "Rua das Flores, 123 - Centro",
      data: "05/07/2024",
      hora: "11:00",
      status: "concluido",
      valor: 620.0,
    },
    {
      id: 105,
      veiculoId: "3",
      veiculo: "Ford Ka 2021",
      placa: "DEF-9012",
      servico: "Lavagem completa",
      parceiro: "Lava Car Express",
      endereco: "Rua Comercial, 321 - Vila Nova",
      data: "01/11/2024",
      hora: "16:00",
      status: "cancelado",
      valor: null,
    },
  ];

  // Filtrar agendamentos por veículo
  const agendamentosFiltrados =
    veiculoSelecionado === "todos"
      ? agendamentos
      : agendamentos.filter((ag) => ag.veiculoId === veiculoSelecionado);

  // Ordenar por data
  const agendamentosOrdenados = [...agendamentosFiltrados].sort((a, b) => {
    const dataA = new Date(a.data.split("/").reverse().join("-"));
    const dataB = new Date(b.data.split("/").reverse().join("-"));
    return dataA.getTime() - dataB.getTime();
  });

  const handleLogout = () => {
    setLocation("/");
  };

  const handleCancelarAgendamento = (id: number) => {
    setAgendamentoParaCancelar(id);
    setCancelDialogOpen(true);
  };

  const confirmarCancelamento = () => {
    toast.success("Agendamento cancelado com sucesso!");
    setCancelDialogOpen(false);
    setAgendamentoParaCancelar(null);
  };

  const handleReagendarAgendamento = (id: number) => {
    toast.info("Funcionalidade de reagendamento em desenvolvimento");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmado
          </Badge>
        );
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case "cancelado":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <MotoristaLayout userName={userName} notificationCount={notificationCount}>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 md:mb-6">
          <Link href="/dashboard-motorista">
            <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Agendamentos</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Meus Agendamentos
          </h1>
          <p className="text-gray-600">
            Gerencie todos os seus agendamentos de serviços automotivos
          </p>
        </div>

        {/* Filtro de Veículo */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Veículo
              </label>
              <Select value={veiculoSelecionado} onValueChange={setVeiculoSelecionado}>
                <SelectTrigger className="w-full border-[#1E40AF] focus:ring-[#1E40AF]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {veiculos.map((veiculo) => (
                    <SelectItem key={veiculo.id} value={veiculo.id}>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-[#1E40AF]" />
                        {veiculo.nome}
                        {veiculo.placa && (
                          <span className="text-gray-500">({veiculo.placa})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => setLocation("/buscar")}
                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>
        </div>


        {/* Seção de Próximos Agendamentos */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximos Agendamentos</h2>
        </div>

        {/* Lista de Próximos Agendamentos */}
        <div className="space-y-4">
          {agendamentosOrdenados.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum agendamento encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Você não possui agendamentos para o veículo selecionado.
              </p>
              <Button
                onClick={() => setLocation("/buscar")}
                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
              >
                Buscar Serviços
              </Button>
            </div>
          ) : (
            agendamentosOrdenados.map((agendamento) => (
              <div
                key={agendamento.id}
                className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Informações Principais */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {agendamento.servico}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Car className="h-4 w-4" />
                          {agendamento.veiculo} ({agendamento.placa})
                        </div>
                      </div>
                      {getStatusBadge(agendamento.status)}
                    </div>

                    {/* Parceiro */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {agendamento.parceiro}
                          </p>
                          <p className="text-gray-600">{agendamento.endereco}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {agendamento.telefone}
                      </div>
                    </div>

                    {/* Data e Hora */}
                    <div className="flex flex-wrap gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-[#1E40AF]" />
                        <span className="font-medium text-gray-900">
                          {agendamento.data}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-[#1E40AF]" />
                        <span className="font-medium text-gray-900">{agendamento.hora}</span>
                      </div>
                    </div>

                    {/* Observações */}
                    {agendamento.observacoes && (
                      <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
                        <strong>Observações:</strong> {agendamento.observacoes}
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex md:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReagendarAgendamento(agendamento.id)}
                      className="flex-1 md:flex-none border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF]/10"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Reagendar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelarAgendamento(agendamento.id)}
                      className="flex-1 md:flex-none border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Seção de Histórico de Agendamentos */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Histórico de Agendamentos</h2>

          {/* Lista de Histórico */}
          <div className="space-y-4">
            {historicoAgendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Informações Principais */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {agendamento.servico}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Car className="h-4 w-4" />
                          {agendamento.veiculo} ({agendamento.placa})
                        </div>
                      </div>
                      {getStatusBadge(agendamento.status)}
                    </div>

                    {/* Parceiro */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {agendamento.parceiro}
                          </p>
                          <p className="text-gray-600">{agendamento.endereco}</p>
                        </div>
                      </div>
                    </div>

                    {/* Data e Valor */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-[#1E40AF]" />
                        <span className="font-medium text-gray-900">
                          {agendamento.data}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botão Avaliar */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white"
                      onClick={() => {
                        setAgendamentoParaAvaliar(agendamento.id);
                        setAvaliacaoDialogOpen(true);
                      }}
                    >
                      Avaliar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Modal de Cancelamento */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Agendamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              Voltar
            </Button>
            <Button
              onClick={confirmarCancelamento}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Confirmar Cancelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Avaliação */}
      <Dialog open={avaliacaoDialogOpen} onOpenChange={(open) => {
        setAvaliacaoDialogOpen(open);
        if (!open) {
          setRating(0);
          setHoverRating(0);
          setComentario("");
          setAgendamentoParaAvaliar(null);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Avaliar Serviço</DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com este serviço. Sua avaliação ajuda outros motoristas!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Sistema de Estrelas */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-gray-700">Como foi o serviço?</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600">
                  {rating === 1 && "Péssimo"}
                  {rating === 2 && "Ruim"}
                  {rating === 3 && "Regular"}
                  {rating === 4 && "Bom"}
                  {rating === 5 && "Ótimo"}
                </p>
              )}
            </div>

            {/* Campo de Comentário */}
            <div className="space-y-2">
              <label htmlFor="comentario" className="text-sm font-medium text-gray-700">
                Comentário (opcional)
              </label>
              <textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Conte-nos mais sobre sua experiência..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 text-right">
                {comentario.length}/500 caracteres
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAvaliacaoDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (rating === 0) {
                  toast.error("Por favor, selecione uma classificação");
                  return;
                }
                toast.success("Avaliação enviada com sucesso!");
                setAvaliacaoDialogOpen(false);
                setRating(0);
                setHoverRating(0);
                setComentario("");
                setAgendamentoParaAvaliar(null);
              }}
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
            >
              Enviar Avaliação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </MotoristaLayout>
  );
}
