import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o cadastro na DrivHub?",
    answer: "O cadastro é simples e gratuito. Para motoristas, basta informar dados básicos e e-mail. Para parceiros, é necessário enviar documentação do negócio para verificação, que leva até 48 horas.",
  },
  {
    question: "A DrivHub cobra alguma taxa dos motoristas?",
    answer: "Não! O uso da plataforma é 100% gratuito para motoristas. Você paga apenas pelos serviços contratados diretamente com os parceiros.",
  },
  {
    question: "Como são selecionados os parceiros?",
    answer: "Todos os parceiros passam por um processo de verificação que inclui análise de documentação, histórico e avaliações. Mantemos apenas prestadores com alto padrão de qualidade.",
  },
  {
    question: "Posso avaliar os serviços que contrato?",
    answer: "Sim! Após cada atendimento, você pode avaliar o parceiro com nota de 1 a 5 estrelas e deixar comentários. Isso ajuda outros motoristas e mantém a qualidade da plataforma.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "O pagamento pode ser feito diretamente na plataforma através de cartão de crédito, PIX ou carteira digital. Algumas oficinas também aceitam pagamento presencial.",
  },
  {
    question: "Qual a comissão cobrada dos parceiros?",
    answer: "Cobramos uma comissão competitiva sobre cada serviço realizado através da plataforma. O valor varia de acordo com o tipo de serviço e volume de atendimentos. Entre em contato para mais detalhes.",
  },
  {
    question: "A DrivHub oferece garantia nos serviços?",
    answer: "Os serviços seguem a garantia legal e as políticas de cada parceiro. Em caso de problemas, nossa equipe de suporte atua como mediadora para resolver a situação.",
  },
  {
    question: "Como funciona o atendimento de emergência?",
    answer: "Para serviços de guincho e emergências, temos parceiros disponíveis 24/7. Basta solicitar através do app e o parceiro mais próximo será acionado automaticamente.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Tire suas dúvidas sobre a plataforma DrivHub
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-[#1E40AF] py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 bg-gradient-to-r from-[#1E40AF]/5 to-[#F97316]/5 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Não encontrou sua resposta?
          </h3>
          <p className="text-gray-600 mb-6">
            Nossa equipe de suporte está pronta para ajudar você
          </p>
          <button
            className="bg-[#1E40AF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E3A8A] transition-all shadow-md hover:shadow-lg"
            onClick={() => alert("Funcionalidade de contato em desenvolvimento")}
          >
            Entrar em Contato
          </button>
        </div>
      </div>
    </section>
  );
}

