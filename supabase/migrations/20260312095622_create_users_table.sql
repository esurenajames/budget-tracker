-- Create users table in public schema
create table public.users (
  id uuid references auth.users not null primary key,
  "isDark" boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;

create policy "Users can view their own data."
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own data."
  on public.users for update
  using ( auth.uid() = id );

-- Handle new user signup automatically
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, "isDark")
  values (new.id, false);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
