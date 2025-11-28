import { useState } from "react";
import { Link, useLocation } from "wouter";
import MotoristaLayout from "@/components/MotoristaLayout";
import CadastroVeiculoModal from "@/components/CadastroVeiculoModal";
import EditarVeiculoModal from "@/components/EditarVeiculoModal";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Car,
  AlertTriangle,
  Calendar,
  DollarSign,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  FileText,
  Plus,
  Star,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MeusVeiculos() {
  const [, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount] = useState(3);
  const userName = "João da Silva";

  const handleLogout = () => {
    // Implementar lógica de logout
    setLocation("/login");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<any>(null);

  const handleModalSuccess = () => {
    // Aqui você pode recarregar a lista de veículos
    // Por enquanto, apenas fecha o modal
    setIsModalOpen(false);
  };

  const handleEditModalSuccess = () => {
    // Recarregar lista de veículos após edição
    setIsEditModalOpen(false);
    setVeiculoSelecionado(null);
  };

  const handleEditarVeiculo = (veiculo: any) => {
    setVeiculoSelecionado(veiculo);
    setIsEditModalOpen(true);
  };

  // Mapeamento de ícones
  const iconMap = {
    car: Car,
    alertTriangle: AlertTriangle,
    calendar: Calendar,
    dollarSign: DollarSign,
  };

  // Dados mockados de estatísticas
  const estatisticas = [
    {
      iconName: "car" as const,
      numero: "3",
      label: "Veículos Cadastrados",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      iconName: "alertTriangle" as const,
      numero: "2",
      label: "Alertas de Manutenção",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      iconName: "calendar" as const,
      numero: "1",
      label: "IPVA Vencendo",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      iconName: "dollarSign" as const,
      numero: "R$ 8.450,00",
      label: "Gastos Este Ano",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  // Dados mockados de veículos
  const veiculos = [
    {
      id: 1,
      foto: "/car-default.png",
      marca: "Honda",
      modelo: "Civic EXL",
      ano: 2022,
      cor: "Preto",
      motor: "2.0",
      placa: "ABC-1234",
      chassi: "9BWZZZ377VT004251",
      quilometragem: 45230,
      principal: true,
      alertas: [],
      ipva: {
        vencimento: "Março/2025",
        status: "pago",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      licenciamento: {
        vencimento: "31/12/2024",
        status: "válido",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      seguro: {
        vencimento: "15/11/2024",
        seguradora: "Porto Seguro",
        status: "ativo",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      ultimaRevisao: {
        data: "15/08/2024",
        status: "em dia",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
    },
    {
      id: 2,
      foto: "/car-default.png",
      marca: "Volkswagen",
      modelo: "Gol 1.6",
      ano: 2020,
      cor: "Branco",
      motor: "1.6",
      placa: "DEF-5678",
      chassi: "9BWAB05U8BP014568",
      quilometragem: 78450,
      principal: false,
      alertas: [
        { tipo: "warning", mensagem: "Revisão atrasada" },
        { tipo: "danger", mensagem: "IPVA vencido" },
      ],
      ipva: {
        vencimento: "Janeiro/2024",
        status: "vencido",
        statusCor: "text-red-600",
        badgeCor: "bg-red-100 text-red-800",
      },
      licenciamento: {
        vencimento: "31/12/2024",
        status: "válido",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      seguro: {
        vencimento: "20/03/2025",
        seguradora: "Bradesco Seguros",
        status: "ativo",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      ultimaRevisao: {
        data: "10/02/2024",
        status: "atrasada",
        statusCor: "text-red-600",
        badgeCor: "bg-red-100 text-red-800",
      },
    },
    {
      id: 3,
      foto: "/car-default.png",
      marca: "Toyota",
      modelo: "Corolla XEI",
      ano: 2023,
      cor: "Prata",
      motor: "2.0",
      placa: "GHI-9012",
      chassi: "9BR5N2JE0P8123456",
      quilometragem: 12500,
      principal: false,
      alertas: [],
      ipva: {
        vencimento: "Fevereiro/2025",
        status: "pendente",
        statusCor: "text-yellow-600",
        badgeCor: "bg-yellow-100 text-yellow-800",
      },
      licenciamento: {
        vencimento: "31/12/2024",
        status: "válido",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      seguro: {
        vencimento: "05/01/2025",
        seguradora: "Itaú Seguros",
        status: "ativo",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
      ultimaRevisao: {
        data: "20/09/2024",
        status: "em dia",
        statusCor: "text-green-600",
        badgeCor: "bg-green-100 text-green-800",
      },
    },
  ];

  return (
    <MotoristaLayout userName={userName} notificationCount={notificationCount}>
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 md:mb-6">
          <Link href="/dashboard-motorista">
            <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Meus Veículos</span>
        </div>

        {/* Cabeçalho da Página */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Meus Veículos
              </h1>
              <p className="text-gray-600">Gerencie seus veículos e acompanhe a manutenção.</p>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} className="mr-2" />
              Adicionar Veículo
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {estatisticas.map((stat, index) => {
            const IconComponent = iconMap[stat.iconName];
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <IconComponent className={stat.color} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{stat.numero}</p>
                    <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por modelo, placa..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Todos
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Com Alertas
              </button>
            </div>
          </div>
        </div>

        {/* Grid de Veículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {veiculos.map((veiculo) => (
            <div
              key={veiculo.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Cabeçalho do Card */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  {/* Badges do Veículo */}
                  <div className="flex flex-wrap gap-2">
                    {veiculo.principal && (
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                        <Star size={12} fill="white" />
                        Principal
                      </div>
                    )}

                  </div>

                  {/* Menu de Ações */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!veiculo.principal && (
                        <>
                          <DropdownMenuItem>
                            <Star size={16} className="mr-2" />
                            Definir como Principal
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem>
                        <FileText size={16} className="mr-2" />
                        Ver Histórico Completo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText size={16} className="mr-2" />
                        Relatório de Gastos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 size={16} className="mr-2" />
                        Remover Veículo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Informações Principais */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {veiculo.marca} {veiculo.modelo}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {veiculo.ano} | {veiculo.cor} | {veiculo.motor}
                  </p>
                  <div className="inline-block bg-gray-800 text-white px-4 py-1 rounded-lg font-mono font-bold">
                    {veiculo.placa}
                  </div>
                </div>
              </div>

              {/* Informações Detalhadas */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Chassi:</span>
                  <span className="font-mono text-gray-900 text-xs">{veiculo.chassi}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Quilometragem:</span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.quilometragem.toLocaleString("pt-BR")} km
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">IPVA:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{veiculo.ipva.vencimento}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${veiculo.ipva.badgeCor}`}>
                      {veiculo.ipva.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Licenciamento:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${veiculo.licenciamento.badgeCor}`}>
                    {veiculo.licenciamento.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Última Revisão:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 text-xs">{veiculo.ultimaRevisao.data}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${veiculo.ultimaRevisao.badgeCor}`}>
                      {veiculo.ultimaRevisao.status}
                    </span>
                  </div>
                </div>
              </div>



              {/* Botões de Ação */}
              <div className="p-6 pt-0 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEditarVeiculo(veiculo)}
                >
                  <Edit size={16} className="mr-2" />
                  Editar
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setLocation(`/veiculos/${veiculo.id}/historico`)}
                >
                  <FileText size={16} className="mr-2" />
                  Histórico
                </Button>
              </div>
            </div>
          ))}
        </div>

      {/* Modal de Cadastro de Veículo */}
      <CadastroVeiculoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      {/* Modal de Edição de Veículo */}
      <EditarVeiculoModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setVeiculoSelecionado(null);
        }}
        onSuccess={handleEditModalSuccess}
        veiculo={veiculoSelecionado}
      />
      </div>
    </MotoristaLayout>
  );
}
