import { Button } from "@/components/ui/button";
import { Shield, Scale, Star, MapPin, Camera, Bell } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Parceiros Verificados",
    description: "Todos os prestadores são avaliados e certificados pela plataforma",
  },
  {
    icon: Scale,
    title: "Compare preços e qualidade",
    description: "Escolha o melhor custo-benefício comparando preço e qualidade",
  },
  {
    icon: Star,
    title: "Avaliações Reais",
    description: "Sistema transparente de reviews de outros motoristas",
  },
  {
    icon: MapPin,
    title: "Localização Inteligente",
    description: "Encontre os serviços mais próximos de você em tempo real",
  },
  {
    icon: Camera,
    title: "Histórico e Fotos",
    description: "Tenha registro visual e histórico detalhado de todas as peças e serviços realizados",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Acompanhe o status do seu serviço em tempo real",
  },
];

export default function Motoristas() {
  return (
    <section id="motoristas" className="py-16 md:py-24 bg-gradient-to-br from-[#1E40AF]/5 to-[#1E40AF]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Para Motoristas
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Vantagens para Motoristas
          </h2>
          <p className="text-lg text-gray-600">
            O DrivHub é seu copiloto digital. Gerencie a saúde do seu veículo sem planilhas ou papéis perdidos no porta-luvas.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1E40AF]/20"
              >
                <div className="bg-[#1E40AF]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="h-7 w-7 text-[#1E40AF]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#1E40AF] text-white hover:bg-[#1E3A8A] transition-all shadow-lg hover:shadow-xl"
            onClick={() => alert("Funcionalidade de cadastro em desenvolvimento")}
          >
            Cadastre-se Gratuitamente
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Sem taxas de adesão. Comece a usar agora mesmo!
          </p>
        </div>
      </div>
    </section>
  );
}

