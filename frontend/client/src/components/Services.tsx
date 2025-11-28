import { Car, Package, TruckIcon, Droplets, ParkingCircle } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Oficinas",
    description: "Manutenção preventiva e corretiva com profissionais qualificados",
    color: "text-[#1E40AF]",
    bgColor: "bg-[#1E40AF]/10",
  },
  {
    icon: Package,
    title: "Autopeças",
    description: "Peças originais e alternativas com garantia e entrega rápida",
    color: "text-[#F97316]",
    bgColor: "bg-[#F97316]/10",
  },
  {
    icon: TruckIcon,
    title: "Guinchos",
    description: "Atendimento 24h para reboque e assistência em emergências",
    color: "text-[#1E40AF]",
    bgColor: "bg-[#1E40AF]/10",
  },
  {
    icon: Droplets,
    title: "Lava-Car",
    description: "Lavagem completa, polimento e higienização interna",
    color: "text-[#F97316]",
    bgColor: "bg-[#F97316]/10",
  },
  {
    icon: ParkingCircle,
    title: "Estacionamentos",
    description: "Vagas seguras e monitoradas em locais estratégicos",
    color: "text-[#1E40AF]",
    bgColor: "bg-[#1E40AF]/10",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Todos os serviços que você precisa estão na <span className="text-[#1E40AF]">Driv</span><span className="text-[#F97316]">Hub</span>
          </h2>
          <p className="text-lg text-gray-600">
            Uma plataforma completa para conectar você aos melhores prestadores de serviços automotivos da sua região
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className={`${service.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <a 
                  href="/login"
                  className="text-[#F97316] hover:text-[#F97316]/80 font-semibold transition-colors duration-200 inline-flex items-center"
                >
                  Buscar →
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            E muito mais serviços sendo adicionados constantemente
          </p>
        </div>
      </div>
    </section>
  );
}

