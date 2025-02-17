create table user_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null references user_profiles(user_id),
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_type text not null,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
); 