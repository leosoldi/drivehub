import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import CadastroCliente from "./pages/CadastroCliente";
import Agendamentos from "./pages/Agendamentos";
import ChecklistVeiculo from "./pages/ChecklistVeiculo";
import CriarOrcamento from "./pages/CriarOrcamento";
import Buscar from "./pages/Buscar";
import PerfilParceiro from "./pages/PerfilParceiro";
import ComponentShowcase from "./pages/ComponentShowcase";
import DashboardMotorista from "./pages/DashboardMotorista";
import MeusVeiculos from "./pages/MeusVeiculos";
import Historico from "./pages/Historico";
import AgendamentosMotorista from "./pages/AgendamentosMotorista";
import SolicitacaoOrcamento from "./pages/SolicitacaoOrcamento";
import OrdensServico from "./pages/OrdensServico";
import HistoricoParceiro from "./pages/HistoricoParceiro";
import MeuPerfilMotorista from "./pages/MeuPerfilMotorista";
import { AuthProvider } from "@/contexts/AuthContext";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <AuthProvider>
        <Route path={"/login"} component={Login} />
        <Route path={"/cadastro"} component={Cadastro} />
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/clientes/novo"} component={CadastroCliente} />
        <Route path={"/agendamentos"} component={Agendamentos} />
        <Route path={"/agendamentos/novo"} component={Agendamentos} />
        <Route path={"/checklist"} component={ChecklistVeiculo} />
        <Route path={"/orcamentos/novo"} component={CriarOrcamento} />
        <Route path="/buscar" component={Buscar} />
        <Route path="/parceiro/:id" component={PerfilParceiro} />
        <Route path="/components" component={ComponentShowcase} />
        <Route path="/dashboard-motorista" component={DashboardMotorista} />
        <Route path="/meus-veiculos" component={MeusVeiculos} />
        <Route path="/historico" component={Historico} />
        <Route path="/agendamentos-motorista" component={AgendamentosMotorista} />
        <Route path="/solicitacao-orcamento" component={SolicitacaoOrcamento} />
        <Route path="/ordens-servico" component={OrdensServico} />
        <Route path="/historico-parceiro" component={HistoricoParceiro} />
        <Route path="/meu-perfil-motorista" component={MeuPerfilMotorista} />
      </AuthProvider>
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
