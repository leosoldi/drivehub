import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MotoristaLayout from "@/components/MotoristaLayout";
import CadastroVeiculoModal from "@/components/CadastroVeiculoModal";
import EditarVeiculoModal from "@/components/EditarVeiculoModal";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";

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
  const { token } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount] = useState(3);
  const userName = "João da Silva";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<any>(null);

  // 🔥 VEÍCULOS REAIS (API)
  const [veiculos, setVeiculos] = useState<any[]>([]);

  // 📌 Buscar veículos do usuário logado
  useEffect(() => {
    async function loadVehicles() {
      try {
        if (!token) return;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const response = await api.get("/vehicle");
        setVeiculos(response.data);

      } catch (error) {
        console.error("Erro ao carregar veículos:", error);
      }
    }

    loadVehicles();
  }, [token]);

  // Após cadastrar → recarregar lista
  const handleModalSuccess = () => {
    setIsModalOpen(false);
    setTimeout(async () => {
      const res = await api.get("/vehicle");
      setVeiculos(res.data);
    }, 400);
  };

  // Após editar → recarregar lista
  const handleEditModalSuccess = () => {
    setIsEditModalOpen(false);
    setVeiculoSelecionado(null);

    setTimeout(async () => {
      const res = await api.get("/vehicle");
      setVeiculos(res.data);
    }, 400);
  };

  const handleEditarVeiculo = (v: any) => {
    const adaptado = {
      id: v.id,
      marca: v.vehicleBrand,
      modelo: v.vehicleModel,
      ano: v.vehicleYear,
      cor: v.vehicleColor,
      motor: v.vehicleEngine,
      placa: v.vehiclePlate,
      chassi: v.vehicleChassis ?? "",
      quilometragem: v.vehicleMileage ?? "",

      ipva: {
        vencimento: v.vehicleIpvaMonth && v.vehicleIpvaYear
          ? `${v.vehicleIpvaMonth}/${v.vehicleIpvaYear}`
          : "",
      },

      licenciamento: {
        vencimento: v.vehicleLicensing ?? "",
      },

      principal: v.isPrimaryVehicle ?? false,
    };

    setVeiculoSelecionado(adaptado);
    setIsEditModalOpen(true);
  };

  // Ícones
  const iconMap = {
    car: Car,
    alertTriangle: AlertTriangle,
    calendar: Calendar,
    dollarSign: DollarSign,
  };

  // Estatísticas mock (não mexi nisso)
  const estatisticas = [
    {
      iconName: "car" as const,
      numero: veiculos.length.toString(),
      label: "Veículos Cadastrados",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      iconName: "alertTriangle" as const,
      numero: "0",
      label: "Alertas de Manutenção",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      iconName: "calendar" as const,
      numero: "0",
      label: "IPVA Vencendo",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      iconName: "dollarSign" as const,
      numero: "R$ 0,00",
      label: "Gastos Este Ano",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <MotoristaLayout userName={userName} notificationCount={notificationCount}>
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 md:mb-6">
          <Link href="/dashboard-motorista">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Dashboard
            </span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Meus Veículos</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Meus Veículos
              </h1>
              <p className="text-gray-600">
                Gerencie seus veículos e acompanhe a manutenção.
              </p>
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

        {/* Estatísticas */}
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
                    <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                      {stat.numero}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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

        {/* Cards de Veículos (AGORA DA API) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {veiculos.map((veiculo) => (
            <div
              key={veiculo.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Header do Card */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">

                  {veiculo.isPrimaryVehicle && (
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                      <Star size={12} fill="white" />
                      Principal
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!veiculo.isPrimaryVehicle && (
                        <>
                          <DropdownMenuItem>
                            <Star size={16} className="mr-2" />
                            Definir como Principal
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}

                      <DropdownMenuItem>
                        <Edit size={16} className="mr-2" />
                        Editar Veículo
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="text-red-600">
                        <Trash2 size={16} className="mr-2" />
                        Remover Veículo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Infos principais */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {veiculo.vehicleBrand} {veiculo.vehicleModel}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {veiculo.vehicleYear} | {veiculo.vehicleColor} |{" "}
                    {veiculo.vehicleEngine}
                  </p>
                  <div className="inline-block bg-gray-800 text-white px-4 py-1 rounded-lg font-mono font-bold">
                    {veiculo.vehiclePlate}
                  </div>
                </div>
              </div>

              {/* Infos detalhadas */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Chassi:</span>
                  <span className="font-mono text-gray-900 text-xs">
                    {veiculo.vehicleChassis || "—"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quilometragem:</span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.vehicleMileage || "0"} km
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IPVA:</span>
                  <span className="text-gray-900">
                    {veiculo.vehicleIpvaMonth || "--"}/
                    {veiculo.vehicleIpvaYear || "----"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Licenciamento:</span>
                  <span className="text-gray-900">
                    {veiculo.vehicleLicensingDate || "--"}
                  </span>
                </div>
              </div>

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
                >
                  <FileText size={16} className="mr-2" />
                  Histórico
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Cadastrar */}
        <CadastroVeiculoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleModalSuccess}
        />

        {/* Modal Editar */}
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
