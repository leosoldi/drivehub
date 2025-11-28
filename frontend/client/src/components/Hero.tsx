import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, BarChart3, Users, Calendar } from "lucide-react";
import { useLocation } from "wouter";

export default function Hero() {
  const [, navigate] = useLocation();

  return (
    <section 
      id="hero" 
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Conectando{" "}
            <span className="text-[#1E3B8F]">Motoristas</span>
            {" "}e{" "}
            <span className="text-[#F97316]">Parceiros.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O DrivHub é o ecossistema completo. Simplificamos a manutenção para quem dirige e aceleramos o crescimento de quem conserta.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            onClick={() => navigate("/dashboard-motorista")}
            className="bg-[#1E3B8F] hover:bg-[#1E3B8F]/90 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Sou Motorista
          </Button>
          
          <span className="text-gray-500 font-medium">ou</span>
          
          <Button
            onClick={() => navigate("/cadastro")}
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Sou Parceiro
          </Button>
        </div>

        {/* Cards Informativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card Meu Veículo */}
          <Card className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#1E3B8F] p-3 rounded-full">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">MEU VEÍCULO</p>
                <h3 className="text-lg font-bold text-gray-900">Honda Civic • ABC-1234</h3>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Próxima Revisão</span>
                <span className="text-[#1E3B8F] font-semibold">Em 15 dias</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Alerta de Agendamento</span>
                <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">2 dias</span>
              </div>
            </div>
          </Card>

          {/* Card Painel do Parceiro */}
          <Card className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#F97316] p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">PAINEL DO PARCEIRO</p>
                <h3 className="text-lg font-bold text-gray-900">AutoCenter Premium</h3>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Novos Clientes</span>
                </div>
                <span className="text-[#F97316] font-bold text-lg">+24</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Solicitação de Orçamento</span>
                </div>
                <span className="text-gray-900 font-bold text-lg">8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
