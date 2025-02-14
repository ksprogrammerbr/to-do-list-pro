# To-Do List Pro - Documentação

## Visão Geral

O To-Do List Pro é um sistema de gerenciamento de tarefas moderno e intuitivo, desenvolvido com Next.js, TypeScript, Tailwind CSS e Clerk para autenticação. O sistema oferece uma interface elegante com efeitos visuais modernos como glassmorphism e design responsivo.

## Funcionalidades Principais

### 1. Autenticação e Autorização

- Sistema de login/registro usando Clerk
- Proteção de rotas
- Gerenciamento de sessões
- Perfis de usuário (Admin e Usuário comum)

### 2. Gerenciamento de Tarefas

- Visualização em Kanban ou Lista
- Drag and Drop para mover tarefas entre status
- Filtros avançados por:
  - Status (A Fazer, Em Progresso, Concluído)
  - Prioridade (Baixa, Média, Alta)
  - Data
  - Busca por texto

### 3. Interface do Usuário

- Design moderno com efeitos glassmorphism
- Tema com gradientes suaves
- Paleta de cores personalizada:
  - #F7CFD8 (Rosa claro)
  - #F4F8D3 (Verde claro)
  - #A6F1E0 (Turquesa)
  - #73C7C7 (Azul esverdeado)
- Responsividade para diferentes dispositivos
- Animações e transições suaves

### 4. Recursos de Tarefas

- Criação/Edição/Exclusão de tarefas
- Definição de prioridade
- Agendamento com data e hora
- Sistema de lembretes
- Descrições detalhadas
- Status de progresso

### 5. Painel Administrativo

- Dashboard com estatísticas
- Gerenciamento de usuários
- Histórico de atividades
- Configurações do sistema

## Estrutura do Projeto

### Componentes Principais

1. **TaskCard**

   - Exibição individual de tarefas
   - Ações rápidas (editar/excluir)
   - Indicadores visuais de prioridade

2. **TaskModal**

   - Formulário para criar/editar tarefas
   - Campos: título, descrição, data, hora, prioridade

3. **TaskFilters**

   - Filtros avançados
   - Busca em tempo real
   - Seleção de período

4. **DraggableTaskList**
   - Sistema de drag and drop
   - Organização em colunas Kanban
   - Atualização em tempo real

### Páginas

1. **Página Principal**

   - Visualização Kanban/Lista
   - Estatísticas rápidas
   - Botão de adicionar tarefa

2. **Painel Admin**

   - `/admin`: Dashboard principal
   - `/admin/users`: Gerenciamento de usuários
   - `/admin/activity`: Histórico de atividades
   - `/admin/settings`: Configurações do sistema

3. **Autenticação**
   - `/sign-in`: Login
   - `/sign-up`: Registro
   - `/profile`: Perfil do usuário

## Recursos Técnicos

### Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- Clerk Authentication
- React Icons
- Date-fns
- React Beautiful DnD

### Dependências Principais

```json
{
  "dependencies": {
    "@clerk/nextjs": "^6.11.3",
    "@headlessui/react": "^1.7.19",
    "date-fns": "^2.30.0",
    "react-icons": "^4.12.0"
  }
}
```

### Configurações

1. **Tailwind**

   - Cores personalizadas
   - Plugins de formulário
   - Configurações de responsividade

2. **Clerk**
   - Autenticação
   - Middleware de proteção
   - Rotas públicas/privadas

## Funcionalidades Futuras Planejadas

1. Integração com calendário
2. Exportação de relatórios
3. Sistema de tags personalizadas
4. Compartilhamento de tarefas
5. Modo offline
6. Integração com notificações push

## Como Usar

### Requisitos

- Node.js 14+
- NPM ou Yarn
- Conta no Clerk

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração do Ambiente

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_chave_clerk
CLERK_SECRET_KEY=sua_chave_secreta_clerk
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
