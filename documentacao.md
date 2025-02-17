# To-Do List Pro - Documentação Completa

## Visão Geral do Projeto

O To-Do List Pro é um sistema de gerenciamento de tarefas profissional com autenticação e sistema de pagamentos integrado. O projeto utiliza tecnologias modernas e oferece uma experiência de usuário fluida e segura.

## Tecnologias e Integrações

### Principais Tecnologias

- **Next.js**: Framework React para SSR/SSG
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Clerk**: Autenticação
- **Stripe**: Pagamentos
- **Supabase**: Banco de dados (em implementação)

### Configuração do Ambiente

#### Variáveis de Ambiente (.env.local)

```env
# Clerk - Autenticação
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_****
CLERK_SECRET_KEY=sk_test_****
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe - Pagamentos
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_****
STRIPE_SECRET_KEY=sk_test_****

# Supabase - Banco de Dados
NEXT_PUBLIC_SUPABASE_URL=****
NEXT_PUBLIC_SUPABASE_ANON_KEY=****
```

## Estrutura do Projeto

### Arquivos Principais

```plaintext
src/
├── components/
│   ├── AdminLayout.tsx      # Layout padrão para área administrativa
│   ├── Navbar.tsx          # Barra de navegação
│   └── TaskList.tsx        # Lista de tarefas
├── hooks/
│   ├── useAuth.ts          # Hook para autenticação com Clerk
│   └── useSupabase.ts      # Hook para integração com Supabase
├── lib/
│   ├── adminService.ts     # Serviços administrativos e tipos
│   └── supabaseClient.ts   # Cliente Supabase configurado
└── pages/
    ├── admin/
    │   ├── index.tsx       # Dashboard administrativo
    │   ├── users.tsx       # Gerenciamento de usuários
    │   ├── activities.tsx  # Registro de atividades
    │   └── test-connection.tsx # Teste de conexão Supabase
    ├── sign-in/
    │   └── [[...index]].tsx # Página de login
    └── index.tsx           # Página inicial
```

### Banco de Dados (Supabase)

#### Tabelas Implementadas

```sql
-- Perfis de usuário
create table user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null unique,
  full_name text,
  role text default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Logs de atividade
create table activity_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  action text not null,
  details jsonb default '{}',
  created_at timestamptz default now()
);

-- Tarefas
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  title text not null,
  description text,
  status text default 'pending',
  priority text default 'medium',
  due_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Interfaces TypeScript

```typescript
interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date?: string;
  created_at: string;
  updated_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: any;
  created_at: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
}
```

## Funcionalidades Implementadas

### Autenticação

- [x] Login com Clerk
- [x] Middleware de proteção de rotas
- [x] Integração Clerk + Supabase

### Área Administrativa

- [x] Layout administrativo
- [x] Página de usuários (listagem básica)
- [x] Página de atividades (logs)
- [x] Teste de conexão Supabase

### Integração Supabase

- [x] Cliente configurado
- [x] Hooks personalizados
- [x] Real-time updates

## Pendente de Implementação

### Dashboard

- [ ] Widgets com métricas
- [ ] Gráficos de atividade
- [ ] Resumo de usuários ativos
- [ ] Alertas e notificações

### Gerenciamento de Usuários

- [ ] Filtros de busca
- [ ] Paginação
- [ ] Ações em lote
- [ ] Modal de edição de perfil

### Registro de Atividades

- [ ] Filtros por data
- [ ] Exportação para CSV
- [ ] Visualização detalhada
- [ ] Paginação

### Configurações

- [ ] Configurações do sistema
- [ ] Preferências de notificação
- [ ] Backup e restauração

### Segurança

- [ ] Níveis de acesso
- [ ] Registro de tentativas de login
- [ ] Logs de segurança

## Variáveis de Ambiente

```plaintext
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Limpar cache
Remove-Item -Path .next -Recurse -Force
```

## Próximos Passos

### 1. Integração com Supabase

- Implementar conexão com banco de dados
- Criar tabelas necessárias
- Configurar real-time updates

### 2. Funcionalidades de Tarefas

- CRUD completo de tarefas
- Sistema de filtros e busca
- Ordenação e categorização

### 3. Melhorias no Sistema de Pagamentos

- Implementar webhooks do Stripe
- Sistema de assinaturas
- Histórico de pagamentos

### 4. Área Administrativa

- Dashboard completo
- Gerenciamento de usuários
- Relatórios e análises

## Guia de Desenvolvimento

### Instalação

```bash
git clone [repositório]
npm install
```

### Configuração

1. Copie `.env.example` para `.env.local`
2. Configure as variáveis de ambiente
3. Execute `npm run dev`

### Commits

Seguir o padrão de commits convencionais:

- feat: novas funcionalidades
- fix: correções
- docs: documentação
- style: formatação
- refactor: refatoração de código

## Considerações de Segurança

### Autenticação

- Middleware protege rotas privadas
- Tokens gerenciados pelo Clerk
- Sessões seguras

### Pagamentos

- Chaves do Stripe em variáveis de ambiente
- Webhooks para confirmação segura
- Validação de transações

## Suporte e Contribuição

### Como Contribuir

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das alterações
4. Abra um Pull Request

### Reportando Problemas

- Abra uma issue no GitHub
- Descreva o problema detalhadamente
- Inclua passos para reproduzir

## Licença

Este projeto está sob a licença MIT.

## Integrations

### Stripe

- Implemented Stripe integration for payments
- Configured webhook to process Stripe events
- Created test page at `/admin/payments/test`
- Implemented service to manage customers and subscriptions

### Endpoints

- `/api/webhooks/stripe`: Webhook for Stripe events
- `/admin/payments/test`: Page to test Stripe integration

### Environment Variables

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## TODO

- [ ] Implement plans and pricing page
- [ ] Add credit card form
- [ ] Implement subscription cancellation
- [ ] Add payment history
- [ ] Implement plan upgrade/downgrade

# Limpe o cache do Next.js:

Remove-Item -Path .next -Recurse -Force

# Limpe o cache do npm

npm cache clean --force

# Reinstale as dependências

npm install
