import { Search, CheckCircle, Star, UserPlus, Settings, Rocket } from "lucide-react";

const motoristaSteps = [
  {
    icon: Search,
    title: "Busque o Serviço",
    description: "Encontre o que precisa usando filtros de localização, preço e avaliações",
  },
  {
    icon: CheckCircle,
    title: "Escolha o Parceiro",
    description: "Compare opções e selecione o prestador ideal para você",
  },
  {
    icon: Star,
    title: "Avalie a Experiência",
    description: "Compartilhe sua opinião e ajude outros motoristas",
  },
];

const parceiroSteps = [
  {
    icon: UserPlus,
    title: "Cadastre seu Negócio",
    description: "Preencha informações básicas e documentação necessária",
  },
  {
    icon: Settings,
    title: "Configure seu Perfil",
    description: "Adicione fotos, horários de atendimento e serviços oferecidos",
  },
  {
    icon: Rocket,
    title: "Receba Clientes",
    description: "Comece a receber solicitações e expanda seu negócio",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Como Funciona a <span className="text-[#F97316]">DrivHub</span>?
          </h2>
          <p className="text-lg text-gray-600">
            Processo simples e intuitivo para Clientes e Parceiros aproveitarem ao máximo nossa plataforma.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Motoristas Column */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] px-4 py-2 rounded-full text-sm font-bold mb-4">
                Para Motoristas
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                3 Passos para Resolver seu Problema
              </h3>
            </div>

            <div className="space-y-6">
              {motoristaSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="flex-shrink-0">
                      <div className="bg-[#1E40AF] text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-6 w-6 text-[#1E40AF]" />
                        <h4 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>


          </div>

          {/* Parceiros Column */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-[#F97316]/10 text-[#F97316] px-4 py-2 rounded-full text-sm font-bold mb-4">
                Para Parceiros
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                3 Passos para Crescer seu Negócio
              </h3>
            </div>

            <div className="space-y-6">
              {parceiroSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="flex-shrink-0">
                      <div className="bg-[#F97316] text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-6 w-6 text-[#F97316]" />
                        <h4 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

