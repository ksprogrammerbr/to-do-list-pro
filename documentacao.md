# To-Do List - Documentação

## Visão Geral

Este documento descreve o escopo e as funcionalidades do projeto **To-Do List**, desenvolvido com as seguintes tecnologias:

- **Next.js** (Framework React para aplicações web)
- **TypeScript** (Tipagem estática para JavaScript)
- **Tailwind CSS** (Estilização eficiente)
- **Supabase** (Banco de dados PostgreSQL + Backend as a Service)
- **Clerk** (Autenticação e gerenciamento de usuários)

## Estrutura do Projeto

### **Páginas Principais**

```
/src
├── pages
│   ├── index.tsx  # Tela principal (lista de tarefas)
│   ├── admin.tsx  # Tela de administração
│   ├── sign-in.tsx  # Página de login (Clerk)
│   ├── sign-up.tsx  # Página de cadastro (Clerk)
└── components
    ├── Task.tsx  # Componente de tarefa individual
    ├── TaskList.tsx  # Lista de tarefas
    ├── TaskForm.tsx  # Formulário para adicionar tarefas
```

### **Configurações e Hooks**

```
/lib
├── supabase.ts  # Configuração do Supabase
├── auth.ts  # Funções de autenticação
/hooks
├── useTasks.ts  # Hook para CRUD de tarefas
/context
├── TaskContext.tsx  # Context API para gerenciamento de estado
```

## Funcionalidades

### **Autenticação**

- Cadastro/Login via Clerk
- Proteção de rotas (usuário precisa estar logado para acessar a lista de tarefas)
- Logout seguro

### **Gerenciamento de Tarefas (CRUD)**

- Criar nova tarefa (título obrigatório)
- Marcar tarefa como concluída
- Editar título da tarefa
- Excluir tarefa
- Listagem automática de tarefas do usuário autenticado

### **Administração**

- Acesso exclusivo a usuários administradores
- Listagem de todos os usuários cadastrados
- Gerenciamento de tarefas dos usuários
- Exclusão de tarefas específicas

### **Banco de Dados (Supabase - PostgreSQL)**

Tabela `tasks`:

```sql
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  completed boolean default false,
  user_id uuid references auth.users on delete cascade
);
```

### **Melhoria de UI/UX**

- Interface responsiva com Tailwind CSS
- Dark mode
- Animações com Framer Motion
- Notificações (ex: "Tarefa adicionada!" usando react-toastify)

## Deploy

- Aplicação hospedada no **Vercel**
- Supabase configurado na nuvem

## Configuração do Ambiente

Crie um arquivo `.env.local` com as chaves de API:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
```

## Atualizações Recentes

### **Arquivos Criados**

- **Componentes**:
  - `Task.tsx`: Componente de tarefa individual.
  - `TaskList.tsx`: Lista de tarefas.
  - `TaskForm.tsx`: Formulário para adicionar tarefas.

### **Estrutura Atualizada do Projeto**

```
/src
├── pages
│   ├── index.tsx  # Tela principal (lista de tarefas)
│   ├── admin.tsx  # Tela de administração
│   ├── sign-in.tsx  # Página de login (Clerk)
│   ├── sign-up.tsx  # Página de cadastro (Clerk)
└── components
    ├── Task.tsx  # Componente de tarefa individual
    ├── TaskList.tsx  # Lista de tarefas
    ├── TaskForm.tsx  # Formulário para adicionar tarefas
```

### **Próximos Passos**

- Implementar a lógica para gerenciar tarefas na tela principal.
- Conectar o formulário de tarefas ao estado global ou ao banco de dados.

## Conclusão

Este documento detalha o escopo e funcionalidades do projeto **To-Do List**. O sistema será escalável, seguro e de fácil manutenção. O próximo passo é continuar a implementação seguindo este plano. 🚀

## Atualizações Recentes

### Implementações Recentes

- Criados os componentes: Task, TaskList e TaskForm.
- Estrutura de pastas atualizada para incluir a pasta src.

## Atualizações Recentes

### Implementações Recentes

- Implementação da lógica para gerenciar tarefas na tela principal.
- Conexão do formulário de tarefas ao estado global ou ao banco de dados.
