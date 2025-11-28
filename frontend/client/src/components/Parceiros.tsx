import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Settings, BarChart3, Headphones, Zap } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Novos Clientes",
    description: "Acesse milhares de motoristas procurando por seus serviços",
  },
  {
    icon: TrendingUp,
    title: "Aumente seu Faturamento",
    description: "Mais visibilidade significa mais oportunidades de negócio",
  },
  {
    icon: Settings,
    title: "Gestão integrada de serviços",
    description: "Tenha um sistema completo para gerenciar agendamentos, orçamentos e clientes em uma única plataforma",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Analytics",
    description: "Acompanhe métricas e performance do seu negócio em tempo real",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "Equipe especializada para ajudar seu negócio a crescer",
  },
  {
    icon: Zap,
    title: "Integração Rápida",
    description: "Configure seu perfil e comece a receber clientes em minutos",
  },
];

export default function Parceiros() {
  return (
    <section id="parceiros" className="py-16 md:py-24 bg-gradient-to-br from-[#F97316]/5 to-[#F97316]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-block bg-[#F97316]/10 text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Para Parceiros
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Vantagens para Parceiros
          </h2>
          <p className="text-lg text-gray-600">
            Amplie sua visibilidade, otimize sua gestão e conquiste mais clientes de forma eficiente.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#F97316]/20"
              >
                <div className="bg-[#F97316]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="h-7 w-7 text-[#F97316]" />
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
            className="bg-[#F97316] text-white hover:bg-[#EA580C] transition-all shadow-lg hover:shadow-xl"
            onClick={() => alert("Funcionalidade de cadastro em desenvolvimento")}
          >
            Conheça nossos Planos
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Expanda seu negócio e conquiste novos clientes.
          </p>
        </div>
      </div>
    </section>
  );
}

