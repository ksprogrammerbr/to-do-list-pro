-- Criação da tabela de tarefas
create table if not exists tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text not null default 'pending',
  priority text not null default 'medium',
  due_date timestamptz,
  assigned_to uuid references user_profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger para atualizar updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_tasks_updated_at
  before update on tasks
  for each row
  execute function update_updated_at_column(); 