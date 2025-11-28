import { useState } from "react";
import { Link, useLocation } from "wouter";
import MotoristaLayout from "@/components/MotoristaLayout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  ChevronRight,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MeuPerfilMotorista() {
  const [, setLocation] = useLocation();
  const [notificationCount] = useState(3);
  const userName = "João da Silva";
  const [editando, setEditando] = useState(false);

  // Dados do perfil
  const [perfil, setPerfil] = useState({
    nome: "João da Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    dataNascimento: "15/03/1985",
    endereco: {
      cep: "01310-100",
      rua: "Av. Paulista",
      numero: "1578",
      complemento: "Apto 501",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
    },
  });

  // Veículos cadastrados
  const veiculos = [
    {
      id: 1,
      marca: "Honda",
      modelo: "Civic Touring",
      ano: 2020,
      placa: "ABC-1234",
      cor: "Preto",
      principal: true,
    },
    {
      id: 2,
      marca: "Volkswagen",
      modelo: "Gol 1.6",
      ano: 2020,
      placa: "DEF-5678",
      cor: "Branco",
      principal: false,
    },
  ];

  const handleSalvar = () => {
    // Aqui você implementaria a lógica de salvar no backend
    setEditando(false);
  };

  const handleCancelar = () => {
    setEditando(false);
    // Resetar dados se necessário
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
          <span className="text-gray-600">Meu Perfil</span>
        </div>

        {/* Cabeçalho da Página */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600">Gerencie suas informações pessoais e veículos</p>
          </div>
          {!editando ? (
            <Button
              onClick={() => setEditando(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleCancelar}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleSalvar}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          )}
        </div>

        {/* Informações Pessoais */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={perfil.nome}
                  onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={perfil.cpf}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={perfil.telefone}
                  onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  value={perfil.dataNascimento}
                  onChange={(e) => setPerfil({ ...perfil, dataNascimento: e.target.value })}
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Endereço
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={perfil.endereco.cep}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, cep: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="rua">Rua</Label>
                <Input
                  id="rua"
                  value={perfil.endereco.rua}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, rua: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={perfil.endereco.numero}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, numero: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  value={perfil.endereco.complemento}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, complemento: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={perfil.endereco.bairro}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, bairro: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={perfil.endereco.cidade}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, cidade: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={perfil.endereco.estado}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      endereco: { ...perfil.endereco, estado: e.target.value },
                    })
                  }
                  disabled={!editando}
                  className="mt-1"
                  maxLength={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Veículos Cadastrados */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                Veículos Cadastrados
              </CardTitle>
              <Button
                onClick={() => setLocation("/meus-veiculos")}
                variant="outline"
                size="sm"
              >
                Gerenciar Veículos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {veiculos.map((veiculo) => (
                <div
                  key={veiculo.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {veiculo.marca} {veiculo.modelo}
                        </h3>
                        {veiculo.principal && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Principal
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {veiculo.ano} • {veiculo.placa} • {veiculo.cor}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MotoristaLayout>
  );
}
