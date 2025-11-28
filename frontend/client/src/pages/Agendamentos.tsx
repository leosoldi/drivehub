import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Calendar as CalendarIcon,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  LogOut,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Settings,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { toast } from "sonner";
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
import ParceiroSidebar from "@/components/ParceiroSidebar";
import { Menu } from "lucide-react";

export default function Agendamentos() {
  const [, setLocation] = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notificationCount] = useState(3);
  
  const handleLogout = () => {
    setLocation("/");
  };

  // Form state for new appointment
  const [formData, setFormData] = useState({
    placa: "",
    data: "",
    horario: "",
    duracao: "2h",
    servico: "",
    observacoes: "",
    enviarWhatsApp: true,
    enviarEmail: true,
  });

  const oficinaNome = "Auto Center Silva";

  // Mock data
  const agendamentos = [
    {
      id: 1,
      horario: "14:30",
      duracao: "2h",
      cliente: "João Silva",
      telefone: "(41) 99999-9999",
      email: "joao@email.com",
      veiculo: "Volkswagen Gol",
      placa: "ABC-1234",
      ano: "2020",
      cor: "Preto",
      motor: "1.6",
      servico: "Troca de óleo + Filtros",
      status: "Pendente",
      data: "21/10/2024",
    },
    {
      id: 2,
      horario: "09:00",
      duracao: "3h",
      cliente: "Maria Santos",
      telefone: "(41) 98888-8888",
      email: "maria@email.com",
      veiculo: "Fiat Uno",
      placa: "XYZ-5678",
      ano: "2019",
      cor: "Branco",
      motor: "1.0",
      servico: "Revisão completa",
      status: "Confirmado",
      data: "21/10/2024",
    },
  ];

  const filteredAgendamentos = filterStatus === "Todos" 
    ? agendamentos 
    : agendamentos.filter(a => a.status === filterStatus);

  const statusColors = {
    Pendente: { bg: "bg-orange-100", text: "text-orange-700", border: "border-l-orange-500" },
    Confirmado: { bg: "bg-blue-100", text: "text-blue-700", border: "border-l-blue-500" },
    Concluído: { bg: "bg-green-100", text: "text-green-700", border: "border-l-green-500" },
    Cancelado: { bg: "bg-red-100", text: "text-red-700", border: "border-l-red-500" },
  };

  const handleNovoAgendamento = () => {
    if (!formData.placa || !formData.data || !formData.horario || !formData.servico) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    toast.success("✅ Agendamento criado com sucesso!");
    setModalOpen(false);
    setFormData({
      placa: "",
      data: "",
      horario: "",
      duracao: "2h",
      servico: "",
      observacoes: "",
      enviarWhatsApp: true,
      enviarEmail: true,
    });
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, date: new Date(year, month - 1, prevMonthLastDay - i) });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) });
    }
    
    return days;
  };

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const calendarDays = getDaysInMonth(currentMonth);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <ParceiroSidebar oficinaNome={oficinaNome} activePath="/agendamentos/novo" />
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

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Drawer */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="right" className="w-64 p-0 lg:hidden">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menu de Navegação</SheetTitle>
                  </SheetHeader>
                  <ParceiroSidebar oficinaNome={oficinaNome} activePath="/agendamentos/novo" />
                </SheetContent>
              </Sheet>

              {/* Desktop - Nome do Estabelecimento */}
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
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setLocation("/dashboard")} className="text-[#1E40AF] hover:underline">
            Dashboard
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">Agendamentos</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600 mt-1">Agendamentos Hoje</div>
                <div className="text-xs text-gray-500 mt-1">21 de Outubro</div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarIcon className="text-[#1E40AF]" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">23</div>
                <div className="text-sm text-gray-600 mt-1">Concluídos este Mês</div>
                <div className="text-xs text-green-600 mt-1">+12% vs mês anterior</div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Check className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600 mt-1">Aguardando Confirmação</div>
                <div className="text-xs text-orange-600 mt-1">Requer atenção</div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="text-[#F97316]" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">18</div>
                <div className="text-sm text-gray-600 mt-1">Agendamentos esta Semana</div>
                <div className="text-xs text-gray-500 mt-1">Segunda a Domingo</div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CalendarIcon className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Calendar + Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar - Left Column */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-bold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <button
                onClick={() => {
                  setCurrentMonth(new Date());
                  setSelectedDate(new Date());
                }}
                className="w-full mb-4 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Hoje
              </button>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day names */}
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((dayObj, index) => {
                  const isCurrentDay = isToday(dayObj.date);
                  const isSelectedDay = isSelected(dayObj.date);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(dayObj.date)}
                      className={`
                        aspect-square p-2 text-sm rounded-lg transition-all
                        ${!dayObj.isCurrentMonth ? "text-gray-300" : "text-gray-900"}
                        ${isCurrentDay ? "border-2 border-[#1E40AF]" : ""}
                        ${isSelectedDay ? "bg-[#1E40AF] text-white font-bold" : "hover:bg-gray-100"}
                      `}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>{dayObj.day}</span>
                        {dayObj.isCurrentMonth && dayObj.day % 3 === 0 && (
                          <div className="flex gap-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Concluído</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Pendente</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Confirmado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List - Right Column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Agendamentos de Hoje
                  </h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                    {filteredAgendamentos.length}
                  </span>
                </div>
                <Button
                  onClick={() => setModalOpen(true)}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
                >
                  <Plus size={16} /> Novo Agendamento
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Todos", "Pendente", "Confirmado", "Concluído", "Cancelado"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filterStatus === status
                        ? "bg-[#1E40AF] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Appointments List */}
              <div className="space-y-4">
                {filteredAgendamentos.map((agendamento) => {
                  const colors = statusColors[agendamento.status as keyof typeof statusColors];
                  
                  return (
                    <div
                      key={agendamento.id}
                      className={`border-l-4 ${colors.border} bg-white rounded-xl p-4 md:p-6 shadow-sm transition-all`}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Time & Date Badge */}
                        <div className="flex-shrink-0 bg-gray-100 rounded-lg p-4 text-center md:w-32">
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-2">
                            <CalendarIcon size={12} />
                            <span>{agendamento.data}</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{agendamento.horario}</div>
                          <div className="text-xs text-gray-600 mt-1">~{agendamento.duracao}</div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          {/* Vehicle Info */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Car size={16} className="text-gray-600" />
                              <span className="font-bold text-gray-900">{agendamento.veiculo}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-900 rounded text-xs font-mono">
                                {agendamento.placa}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {agendamento.ano} | {agendamento.cor} | {agendamento.motor}
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                              <Wrench size={14} />
                              <span>{agendamento.servico}</span>
                            </div>
                          </div>

                          {/* Customer Info */}
                          <div className="flex flex-col sm:flex-row gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gray-600" />
                              <span className="font-semibold">{agendamento.cliente}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone size={14} />
                              <span>{agendamento.telefone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail size={14} />
                              <span>{agendamento.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex flex-col items-end gap-3">
                          <span className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-xs font-semibold`}>
                            {agendamento.status}
                          </span>

                          {agendamento.status === "Pendente" && (
                            <div className="flex flex-col gap-2 w-full md:w-auto">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white gap-1"
                                onClick={() => toast.success("Agendamento confirmado!")}
                              >
                                <Check size={14} /> Aceitar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50 gap-1"
                                onClick={() => toast.error("Agendamento recusado")}
                              >
                                <X size={14} /> Recusar
                              </Button>
                            </div>
                          )}

                          {agendamento.status === "Confirmado" && (
                            <Button
                              size="sm"
                              className="bg-[#1E40AF] hover:bg-[#1E3B8F] text-white"
                              onClick={() => toast.info("Serviço iniciado")}
                            >
                              Iniciar Serviço
                            </Button>
                          )}

                          <Button size="sm" variant="ghost">
                            <MoreVertical size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredAgendamentos.length === 0 && (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum agendamento para esta data
                  </h3>
                  <p className="text-gray-600 mb-4">Clique em "Novo Agendamento" para criar</p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
                  >
                    <Plus size={16} /> Novo Agendamento
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal: Novo Agendamento */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CalendarIcon className="text-[#1E40AF]" size={24} />
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
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="ABC-1234"
                    value={formData.placa}
                    onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                    className="pl-10 uppercase"
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
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.horario} onValueChange={(value) => setFormData({ ...formData, horario: value })}>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duração</label>
                  <Select value={formData.duracao} onValueChange={(value) => setFormData({ ...formData, duracao: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">30 minutos</SelectItem>
                      <SelectItem value="1h">1 hora</SelectItem>
                      <SelectItem value="1h30">1h 30min</SelectItem>
                      <SelectItem value="2h">2 horas</SelectItem>
                      <SelectItem value="3h">3 horas</SelectItem>
                      <SelectItem value="4h+">4+ horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Serviço */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Serviço</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serviço a ser Realizado <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Descreva o serviço"
                    value={formData.servico}
                    onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações Adicionais</label>
                  <Textarea
                    placeholder="Informações relevantes sobre o serviço..."
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Notificações */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.enviarWhatsApp}
                  onCheckedChange={(checked) => setFormData({ ...formData, enviarWhatsApp: checked as boolean })}
                />
                <label className="text-sm text-gray-700">Enviar confirmação por WhatsApp</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.enviarEmail}
                  onCheckedChange={(checked) => setFormData({ ...formData, enviarEmail: checked as boolean })}
                />
                <label className="text-sm text-gray-700">Enviar confirmação por E-mail</label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleNovoAgendamento}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
              >
                <Check size={16} /> Criar Agendamento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

