# DrivHub - Lista de Tarefas

## ✅ Concluído

- [x] Inicializar projeto no ambiente Manus Web Development
- [x] Configurar banco de dados MySQL gerenciado

## 🔄 Em Andamento

- [x] Migrar estrutura de páginas do projeto original
- [x] Migrar componentes UI
- [x] Migrar schema do banco de dados
- [x] Migrar rotas do servidor (tRPC)
- [x] Executar migrações do banco de dados
- [x] Testar funcionalidades do site
- [x] Criar checkpoint e publicar

## 📋 Funcionalidades a Implementar

### Para Motoristas
- [ ] Landing Page (Home)
- [ ] Sistema de Login
- [ ] Cadastro de Motorista
- [ ] Dashboard do Motorista
- [ ] Gestão de Veículos (Meus Veículos)
- [ ] Checklist de Veículo
- [ ] Busca de Serviços
- [ ] Sistema de Agendamentos
- [ ] Avaliações de Parceiros
- [ ] Histórico de Serviços
- [ ] Solicitação de Orçamento

### Para Parceiros
- [ ] Cadastro de Parceiro
- [ ] Dashboard do Parceiro
- [ ] Perfil do Parceiro
- [ ] Criação de Orçamentos
- [ ] Gestão de Agendamentos
- [ ] Cadastro de Clientes

### Páginas Auxiliares
- [ ] Página 404 (Not Found)
- [ ] Component Showcase (biblioteca de componentes)


## 🆕 Novas Solicitações

- [x] Aprimorar layout do modal "Solicitar Orçamento" na página Buscar com informações completas do parceiro (foto, nome, endereço, horário, avaliações)
- [x] Garantir consistência da foto do perfil do parceiro entre o card da página Buscar e o modal
- [x] Substituir campo de texto "Veículo" por seletor de veículos cadastrados no modal "Solicitar Orçamento"
- [x] Adicionar seção "Dados do Veículo" no modal "Solicitar Orçamento" seguindo padrão do Dashboard Parceiro
- [x] Adicionar seção "Dados do Motorista" ao lado de "Dados do Veículo" no modal "Solicitar Orçamento"
- [x] Replicar modal atualizado de "Solicitar Orçamento" para a página SolicitacaoOrcamento.tsx
- [x] Atualizar cabeçalho da página SolicitacaoOrcamento.tsx para usar padrão do dashboard-motorista
- [x] Aprimorar seção de informações do parceiro no modal com avaliação, endereço, horário e botão "Ver Perfil"
- [x] Substituir tabela de orçamentos por cards visuais na página SolicitacaoOrcamento
- [x] Remover ID (ex: ORC-001) dos cards de orçamento na página SolicitacaoOrcamento
- [x] Substituir campo "Valor Orçado" no modal por seções detalhadas: "Serviços e Peças" e "Mão de Obra" (padrão Dashboard Parceiro)
- [x] Alterar layout dos cards de orçamento de grid para lista vertical (um embaixo do outro)
- [x] Adicionar dados detalhados (serviços, peças, mão de obra) para todos os orçamentos mockados
- [x] Atualizar cabeçalho da página Historico.tsx para usar padrão do dashboard-motorista
- [x] Implementar navegação por abas na página Historico.tsx seguindo padrão da página Agendamentos
- [x] Implementar navegação por abas na página Historico (Todos, Manutenção Preventiva, Reparo)
- [x] Remover elemento específico dos cards de histórico (linha 371)
- [x] Aprimorar seção do parceiro nos cards com informações completas (foto, avaliação, endereço, horário)
- [x] Alterar fundo do card de informações do parceiro de gradiente laranja para branco na página Historico
- [x] Atualizar cabeçalho da página MeusVeiculos.tsx para usar padrão do dashboard-motorista
- [x] Remover elemento div na linha 487 da página MeusVeiculos.tsx
- [x] Remover alerta na linha 391 da página MeusVeiculos.tsx

