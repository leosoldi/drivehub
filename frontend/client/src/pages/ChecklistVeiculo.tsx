import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bell,
  Check,
  CheckSquare,
  ChevronRight,
  Clock,
  ClipboardList,
  GripVertical,
  MoreVertical,
  Pencil,
  Plus,
  Repeat,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import ChecklistModal from "@/components/ChecklistModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ParceiroSidebar from "@/components/ParceiroSidebar";
import { Menu, User, ChevronDown, LogOut, Settings, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function ChecklistVeiculo() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [filterSort, setFilterSort] = useState("Mais usado");

  // Form state for new checklist
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    novaCategoria: "",
    itens: [] as string[],
    novoItem: "",
  });

  const oficinaNome = "Auto Center Silva";

  const handleLogout = () => {
    setLocation("/");
  };

  // Mock data
  const checklists = [
    {
      id: 1,
      titulo: "Revisão dos 10.000 km",
      descricao: "Checklist completo para revisão preventiva aos 10 mil quilômetros rodados",
      categoria: "Revisão Geral",
      itens: [
        "Verificar nível de óleo",
        "Checar pressão dos pneus",
        "Testar funcionamento dos freios",
        "Inspecionar sistema de suspensão",
        "Verificar filtros de ar e combustível",
        "Checar bateria e sistema elétrico",
        "Inspecionar correias e mangueiras",
        "Verificar fluido de freio",
        "Testar luzes e sinalização",
        "Verificar alinhamento e balanceamento",
        "Inspecionar pastilhas de freio",
        "Verificar amortecedores",
      ],
      usos: 23,
      ultimoUso: "Há 2 dias",
      cor: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      titulo: "Inspeção de Freios",
      descricao: "Verificação completa do sistema de freios",
      categoria: "Freios",
      itens: [
        "Verificar espessura das pastilhas",
        "Inspecionar discos de freio",
        "Checar nível de fluido de freio",
        "Testar freio de mão",
        "Verificar mangueiras e conexões",
      ],
      usos: 45,
      ultimoUso: "Há 1 dia",
      cor: "bg-red-100 text-red-700",
    },
    {
      id: 3,
      titulo: "Checklist de Suspensão",
      descricao: "Inspeção completa do sistema de suspensão",
      categoria: "Suspensão",
      itens: [
        "Verificar amortecedores",
        "Inspecionar molas",
        "Checar buchas e coxins",
        "Verificar barras estabilizadoras",
        "Testar direção e folgas",
      ],
      usos: 18,
      ultimoUso: "Há 5 dias",
      cor: "bg-purple-100 text-purple-700",
    },
  ];

  const categorias = ["Revisão Geral", "Freios", "Suspensão", "Motor", "Elétrica", "Pintura"];

  const filteredChecklists = checklists.filter((checklist) => {
    const matchesSearch = checklist.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "Todas" || checklist.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdicionarItem = () => {
    if (formData.novoItem.trim()) {
      setFormData({
        ...formData,
        itens: [...formData.itens, formData.novoItem.trim()],
        novoItem: "",
      });
    }
  };

  const handleRemoverItem = (index: number) => {
    setFormData({
      ...formData,
      itens: formData.itens.filter((_, i) => i !== index),
    });
  };

  const handleCriarChecklist = () => {
    if (!formData.titulo || !formData.categoria || formData.itens.length === 0) {
      toast.error("Preencha todos os campos obrigatórios e adicione pelo menos um item");
      return;
    }
    toast.success("✅ Checklist criado com sucesso!");
    setModalOpen(false);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "",
      novaCategoria: "",
      itens: [],
      novoItem: "",
    });
  };

  const handleUsarChecklist = (checklist: any) => {
    setSelectedChecklist(checklist);
    setFullscreenModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-gray-200 shadow-sm">
        <ParceiroSidebar oficinaNome={oficinaNome} activePath="/checklist" />
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
            <button onClick={() => setLocation("/dashboard")} className="lg:hidden">
              <span className="cursor-pointer">
                <span className="text-2xl font-bold text-[#1E40AF]">Driv</span><span className="text-2xl font-bold text-[#F97316]">Hub</span>
              </span>
            </button>

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
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 rounded-full text-xs text-white">3</span>
              </Button>

              {/* User Menu */}
              <div className="relative">
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                    <button onClick={() => setLocation("/perfil")} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                      Meu Perfil
                    </button>
                    <button onClick={() => setLocation("/configuracoes")} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                      Configurações
                    </button>
                    <button onClick={() => setLocation("/ajuda")} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                      Ajuda
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => setLocation("/login")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600 flex items-center gap-2"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>

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
                  <ParceiroSidebar oficinaNome={oficinaNome} activePath="/checklist" />
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
          <span className="text-gray-600">Checklist Veículo</span>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checklists</h1>
          <p className="text-gray-600">Gerencie seus checklists de serviços e mantenha a qualidade dos trabalhos.</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar checklist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Select value={filterSort} onValueChange={setFilterSort}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mais usado">Mais usado</SelectItem>
                  <SelectItem value="Menos usado">Menos usado</SelectItem>
                  <SelectItem value="Mais recente">Mais recente</SelectItem>
                  <SelectItem value="Mais antigo">Mais antigo</SelectItem>
                  <SelectItem value="A-Z">A-Z</SelectItem>
                  <SelectItem value="Z-A">Z-A</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas">Todas as categorias</SelectItem>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => setModalOpen(true)}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 whitespace-nowrap"
              >
                <Plus size={16} /> Novo Checklist
              </Button>
            </div>
          </div>
        </div>

        {/* Checklists Grid */}
        <div>

          {filteredChecklists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChecklists.map((checklist) => (
                <div
                  key={checklist.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 ${checklist.cor} rounded-full text-xs font-semibold`}>
                      {checklist.categoria}
                    </span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{checklist.titulo}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{checklist.descricao}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ClipboardList size={14} />
                      <span>{checklist.itens.length} itens</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Repeat size={14} />
                      <span>{checklist.usos} usos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{checklist.ultimoUso}</span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 flex-1">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Itens do checklist:</p>
                    <div className="space-y-1">
                      {checklist.itens.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckSquare size={12} className="text-gray-400" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                      {checklist.itens.length > 3 && (
                        <p className="text-xs text-gray-500 italic">
                          ... e mais {checklist.itens.length - 3} itens
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
                    onClick={() => handleUsarChecklist(checklist)}
                  >
                    <Check size={16} /> Usar Checklist
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <ClipboardList className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterCategory !== "Todas" 
                  ? "Nenhum checklist encontrado"
                  : "Nenhum checklist criado ainda"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== "Todas"
                  ? "Tente ajustar os filtros ou criar um novo checklist"
                  : "Crie seu primeiro checklist para começar a organizar seus serviços"}
              </p>
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
              >
                <Plus size={16} /> Criar Primeiro Checklist
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Modal Fullscreen: Usar Checklist */}
      <ChecklistModal
        open={fullscreenModalOpen}
        onOpenChange={setFullscreenModalOpen}
        checklist={selectedChecklist}
      />

      {/* Modal: Novo Checklist */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <ClipboardList className="text-[#1E40AF]" size={24} />
              Criar Novo Checklist
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Checklist <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ex: Revisão dos 10.000 km"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Checklist</label>
              <Textarea
                placeholder="Descreva quando e como usar este checklist..."
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={3}
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria <span className="text-red-500">*</span>
              </label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="nova">+ Criar Nova Categoria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Itens do Checklist */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Itens do Checklist <span className="text-red-500">*</span>
              </label>
              
              {/* Add Item Input */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Digite um item do checklist..."
                  value={formData.novoItem}
                  onChange={(e) => setFormData({ ...formData, novoItem: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdicionarItem();
                    }
                  }}
                />
                <Button
                  onClick={handleAdicionarItem}
                  className="bg-[#1E40AF] hover:bg-[#1E3B8F] text-white gap-2 whitespace-nowrap"
                >
                  <Plus size={16} /> Adicionar
                </Button>
              </div>

              {/* Items List */}
              {formData.itens.length > 0 ? (
                <div className="border rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                  {formData.itens.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <GripVertical size={16} className="text-gray-400 cursor-move" />
                      <span className="flex-1 text-sm text-gray-900">{index + 1}. {item}</span>
                      <button
                        onClick={() => handleRemoverItem(index)}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-400">
                  <ClipboardList size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum item adicionado ainda</p>
                  <p className="text-xs">Digite um item acima e clique em "Adicionar"</p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                {formData.itens.length} {formData.itens.length === 1 ? "item adicionado" : "itens adicionados"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleCriarChecklist}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
              >
                <Check size={16} /> Criar Checklist
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

