import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Check,
  X,
  Car,
  User,
  Phone,
  Mail,
  ClipboardList,
  FileText,
  Wrench,
  Camera,
  Trash2,
  Edit,
  Save,
  Flag,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ChecklistItem {
  id: number;
  descricao: string;
}

interface Peca {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  foto?: string;
}

interface ChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklist: {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    itens: string[];
  } | null;
}

export default function ChecklistModal({
  open,
  onOpenChange,
  checklist,
}: ChecklistModalProps) {
  const [placa, setPlaca] = useState("");
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(false);
  const [itensChecados, setItensChecados] = useState<{ [key: number]: boolean }>({});
  const [pecasPorItem, setPecasPorItem] = useState<{ [key: number]: Peca[] }>({});
  const [observacoes, setObservacoes] = useState("");
  const [modalPecaAberto, setModalPecaAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [novaPeca, setNovaPeca] = useState({
    descricao: "",
    quantidade: 1,
    valorUnitario: 0,
    foto: "",
  });

  // Mock data do veículo
  const veiculo = {
    marca: "Volkswagen",
    modelo: "Gol",
    ano: "2020",
    cor: "Preto",
    motor: "1.6",
    km: "10.500",
    proprietario: {
      nome: "João da Silva",
      telefone: "(41) 99999-9999",
      email: "joao@email.com",
      ultimaVisita: "15/09/2024",
    },
  };

  const progresso = checklist
    ? (Object.values(itensChecados).filter(Boolean).length / checklist.itens.length) * 100
    : 0;

  const totalItens = checklist?.itens.length || 0;
  const itensMarcados = Object.values(itensChecados).filter(Boolean).length;

  const handleBuscarPlaca = () => {
    if (placa.length >= 7) {
      setVeiculoEncontrado(true);
      toast.success("✅ Veículo encontrado!");
    } else {
      toast.error("Digite uma placa válida");
    }
  };

  const handleToggleItem = (index: number) => {
    setItensChecados((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAbrirModalPeca = (index: number) => {
    setItemSelecionado(index);
    setModalPecaAberto(true);
  };

  const handleAdicionarPeca = () => {
    if (!novaPeca.descricao || novaPeca.quantidade <= 0 || novaPeca.valorUnitario <= 0) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (itemSelecionado !== null) {
      const peca: Peca = {
        id: Date.now().toString(),
        ...novaPeca,
      };

      setPecasPorItem((prev) => ({
        ...prev,
        [itemSelecionado]: [...(prev[itemSelecionado] || []), peca],
      }));

      toast.success("✅ Peça adicionada!");
      setModalPecaAberto(false);
      setNovaPeca({ descricao: "", quantidade: 1, valorUnitario: 0, foto: "" });
    }
  };

  const handleRemoverPeca = (itemIndex: number, pecaId: string) => {
    setPecasPorItem((prev) => ({
      ...prev,
      [itemIndex]: prev[itemIndex].filter((p) => p.id !== pecaId),
    }));
    toast.success("Peça removida");
  };

  const handleFinalizar = () => {
    if (!veiculoEncontrado) {
      toast.error("Busque o veículo pela placa antes de finalizar");
      return;
    }

    if (itensMarcados === 0) {
      toast.error("Marque pelo menos um item antes de finalizar");
      return;
    }

    // Abrir pop-up de confirmação
    setModalConfirmacaoAberto(true);
  };

  const handleApenasFinalizarChecklist = () => {
    toast.success(`✅ Checklist "${checklist?.titulo}" finalizado com sucesso!`);
    setModalConfirmacaoAberto(false);
    onOpenChange(false);
  };

  const handleCriarOrcamento = () => {
    toast.success("💰 Redirecionando para criar orçamento...");
    setModalConfirmacaoAberto(false);
    onOpenChange(false);
    // TODO: Implementar navegação para página de orçamento
  };

  const handleSalvarRascunho = () => {
    toast.success("💾 Rascunho salvo!");
  };

  const totalPecasValor = Object.values(pecasPorItem)
    .flat()
    .reduce((acc, peca) => acc + peca.quantidade * peca.valorUnitario, 0);

  if (!checklist) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] md:max-h-[90vh] h-full md:h-auto overflow-y-auto w-full md:w-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>Aplicando Checklist: {checklist.titulo}</DialogTitle>
          </DialogHeader>

          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Aplicando Checklist: <span className="text-[#F97316]">{checklist.titulo}</span>
            </h2>
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            
            {/* Barra de Progresso */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">
                  {itensMarcados} de {totalItens} itens verificados
                </span>
                <span className="text-sm font-semibold text-gray-900">{Math.round(progresso)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300 ease-in-out rounded-full"
                  style={{ 
                    width: `${progresso}%`,
                    backgroundColor: 'oklch(21% .034 264.665)'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 py-4">
              {/* SEÇÃO 1: Dados do Veículo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Dados do Veículo</h3>
                
                <div className="flex gap-2 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placa do Veículo <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="ABC-1234"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                      maxLength={8}
                      autoFocus
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleBuscarPlaca}
                      className="bg-[#1E40AF] hover:bg-[#1E3B8F] text-white"
                    >
                      <Search size={16} className="mr-2" /> Buscar
                    </Button>
                  </div>
                </div>

                {veiculoEncontrado && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3 text-green-600">
                      <Check size={18} />
                      <span className="font-semibold">Veículo encontrado!</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Dados do Veículo:</p>
                        <p className="font-bold text-gray-900">{veiculo.marca} {veiculo.modelo}</p>
                        <p className="text-sm text-gray-600">Ano: {veiculo.ano} • Cor: {veiculo.cor}</p>
                        <p className="text-sm text-gray-600">Motor: {veiculo.motor}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-gray-200 rounded font-mono text-sm">{placa}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Dados do Cliente:</p>
                        <p className="font-bold text-gray-900">{veiculo.proprietario.nome}</p>
                        <p className="text-sm text-gray-600">{veiculo.proprietario.telefone}</p>
                        <p className="text-sm text-gray-600">{veiculo.proprietario.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SEÇÃO 2: Itens do Checklist */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Itens do Checklist</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Marque cada item conforme for verificando. Adicione peças se necessário.
                </p>

                <div className="space-y-2">
                  {checklist.itens.map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gray-50 border rounded-lg p-3 transition-all ${
                        itensChecados[index] ? "border-green-300 bg-green-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggleItem(index)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                            itensChecados[index]
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 bg-white hover:border-green-400"
                          }`}
                        >
                          {itensChecados[index] && <Check size={14} className="text-white" />}
                        </button>
                        
                        {/* Número + Descrição */}
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-500">{index + 1}.</span>
                          <p
                            className={`text-sm ${
                              itensChecados[index] ? "text-gray-500 line-through" : "text-gray-900"
                            }`}
                          >
                            {item}
                          </p>
                        </div>

                        {/* Botão Adicionar Peça */}
                        <button
                          onClick={() => handleAbrirModalPeca(index)}
                          className="relative p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Adicionar peça"
                        >
                          <Wrench size={16} className={pecasPorItem[index]?.length > 0 ? "text-orange-600" : "text-gray-600"} />
                          {pecasPorItem[index]?.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center">
                              {pecasPorItem[index].length}
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Lista de Peças */}
                      {pecasPorItem[index]?.length > 0 && (
                        <div className="mt-4 bg-orange-50 rounded-lg p-4 border border-orange-200">
                          <p className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                            <Wrench size={16} className="text-orange-600" />
                            Peças/Problemas identificados:
                            <span className="px-2 py-0.5 bg-orange-500 text-white rounded-full text-xs">
                              {pecasPorItem[index].length}
                            </span>
                          </p>
                          <div className="space-y-2">
                            {pecasPorItem[index].map((peca) => (
                              <div
                                key={peca.id}
                                className="bg-white rounded-lg p-3 flex items-center gap-3 border border-orange-100"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{peca.descricao}</p>
                                  <p className="text-sm text-gray-600">
                                    {peca.quantidade} unidade(s) × R${" "}
                                    {peca.valorUnitario.toFixed(2)} ={" "}
                                    <span className="font-bold text-green-600">
                                      R$ {(peca.quantidade * peca.valorUnitario).toFixed(2)}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button className="p-2 hover:bg-gray-100 rounded text-gray-600">
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleRemoverPeca(index, peca.id)}
                                    className="p-2 hover:bg-red-100 rounded text-red-600"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SEÇÃO 4: Observações */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Observações</h3>
                <Textarea
                  placeholder="Adicione informações relevantes sobre este checklist, recomendações para o cliente, condições do veículo, etc..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows={4}
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{observacoes.length}/1000</p>
              </div>

              {/* SEÇÃO 5: Ordem de Serviço */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Ordem de Serviço Gerada</h3>
                <p className="text-sm text-gray-600 mb-3">
                  A finalização deste checklist irá gerar a seguinte Ordem de Serviço:
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número da OS:</label>
                    <Input
                      value="#2024-1023-1"
                      readOnly
                      className="bg-gray-100 font-mono font-bold w-48"
                    />
                  </div>
                  <div className="mt-6">
                    <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      Em Inspeção
                    </span>
                  </div>
                </div>
              </div>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={handleSalvarRascunho}>
                  <FileText size={16} /> Salvar Rascunho
                </Button>
                <Button
                  onClick={handleFinalizar}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
                  disabled={!veiculoEncontrado || itensMarcados === 0}
                >
                  <Check size={16} /> Finalizar Checklist
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal: Adicionar Peça */}
      <Dialog open={modalPecaAberto} onOpenChange={setModalPecaAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Wrench className="text-[#F97316]" size={24} />
              Adicionar Peça/Problema
            </DialogTitle>
            {itemSelecionado !== null && (
              <p className="text-sm text-gray-600 mt-1">
                Item {itemSelecionado + 1}: {checklist.itens[itemSelecionado]}
              </p>
            )}
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Campo Foto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto do Problema (Opcional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-sm text-gray-600">Tirar Foto ou Selecionar Imagem</p>
              </div>
            </div>

            {/* Campo Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Problema/Peça <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Ex: Pastilha de freio desgastada, necessário substituição..."
                value={novaPeca.descricao}
                onChange={(e) => setNovaPeca({ ...novaPeca, descricao: e.target.value })}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{novaPeca.descricao.length}/500</p>
            </div>

            {/* Campos Quantidade e Valor */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={novaPeca.quantidade}
                  onChange={(e) =>
                    setNovaPeca({ ...novaPeca, quantidade: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Unitário (R$) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={novaPeca.valorUnitario}
                  onChange={(e) =>
                    setNovaPeca({ ...novaPeca, valorUnitario: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            {/* Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-2xl font-bold text-green-600">
                  R$ {(novaPeca.quantidade * novaPeca.valorUnitario).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setModalPecaAberto(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAdicionarPeca}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
              disabled={
                !novaPeca.descricao || novaPeca.quantidade <= 0 || novaPeca.valorUnitario <= 0
              }
            >
              <Check size={16} />
              Adicionar Peça
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal: Confirmação de Finalização */}
      <Dialog open={modalConfirmacaoAberto} onOpenChange={setModalConfirmacaoAberto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-green-600">
              <Check className="h-6 w-6" />
              Checklist Concluído!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-gray-700">
              {(() => {
                const totalPecas = Object.values(pecasPorItem).flat().length;
                return totalPecas > 0
                  ? `Foram identificadas ${totalPecas} peça(s) que precisam ser trocadas.`
                  : "Nenhuma peça foi identificada para troca.";
              })()}
            </p>
            
            {Object.values(pecasPorItem).flat().length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800 font-medium">
                  💡 Deseja criar um orçamento com as peças identificadas?
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleApenasFinalizarChecklist}
              className="flex-1"
            >
              Apenas Finalizar
            </Button>
            {Object.values(pecasPorItem).flat().length > 0 && (
              <Button
                onClick={handleCriarOrcamento}
                className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white"
              >
                Criar Orçamento
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