## 🆕 Novas Solicitações (15/11/2025 - Atualização 2)

- [x] Remover cards específicos da página Historico.tsx (elementos nas linhas 337 e 302)
- [x] Transformar visualização de histórico em tabela com ícone de olho
- [x] Implementar modal de detalhes ao clicar no ícone de olho na tabela

## 🆕 Novas Solicitações (15/11/2025 - Atualização 3)

- [x] Remover coluna "Tipo" da tabela de histórico na página Historico.tsx

## 🆕 Novas Solicitações (15/11/2025 - Atualização 4)

- [x] Remover elemento aside da página Dashboard.tsx (linha 103)

## 🆕 Novas Solicitações (15/11/2025 - Atualização 5)

- [x] Reutilizar componente de cabeçalho da página dashboard-motorista na página Dashboard do parceiro


## 🆕 Novas Solicitações (15/11/2025 - Atualização 6)

- [x] Criar página de Ordens de Serviço (OrdensServico.tsx)
- [x] Implementar listagem de ordens de serviço com status
- [x] Criar modal para adicionar/editar ordem de serviço
- [x] Validar que cada OS tenha obrigatoriamente Checklist ou Orçamento (ou ambos)
- [x] Vincular botão "Ordens de Serviço" do dashboard à nova página

## 🆕 Novas Solicitações (15/11/2025 - Atualização 7)

- [x] Atualizar elemento na linha 550 da página Buscar.tsx para incluir informações completas do parceiro (foto de perfil, avaliação, endereço, horário) igual ao modal "Solicitar Orçamento"

## 🆕 Novas Solicitações (15/11/2025 - Atualização 8)

- [x] Ajustar tamanho do modal "Agendar Serviço" para ficar com as mesmas dimensões do modal "Solicitar Orçamento"

## 🆕 Novas Solicitações (15/11/2025 - Atualização 9)

- [x] Adicionar seção de seleção de veículo no modal "Agendar Serviço" após campo "Tipo de Serviço"
- [x] Implementar mensagem "Veículo encontrado!" seguindo padrão do modal "Solicitar Orçamento"

## 🆕 Novas Solicitações (15/11/2025 - Atualização 10)

- [x] Implementar pop-up de confirmação ao clicar em "Finalizar" no ChecklistModal
- [x] Mostrar mensagem "Checklist Concluído!" com contagem de peças que precisam ser trocadas
- [x] Adicionar botões "Apenas Finalizar" e "Criar Orçamento" no pop-up

## 🆕 Novas Solicitações (15/11/2025 - Atualização 11)

- [x] Reutilizar componente de cabeçalho da página Dashboard na página ChecklistVeiculo.tsx
- [x] Remover título específico da página ChecklistVeiculo.tsx (linha 292)
- [x] Remover ícone SVG da página ChecklistVeiculo.tsx (linha 228)

## 🆕 Novas Solicitações (15/11/2025 - Atualização 13)

- [x] Reutilizar componente de cabeçalho do Dashboard do parceiro na página CriarOrcamento.tsx
- [x] Alterar título "Todos os Orçamentos" para "Orçamento Enviado"
- [x] Criar nova seção "Solicitação de Orçamento" com tabela para receber solicitações enviadas pela página de Busca

## 🆕 Novas Solicitações (15/11/2025 - Atualização 14)

- [x] Atualizar seção "Solicitação de Orçamento" na página CriarOrcamento.tsx para ficar idêntica à seção "Solicitações de Orçamento" do Dashboard do parceiro (desktop e mobile)

## 🆕 Novas Solicitações (15/11/2025 - Atualização 15)

- [x] Implementar modal de resposta ao clicar em "Responder" na página CriarOrcamento
- [x] Modal baseado no "Orçamento Recebido" da página Solicitação de Orçamento
- [x] Adaptar modal para parceiro preencher peças/serviços e mão de obra

## 🆕 Novas Solicitações (15/11/2025 - Atualização 16)

