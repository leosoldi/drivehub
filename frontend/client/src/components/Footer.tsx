import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-[#1E40AF]">Driv</span>
              <span className="text-[#F97316]">Hub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Conectando motoristas a serviços automotivos de confiança. 
              Praticidade e segurança em um só lugar.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1E40AF] p-2 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1E40AF] p-2 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1E40AF] p-2 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1E40AF] p-2 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#motoristas" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Para Motoristas
                </a>
              </li>
              <li>
                <a href="#parceiros" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Para Parceiros
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <a href="mailto:contato@drivhub.com.br" className="hover:text-[#F97316] transition-colors">
                  contato@drivhub.com.br
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <a href="tel:+5511999999999" className="hover:text-[#F97316] transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} DrivHub. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Desenvolvido com ❤️ para conectar pessoas e serviços
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

