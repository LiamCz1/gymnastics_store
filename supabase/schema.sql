create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric(10, 2) not null check (price >= 0),
  description text not null default '',
  image text not null default '',
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text not null unique,
  lesson text not null,
  date date not null,
  time text not null,
  email text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  items jsonb not null default '[]'::jsonb,
  total numeric(10, 2) not null check (total >= 0),
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.bookings enable row level security;
alter table public.orders enable row level security;

create policy "Products are publicly readable"
  on public.products for select using (true);

create policy "Customers read their own bookings"
  on public.bookings for select using (auth.uid() = user_id);

create policy "Customers create their own bookings"
  on public.bookings for insert with check (auth.uid() = user_id);

create policy "Customers read their own orders"
  on public.orders for select using (auth.uid() = user_id);