- [x] Atualizar seção "Resumo do Orçamento" no modal da página SolicitacaoOrcamento.tsx para ficar igual à seção do modal "Responder Solicitação de Orçamento" da página Novo Orçamento

## 🆕 Novas Solicitações (15/11/2025 - Atualização 17)

- [x] Adicionar campo de desconto na seção Resumo do Orçamento no modal da página SolicitacaoOrcamento
- [x] Adicionar campo de validade do orçamento no modal da página SolicitacaoOrcamento

## 🆕 Novas Solicitações (17/11/2025)

- [x] Remover coluna ID da tabela na página CriarOrcamento.tsx

## 🆕 Novas Solicitações (17/11/2025 - Atualização 2)

- [x] Implementar paginação na tabela de solicitações de orçamento (CriarOrcamento.tsx)

## 🆕 Novas Solicitações (17/11/2025 - Atualização 3)

- [x] Implementar paginação na seção "Orçamento Enviado" (CriarOrcamento.tsx)

## 🆕 Novas Solicitações (17/11/2025 - Atualização 4)

- [x] Melhorar visual e layout do card na página Agendamentos.tsx removendo sombra laranja

## 🆕 Novas Solicitações (17/11/2025 - Atualização 5)

- [x] Adicionar campo de seleção de data no card de agendamento (Agendamentos.tsx)

## 🆕 Novas Solicitações (17/11/2025 - Atualização 7)

- [x] Reutilizar componente de cabeçalho do dashboard do parceiro na página CadastroCliente.tsx
- [x] Remover ícone da página CadastroCliente.tsx

## 🆕 Novas Solicitações (17/11/2025 - Atualização 8)

- [x] Reutilizar componente de cabeçalho do dashboard do parceiro na página Agendamentos.tsx

## 🆕 Novas Solicitações (17/11/2025 - Atualização 9)

- [x] Adicionar menu de navegação abaixo do cabeçalho na página OrdensServico.tsx
- [x] Implementar modal de checklist preenchido ao clicar no botão Checklist
- [x] Implementar modal de orçamento preenchido ao clicar no botão Orçamento

## 🆕 Novas Solicitações (17/11/2025 - Atualização 10)

- [x] Criar página de Histórico do Parceiro conforme padrão do site

## 🆕 Novas Solicitações (17/11/2025 - Atualização 11)

- [x] Adicionar status "Aguardando Aprovação" na página OrdensServico.tsx

## 🆕 Novas Solicitações (18/11/2025)

- [x] Criar página de Perfil do Parceiro idêntica ao perfil da página Buscar
- [x] Adicionar ícones de editar em cada seção editável do perfil
- [x] Implementar funcionalidade de edição para cada seção

## 🆕 Novas Solicitações (18/11/2025 - Atualização 2)

- [x] Configurar botão "Meu Perfil" no Dashboard do parceiro para navegar para a página de perfil

## 🆕 Novas Solicitações (18/11/2025 - Atualização 3)

- [x] Adicionar botão "Responder" nas avaliações da página de perfil do parceiro

## 🆕 Novas Solicitações (18/11/2025 - Atualização 4)

- [x] Criar modal completo para responder avaliações seguindo padrão "Resposta da oficina"
- [x] Implementar formulário com campo de texto para a resposta
- [x] Adicionar funcionalidade de enviar resposta

## 🐛 Bugs Reportados (18/11/2025)

- [x] Corrigir erro de seletor CSS `.text-popover-foreground` não encontrado na página Dashboard

## 🆕 Novas Solicitações (20/11/2025 - Atualização 2)

- [x] Ajustar padding da seção Hero para 60px (top e bottom)
- [x] Remover cards de estatísticas da seção Hero
- [x] Ajustar opacidade do background do Header para 0.95
- [x] Atualizar logo "DrivHub" na seção Services para seguir padrão do cabeçalho
- [x] Atualizar texto da seção Motoristas para "O DrivHub é seu copiloto digital..."

## 🆕 Novas Solicitações (20/11/2025 - Atualização 3)

