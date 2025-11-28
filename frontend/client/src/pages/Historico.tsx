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
  ChevronRight,
  Calendar,
  Wrench,
  Package,
  DollarSign,
  MapPin,
  Clock,
  FileText,
  Filter,
  Download,
  Eye,
  Star,
  Phone,
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Historico() {
  const [, setLocation] = useLocation();
  const [notificationCount] = useState(3);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [servicoSelecionado, setServicoSelecionado] = useState<any>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Dados completos dos parceiros
  const parceirosInfo: Record<string, { avaliacao: number; horario: string; telefone: string }> = {
    "Auto Center Silva": { avaliacao: 4.8, horario: "Seg-Sex: 8h-18h | Sáb: 8h-12h", telefone: "(11) 98765-4321" },
    "Oficina Mecânica Santos": { avaliacao: 4.5, horario: "Seg-Sex: 8h-17h | Sáb: 8h-13h", telefone: "(11) 91234-5678" },
    "Centro Automotivo Oliveira": { avaliacao: 4.9, horario: "Seg-Sex: 7h-19h | Sáb: 7h-14h", telefone: "(11) 99876-5432" },
  };

  // Dados mockados
  const userName = "João da Silva";
  
  const veiculos = [
    { id: "todos", nome: "Todos os Veículos", placa: "" },
    { id: "1", nome: "Honda Civic 2020", placa: "ABC-1234" },
    { id: "2", nome: "Toyota Corolla 2019", placa: "XYZ-5678" },
    { id: "3", nome: "Ford Ka 2021", placa: "DEF-9012" },
  ];

  const historicoServicos = [
    {
      id: 1,
      veiculoId: "1",
      data: "2024-11-05",
      tipo: "Manutenção Preventiva",
      parceiro: "Auto Center Silva",
      endereco: "Rua das Flores, 123 - Centro",
      servicos: ["Troca de óleo", "Filtro de ar", "Revisão geral"],
      pecas: [
        { nome: "Óleo 5W30", quantidade: 4, valor: 180.0 },
        { nome: "Filtro de ar", quantidade: 1, valor: 45.0 },
      ],
      maoDeObra: 120.0,
      total: 345.0,
      status: "Concluído",
      observacoes: "Veículo em bom estado. Próxima revisão em 10.000 km.",
    },
    {
      id: 2,
      veiculoId: "1",
      data: "2024-10-15",
      tipo: "Reparo",
      parceiro: "Oficina Mecânica Santos",
      endereco: "Av. Principal, 456 - Jardim",
      servicos: ["Troca de pastilhas de freio", "Alinhamento"],
      pecas: [
        { nome: "Pastilhas de freio dianteiras", quantidade: 1, valor: 280.0 },
        { nome: "Pastilhas de freio traseiras", quantidade: 1, valor: 220.0 },
      ],
      maoDeObra: 150.0,
      total: 650.0,
      status: "Concluído",
      observacoes: "Freios apresentavam desgaste. Problema resolvido.",
    },
    {
      id: 3,
      veiculoId: "1",
      data: "2024-09-20",
      tipo: "Manutenção Preventiva",
      parceiro: "Auto Center Silva",
      endereco: "Rua das Flores, 123 - Centro",
      servicos: ["Balanceamento", "Rodízio de pneus"],
      pecas: [],
      maoDeObra: 100.0,
      total: 100.0,
      status: "Concluído",
      observacoes: "Pneus em bom estado.",
    },
    {
      id: 4,
      veiculoId: "2",
      data: "2024-11-01",
      tipo: "Reparo",
      parceiro: "Oficina do Zé",
      endereco: "Rua Comercial, 789 - Vila Nova",
      servicos: ["Troca de bateria", "Limpeza de terminais"],
      pecas: [
        { nome: "Bateria 60Ah", quantidade: 1, valor: 450.0 },
      ],
      maoDeObra: 50.0,
      total: 500.0,
      status: "Concluído",
      observacoes: "Bateria antiga não segurava carga.",
    },
    {
      id: 5,
      veiculoId: "3",
      data: "2024-10-25",
      tipo: "Manutenção Preventiva",
      parceiro: "Auto Center Silva",
      endereco: "Rua das Flores, 123 - Centro",
      servicos: ["Troca de óleo", "Filtro de óleo"],
      pecas: [
        { nome: "Óleo 10W40", quantidade: 3.5, valor: 140.0 },
        { nome: "Filtro de óleo", quantidade: 1, valor: 35.0 },
      ],
      maoDeObra: 80.0,
      total: 255.0,
      status: "Concluído",
      observacoes: "Primeira revisão após a compra.",
    },
  ];

  const veiculoAtual = veiculos.find((v) => v.id === veiculoSelecionado);
  const historicoFiltrado = historicoServicos
    .filter((h) => veiculoSelecionado === "todos" || h.veiculoId === veiculoSelecionado)
    .filter((h) => {
      if (filtroTipo === "todos") return true;
      if (filtroTipo === "manutencao") return h.tipo === "Manutenção Preventiva";
      if (filtroTipo === "reparo") return h.tipo === "Reparo";
      return true;
    });

  const totalGasto = historicoFiltrado.reduce((acc, h) => acc + h.total, 0);
  const totalServicos = historicoFiltrado.length;
  const totalPecas = historicoFiltrado.reduce(
    (acc, h) => acc + h.pecas.length,
    0
  );

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <MotoristaLayout userName={userName} notificationCount={notificationCount}>
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 md:mb-6">
          <Link href="/dashboard-motorista">
            <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Histórico</span>
        </div>

        {/* Page Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Histórico de Serviços
          </h1>
          <p className="text-gray-600">
            Visualize todo o histórico de manutenções e reparos dos seus veículos
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Seleção de Veículo */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o Veículo
              </label>
              <Select value={veiculoSelecionado} onValueChange={setVeiculoSelecionado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha um veículo" />
                </SelectTrigger>
                <SelectContent>
                  {veiculos.map((veiculo) => (
                    <SelectItem key={veiculo.id} value={veiculo.id}>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <span>{veiculo.nome}</span>
                        {veiculo.placa && <span className="text-gray-500">({veiculo.placa})</span>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Botão Exportar */}
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full md:w-auto border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF]/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>

        </div>

        {/* Tabela de Histórico */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {historicoFiltrado.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum histórico encontrado
              </h3>
              <p className="text-gray-600">
                Não há serviços registrados para este veículo com os filtros selecionados.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Parceiro</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Peça Trocada</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-center">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicoFiltrado.map((servico) => (
                  <TableRow key={servico.id}>
                    <TableCell className="font-medium">
                      {new Date(servico.data).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{servico.parceiro}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {servico.servicos[0]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {servico.pecas && servico.pecas.length > 0 ? (
                        <span className="text-sm">{servico.pecas[0].nome}</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{parceirosInfo[servico.parceiro]?.avaliacao || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-[#1E40AF]">
                      R$ {servico.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setServicoSelecionado(servico);
                          setModalAberto(true);
                        }}
                      >
                        <Eye className="h-4 w-4 text-[#1E40AF]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Modal de Detalhes */}
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Serviço</DialogTitle>
            </DialogHeader>
            {servicoSelecionado && (
              <div className="space-y-6">
                {/* Informações do Parceiro */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-[#1E40AF]">
                        {servicoSelecionado.parceiro.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{servicoSelecionado.parceiro}</h3>
                        <Badge className="bg-blue-100 text-blue-700 border-0">Verificado</Badge>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(parceirosInfo[servicoSelecionado.parceiro]?.avaliacao || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm ml-1 text-gray-700 font-medium">
                          {parceirosInfo[servicoSelecionado.parceiro]?.avaliacao || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600" />
                        <span className="text-sm text-gray-700">{servicoSelecionado.endereco}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 flex-shrink-0 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          {parceirosInfo[servicoSelecionado.parceiro]?.horario || "Consulte horários"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 flex-shrink-0 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          {parceirosInfo[servicoSelecionado.parceiro]?.telefone || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data e Status */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Data do Serviço</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(servicoSelecionado.data).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {servicoSelecionado.status}
                  </Badge>
                </div>

                {/* Serviços Realizados */}
                <div className="pb-4 border-b">
                  <h4 className="font-semibold text-gray-900 mb-2">Serviços Realizados</h4>
                  <div className="flex flex-wrap gap-2">
                    {servicoSelecionado.servicos.map((s: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="border-[#1E40AF] text-[#1E40AF]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Peças Trocadas */}
                {servicoSelecionado.pecas.length > 0 && (
                  <div className="pb-4 border-b">
                    <h4 className="font-semibold text-gray-900 mb-3">Peças Trocadas</h4>
                    <div className="space-y-2">
                      {servicoSelecionado.pecas.map((peca: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">
                              {peca.nome} (x{peca.quantidade})
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">R$ {peca.valor.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Valores */}
                <div className="pb-4 border-b">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mão de obra</span>
                      <span className="text-gray-900">R$ {servicoSelecionado.maoDeObra.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Peças</span>
                      <span className="text-gray-900">
                        R$ {servicoSelecionado.pecas.reduce((acc: number, p: any) => acc + p.valor, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-lg pt-2 border-t">
                      <span className="text-gray-900">Total</span>
                      <span className="text-[#1E40AF]">R$ {servicoSelecionado.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                {servicoSelecionado.observacoes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">Observações</h4>
                    <p className="text-sm text-gray-600">{servicoSelecionado.observacoes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MotoristaLayout>
  );
}
