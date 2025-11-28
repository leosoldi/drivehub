import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Car,
  ChevronDown,
  Calendar,
  Search,
  FileText,
  History,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MotoristaLayoutProps {
  children: ReactNode;
  userName?: string;
  notificationCount?: number;
}

export default function MotoristaLayout({
  children,
  userName = "João da Silva",
  notificationCount = 3,
}: MotoristaLayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setLocation("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo DrivHub - Desktop / Informações do Usuário - Mobile */}
      <div className="px-6 py-6 border-b">
        {/* Desktop: Logo DrivHub */}
        <div className="hidden lg:flex items-center justify-center">
          <span className="text-3xl font-bold">
            <span className="text-[#1E40AF]">Driv</span>
            <span className="text-[#F97316]">Hub</span>
          </span>
        </div>
        {/* Mobile: Informações do Usuário */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 text-base">{userName}</p>
            <p className="text-sm text-gray-500">Motorista</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-6 overflow-y-auto">
        <TooltipProvider>
          {/* 1. Visão Geral */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/dashboard-motorista"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/dashboard-motorista");
                  setMobileMenuOpen(false);
                }}
              >
                <Home className="h-5 w-5" />
                Visão Geral
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Visão geral do dashboard com estatísticas</p>
            </TooltipContent>
          </Tooltip>

          {/* 2. Meus Veículos */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/meus-veiculos"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/meus-veiculos");
                  setMobileMenuOpen(false);
                }}
              >
                <Car className="h-5 w-5" />
                Meus Veículos
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Gerenciar seus veículos cadastrados</p>
            </TooltipContent>
          </Tooltip>

          {/* 3. Agendamentos */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/agendamentos-motorista"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/agendamentos-motorista");
                  setMobileMenuOpen(false);
                }}
              >
                <Calendar className="h-5 w-5" />
                Agendamentos
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Visualizar e gerenciar seus agendamentos</p>
            </TooltipContent>
          </Tooltip>

          {/* 4. Buscar Serviços */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/buscar"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/buscar");
                  setMobileMenuOpen(false);
                }}
              >
                <Search className="h-5 w-5" />
                Buscar Serviços
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Encontrar oficinas e serviços automotivos</p>
            </TooltipContent>
          </Tooltip>

          {/* 5. Orçamentos */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/solicitacao-orcamento"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/solicitacao-orcamento");
                  setMobileMenuOpen(false);
                }}
              >
                <FileText className="h-5 w-5" />
                Orçamentos
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Visualizar e gerenciar orçamentos recebidos</p>
            </TooltipContent>
          </Tooltip>

          {/* 6. Histórico */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/historico"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/historico");
                  setMobileMenuOpen(false);
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

          {/* 7. Meu Perfil */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 px-6 h-14 text-base font-normal ${
                  location === "/meu-perfil-motorista"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocation("/meu-perfil-motorista");
                  setMobileMenuOpen(false);
                }}
              >
                <User className="h-5 w-5" />
                Meu Perfil
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Gerenciar informações pessoais e veículos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Logout Button at Bottom */}
      <div className="border-t p-6">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-14 text-base font-normal text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            handleLogout();
            setMobileMenuOpen(false);
          }}
        >
          <LogOut className="h-5 w-5" />
          Sair da conta
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar - Always visible on large screens */}
      <aside className="hidden lg:block w-72 border-r bg-white sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu de Navegação</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Mobile Only */}
              <Link href="/dashboard-motorista" className="lg:hidden">
                <span className="cursor-pointer">
                  <span className="text-2xl font-bold text-[#1E40AF]">Driv</span>
                  <span className="text-2xl font-bold text-[#F97316]">Hub</span>
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

                {/* User Menu - Hidden on mobile */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <span className="hidden md:inline font-medium">
                          {userName}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setLocation("/meu-perfil-motorista")}>
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("/configuracoes")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("/ajuda")}>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Ajuda
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Menu Button - Mobile Only (Right Side) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