- [x] Excluir os valores de todos os cards na página AgendamentosMotorista.tsx

## 🆕 Novas Solicitações (20/11/2025 - Atualização 4)

- [x] Remover cards da página AgendamentosMotorista.tsx
- [x] Adicionar botão "Avaliar" na seção "Histórico de Agendamento" da página AgendamentosMotorista.tsx

## 🆕 Novas Solicitações (20/11/2025 - Atualização 5)

- [x] Alterar cor do botão "Novo Agendamento" para azul na página AgendamentosMotorista.tsx
- [x] Alterar cor do botão "Avaliar" para azul na página AgendamentosMotorista.tsx
- [x] Criar modal de avaliação com sistema de estrelas e campo de comentário

## 🆕 Novas Solicitações (21/11/2025 - Atualização 3)

- [x] Implementar Drawer lateral no Dashboard do parceiro com navegação para: Meu Perfil, Ordem de Serviço, Agendamentos, Orçamentos, Cadastro de veículo e Sair

## 🆕 Novas Solicitações (21/11/2025 - Atualização 4)

- [x] Atualizar design do Drawer de navegação com novos itens: Visão Geral, Agenda, Clientes, Orçamentos, Financeiro, Mensagens e Sair da conta

## 🐛 Correções de Bugs (21/11/2025)

- [x] Corrigir erro de acessibilidade na página /agendamentos - adicionar DialogTitle ao DialogContent
- [x] Corrigido erro de acessibilidade no Sheet do menu do usuário - adicionado SheetTitle oculto
- [x] Adicionar logo e nome do estabelecimento no topo do Drawer de navegação
- [x] Usar o mesmo ícone de usuário do header dentro do Drawer de navegação
- [x] Alterar subtítulo no Drawer de 'Parceiro DrivHub' para 'Plano Basic'
- [x] Transformar Drawer em sidebar fixa no lado esquerdo para desktop (sempre visível)
- [x] Mover logo/nome do estabelecimento para o lado direito do cabeçalho e remover título Dashboard
- [x] Substituir avatar com ícone de usuário pela logo padrão DrivHub na sidebar
- [x] Remover nome do estabelecimento e plano da sidebar (abaixo da logo)
- [x] Adicionar nome do estabelecimento e plano ao lado direito da notificação no header
- [x] Adicionar novos itens ao menu da sidebar: Checklist, Histórico, Ordem de Serviço
- [x] Adicionar barra de rolagem vertical na sidebar para garantir usabilidade em telas menores
- [x] Implementar tooltips informativos que aparecem ao passar o mouse sobre os ícones do menu lateral
- [x] Mover menu do estabelecimento para o lado direito da notificação no header
- [x] Atualizar textos dos cards de ações rápidas (Adicionar Cliente, Adicionar Checklist, Adicionar nova O.S, Adicionar Orçamento, Criar Agendamento)
- [x] Remover um card de ações rápidas e diminuir tamanho dos cards restantes

## 🆕 Novas Solicitações (21/11/2025 - Atualização 6)

- [x] Ajustar Drawer do Dashboard para abrir na direita na versão mobile
- [x] Posicionar menu do estabelecimento ao lado direito do ícone de notificação no header

## 🆕 Novas Solicitações (21/11/2025 - Atualização 7)

- [x] Substituir logo no Drawer mobile por informações do estabelecimento (nome e plano)

## 🆕 Novas Solicitações (21/11/2025 - Atualização 8)

- [x] Reorganizar itens do menu no Drawer (mobile e desktop) na seguinte ordem: Visão Geral, Meu Perfil, Cliente, Agenda, Ordem de Serviço, Checklist, Orçamento, Mensagem, Financeiro, Histórico

## 🆕 Novas Solicitações (21/11/2025 - Atualização 10)

- [x] Atualizar rotas de redirecionamento dos botões do menu lateral no Dashboard:
  - Cliente → /clientes/novo
  - Agenda → /agendamentos/novo
  - Ordem de Serviço → /ordens-servico
  - Checklist → /checklist
  - Orçamentos → /orcamento/novo
  - Histórico → /historico-parceiro

