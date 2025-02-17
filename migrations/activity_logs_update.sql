alter table activity_logs
add column ip_address text,
add column user_agent text,
add column severity text default 'info';

create index idx_activity_logs_date on activity_logs(created_at); 