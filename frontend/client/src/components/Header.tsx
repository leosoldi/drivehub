import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold tracking-tight"
              aria-label="DrivHub Home"
            >
              <span className="text-[#1E40AF]">Driv</span>
              <span className="text-[#F97316]">Hub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("servicos")}
              className="hover:text-[#F97316] transition-colors text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("motoristas")}
              className="hover:text-[#F97316] transition-colors text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Para Motoristas
            </button>
            <button
              onClick={() => scrollToSection("parceiros")}
              className="hover:text-[#F97316] transition-colors text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Para Parceiros
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="hover:text-[#F97316] transition-colors text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#F97316] transition-colors text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              FAQ
            </button>
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-transparent text-[#1E40AF] border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all"
              onClick={() => setLocation("/login")}
            >
              Entrar
            </Button>
            <Button
              className="bg-[#F97316] text-white hover:bg-[#EA580C] transition-all"
              onClick={() => setLocation("/cadastro")}
            >
              Cadastrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1E40AF] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            <button
              onClick={() => scrollToSection("servicos")}
              className="block w-full text-left hover:text-[#F97316] transition-colors py-2 text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("motoristas")}
              className="block w-full text-left hover:text-[#F97316] transition-colors py-2 text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Para Motoristas
            </button>
            <button
              onClick={() => scrollToSection("parceiros")}
              className="block w-full text-left hover:text-[#F97316] transition-colors py-2 text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Para Parceiros
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="block w-full text-left hover:text-[#F97316] transition-colors py-2 text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left hover:text-[#F97316] transition-colors py-2 text-sm font-medium" style={{color: 'oklch(0.446 0.03 256.802)'}}
            >
              FAQ
            </button>
            <div className="pt-3 space-y-2">
              <Button
                variant="outline"
                className="w-full bg-transparent text-[#1E40AF] border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white"
                onClick={() => setLocation("/login")}
              >
                Entrar
              </Button>
              <Button
                className="w-full bg-[#F97316] text-white hover:bg-[#EA580C]"
                onClick={() => setLocation("/cadastro")}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