## 🆕 Novas Solicitações (21/11/2025 - Atualização 12)

- [x] Reutilizar o cabeçalho da página Dashboard do parceiro na página CadastroCliente

## 🆕 Novas Solicitações (22/11/2025 - Atualização 13)

- [x] Corrigir erro "Sheet is not defined" na página CadastroCliente adicionando imports necessários

## 🆕 Novas Solicitações (22/11/2025 - Atualização 14)

- [x] Adicionar sidebar lateral fixa na versão desktop (lado esquerdo) na página CadastroCliente

## 🆕 Novas Solicitações (22/11/2025 - Atualização 15)

- [x] Substituir seção hero da página inicial com novo design
- [x] Adicionar título "Conectando Motoristas e Parceiros" com cores azul e laranja
- [x] Atualizar subtítulo para "O DrivHub é o ecossistema completo. Simplificamos a manutenção para quem dirige e aceleramos o crescimento de quem conserta."
- [x] Adicionar cards informativos abaixo dos botões (Meu Veículo e Painel do Parceiro)

## 🆕 Novas Solicitações (22/11/2025 - Atualização 16)

- [x] Alterar "Alerta de Óleo" para "Alerta de Agendamento" no card Meu Veículo
- [x] Alterar status "Crítico" para "2 dias" no card Meu Veículo
- [x] Alterar "Agendamentos Hoje" para "Solicitação de Orçamento" no card Painel do Parceiro
- [x] Excluir elementos específicos do componente ComoFunciona

## 🆕 Novas Solicitações (22/11/2025 - Atualização 17)

- [x] Alterar cor da descrição no Header para oklch(0.446 0.03 256.802)

## 🆕 Novas Solicitações (22/11/2025 - Atualização 19)

- [x] Atualizar página "/agendamentos/novo" para utilizar Drawer lateral
- [x] Aplicar mesmo padrão de layout do dashboard do parceiro
- [x] Manter consistência visual e navegação

## 🆕 Novas Solicitações (22/11/2025 - Atualização 20)

- [x] Atualizar página "/ordens-servico" para utilizar Drawer lateral
- [x] Aplicar mesmo padrão de layout do dashboard do parceiro
- [x] Manter consistência visual e navegação

## 🆕 Novas Solicitações (22/11/2025 - Atualização 21)

- [x] Aplicar Drawer lateral na página "/clientes/novo"
- [x] Aplicar Drawer lateral na página "/checklist"
- [x] Aplicar Drawer lateral na página "/orcamentos/novo"
- [x] Manter consistência visual e navegação em todas as páginas

## 🆕 Novas Solicitações (22/11/2025 - Atualização 22)

- [x] Implementar modal "Novo Agendamento" no botão do Dashboard do parceiro
- [x] Implementar modal "Criar Novo Orçamento" no botão do Dashboard do parceiro

## 🆕 Novas Solicitações (22/11/2025 - Atualização 23)

- [x] Ajustar botão na linha 290 do Dashboard.tsx para navegar para "/orcamentos/novo" ao invés de abrir modal

## 🆕 Novas Solicitações (22/11/2025 - Atualização 25)

- [x] Substituir modal "Criar Novo Orçamento" no Dashboard por versão completa com busca de veículo, serviços/peças, mão de obra e observações

## 🆕 Novas Solicitações (22/11/2025 - Atualização 26)

- [x] Reutilizar modal "Criar Novo Orçamento" da página Dashboard (caminho: /dashboard/Novo Orçamento) no botão "Adicionar Orçamento" do Dashboard do parceiro

## 🆕 Novas Solicitações (22/11/2025 - Atualização 27)

- [x] Remover botão na linha 423 do arquivo CriarOrcamento.tsx

## 🆕 Novas Solicitações (22/11/2025 - Atualização 28)

