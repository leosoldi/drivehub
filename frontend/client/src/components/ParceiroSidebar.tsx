import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  User,
  Users,
  Calendar,
  Wrench,
  CheckSquare,
  Calculator,
  TrendingUp,
  Wallet,
  History,
  X,
} from "lucide-react";
import { useLocation } from "wouter";

interface ParceiroSidebarProps {
  oficinaNome: string;
  activePath?: string;
}

export default function ParceiroSidebar({ oficinaNome, activePath }: ParceiroSidebarProps) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  const menuItems = [
    { icon: BarChart3, label: "Visão Geral", path: "/dashboard" },
    { icon: User, label: "Meu Perfil", path: "/perfil-parceiro" },
    { icon: Users, label: "Clientes", path: "/clientes/novo" },
    { icon: Calendar, label: "Agenda", path: "/agendamentos/novo" },
    { icon: Wrench, label: "Ordem de Serviço", path: "/ordens-servico" },
    { icon: CheckSquare, label: "Checklist", path: "/checklist" },
    { icon: Calculator, label: "Orçamentos", path: "/orcamentos/novo" },
    { icon: TrendingUp, label: "Relatórios", path: "/relatorios" },
    { icon: Wallet, label: "Financeiro", path: "/financeiro" },
    { icon: History, label: "Histórico", path: "/historico-parceiro" },
  ];

  const tooltips: Record<string, string> = {
    "/dashboard": "Visão geral do dashboard com estatísticas e métricas",
    "/perfil-parceiro": "Visualizar e editar informações do perfil",
    "/clientes/novo": "Visualizar e gerenciar clientes cadastrados",
    "/agendamentos/novo": "Gerenciar agendamentos e compromissos",
    "/ordens-servico": "Gerenciar ordens de serviço em andamento",
    "/checklist": "Criar e gerenciar checklists de inspeção",
    "/orcamentos/novo": "Criar e gerenciar orçamentos para clientes",
    "/relatorios": "Visualizar relatórios e análises de desempenho",
    "/financeiro": "Controle financeiro e relatórios de receitas",
    "/historico-parceiro": "Histórico completo de serviços realizados",
  };

  return (
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
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;

          return (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                    isActive
                      ? "text-[#F97316] bg-[#FFF7ED] hover:bg-[#FFF7ED] hover:text-[#F97316]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setLocation(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tooltips[item.path]}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
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
}
