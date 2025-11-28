import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Motoristas from "@/components/Motoristas";
import Parceiros from "@/components/Parceiros";
import ComoFunciona from "@/components/ComoFunciona";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

/**
 * Landing Page da DrivHub
 * Ecossistema digital que conecta motoristas a parceiros automotivos
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        <Motoristas />
        <Parceiros />
        <ComoFunciona />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