- [x] Criar novo modal "Cadastro Rápido de Cliente" com formulário completo (informações do cliente + veículo)

## 🆕 Novas Solicitações (22/11/2025 - Atualização 28)

- [x] Criar modal de seleção de checklist na página Dashboard do parceiro
- [x] Permitir escolher entre os checklists cadastrados na página de "Checklist"

## 🆕 Novas Solicitações (22/11/2025 - Atualização 29)

- [x] Alterar cor do botão "Selecionar este Checklist" para laranja no modal de seleção de checklist

## 🆕 Novas Solicitações (22/11/2025 - Atualização 30)

- [x] Remover botão específico na linha 232 da página ChecklistVeiculo.tsx

## 🆕 Novas Solicitações (22/11/2025 - Atualização 31)

- [x] Adicionar Drawer de navegação no dashboard do motorista seguindo o padrão do dashboard do parceiro

## 🆕 Novas Solicitações (23/11/2025 - Atualização 32)

- [x] Corrigir erro de acessibilidade: DialogContent sem DialogTitle no dashboard do motorista

## 🆕 Novas Solicitações (23/11/2025 - Atualização 33)

- [x] Alterar Drawer mobile para abrir na lateral direita no dashboard do motorista

## 🆕 Novas Solicitações (23/11/2025 - Atualização 34)

- [x] Mover botão do menu hambúrguer para o lado direito do header no dashboard do motorista

## 🆕 Novas Solicitações (23/11/2025 - Atualização 36)

- [x] Reverter projeto para a versão a4164076 (rollback executado com sucesso)

## 🆕 Novas Solicitações (23/11/2025 - Atualização 37)

- [x] Ocultar botão de notificações na versão mobile do dashboard do motorista

## 🆕 Novas Solicitações (23/11/2025 - Atualização 38)

- [x] Ocultar menu do usuário (avatar + nome + seta) na versão mobile
- [x] Manter botão de notificações visível em mobile

## 🆕 Novas Solicitações (23/11/2025 - Atualização 39)

- [x] Adicionar destaque azul nos itens do menu lateral quando a página correspondente estiver ativa

## 🆕 Novas Solicitações (23/11/2025 - Atualização 40)

- [x] Aplicar Drawer de navegação padrão na página /agendamentos-motorista
- [x] Aplicar Drawer de navegação padrão na página /solicitacao-orcamento

## 🆕 Novas Solicitações (23/11/2025 - Atualização 41)

- [x] Aplicar Drawer de navegação padrão na página /meus-veiculos
- [x] Aplicar Drawer de navegação padrão na página /historico

## 🆕 Novas Solicitações (23/11/2025)

- [x] Remover texto "DrivHub" do logo no cabeçalho do MotoristaLayout.tsx (linha 271-275)

- [x] Incluir logo padrão "DrivHub" no cabeçalho do MotoristaLayout.tsx (versão mobile)

- [x] Ocultar logo DrivHub em desktop e manter visível apenas em mobile no MotoristaLayout.tsx

- [x] Alterar formato da tabela na página Historico.tsx para: Data | Parceiro | Serviço | Peça Trocada | Avaliação | Valor | Ação
- [x] Ajustar menu de navegação da página Historico.tsx para seguir padrão da página meus-veiculos

- [x] Remover botão específico na linha 252 da página Agendamentos.tsx

- [x] Remover botão específico na linha 342 da página OrdensServico.tsx

- [x] Criar página Meu Perfil para motorista com informações básicas (telefone, e-mail, endereço, veículos cadastrados)

- [x] Adicionar opção Meu Perfil no modal/menu mobile do MotoristaLayout

- [x] Adicionar opção Meu Perfil no menu dropdown do DashboardMotorista

- [x] Adicionar opção Meu Perfil no drawer de navegação do DashboardMotorista

- [x] Remover elemento específico na linha 471 da página DashboardMotorista.tsx

- [x] Adicionar componente de informações do usuário no cabeçalho desktop à direita
