-- Hortus: persistent garden directory with private owner credentials.
-- Only public garden profile fields are exposed through the Data API.

create extension if not exists pgcrypto with schema extensions;
create schema if not exists private;

revoke all on schema private from public, anon, authenticated;

create table if not exists public.gardens (
  id text primary key,
  name text not null check (char_length(name) between 2 and 100),
  country text not null,
  region text not null,
  state text not null,
  city text not null,
  district text not null default '',
  crops text[] not null default array[]::text[],
  members integer not null check (members >= 0),
  type text not null,
  access text not null,
  description text not null check (char_length(description) between 30 and 500),
  photo text check (photo is null or char_length(photo) <= 1800000),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at date not null default current_date
);

create table if not exists private.garden_credentials (
  garden_id text primary key references public.gardens(id) on delete cascade,
  password_hash text not null,
  recovery_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists private.garden_attempts (
  garden_id text not null,
  purpose text not null check (purpose in ('owner', 'recovery')),
  failures integer not null default 0,
  window_started timestamptz not null default now(),
  locked_until timestamptz,
  primary key (garden_id, purpose)
);

alter table public.gardens enable row level security;
alter table private.garden_credentials enable row level security;
alter table private.garden_attempts enable row level security;

revoke all on table public.gardens from anon, authenticated;
grant select on table public.gardens to anon, authenticated;
revoke all on table private.garden_credentials from public, anon, authenticated;
revoke all on table private.garden_attempts from public, anon, authenticated;

drop policy if exists "Published gardens are visible to everyone" on public.gardens;
create policy "Published gardens are visible to everyone"
  on public.gardens for select to anon, authenticated
  using (published = true);

create or replace function private.is_rate_limited(p_code text, p_purpose text)
returns boolean
language sql
security definer
set search_path = pg_catalog, private
as $$
  select coalesce((
    select locked_until > now()
    from private.garden_attempts
    where garden_id = upper(trim(p_code)) and purpose = p_purpose
  ), false);
$$;

create or replace function private.record_failed_attempt(p_code text, p_purpose text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, private
as $$
begin
  insert into private.garden_attempts (garden_id, purpose, failures, window_started)
  values (upper(trim(p_code)), p_purpose, 1, now())
  on conflict (garden_id, purpose) do update
  set failures = case
        when private.garden_attempts.window_started < now() - interval '15 minutes' then 1
        else private.garden_attempts.failures + 1
      end,
      window_started = case
        when private.garden_attempts.window_started < now() - interval '15 minutes' then now()
        else private.garden_attempts.window_started
      end,
      locked_until = case
        when (case
          when private.garden_attempts.window_started < now() - interval '15 minutes' then 1
          else private.garden_attempts.failures + 1
        end) >= 5 then now() + interval '15 minutes'
        else private.garden_attempts.locked_until
      end;
end;
$$;

create or replace function private.clear_attempts(p_code text, p_purpose text)
returns void
language sql
security definer
set search_path = pg_catalog, private
as $$
  delete from private.garden_attempts
  where garden_id = upper(trim(p_code)) and purpose = p_purpose;
$$;

create or replace function private.verify_garden_secret(
  p_code text,
  p_secret text,
  p_purpose text
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, private, extensions
as $$
declare
  v_hash text;
begin
  if p_purpose not in ('owner', 'recovery') or private.is_rate_limited(p_code, p_purpose) then
    return false;
  end if;

  select case when p_purpose = 'owner' then password_hash else recovery_hash end
    into v_hash
  from private.garden_credentials
  where garden_id = upper(trim(p_code));

  if v_hash is not null and extensions.crypt(
    case when p_purpose = 'recovery' then lower(regexp_replace(trim(p_secret), '\s+', ' ', 'g')) else p_secret end,
    v_hash
  ) = v_hash then
    perform private.clear_attempts(p_code, p_purpose);
    return true;
  end if;

  perform private.record_failed_attempt(p_code, p_purpose);
  return false;
end;
$$;

create or replace function public.garden_register(
  p_garden jsonb,
  p_password text,
  p_recovery_words text
)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public, private, extensions
as $$
declare
  v_code text;
  v_words text;
  v_members integer;
  v_photo text;
begin
  if p_password is null or char_length(p_password) < 10 then
    raise exception 'Use uma senha com pelo menos 10 caracteres.';
  end if;
  if octet_length(p_password) > 72 then
    raise exception 'A senha deve ter no máximo 72 bytes.';
  end if;
  v_words := lower(regexp_replace(trim(coalesce(p_recovery_words, '')), '\s+', ' ', 'g'));
  if array_length(string_to_array(v_words, ' '), 1) <> 6 then
    raise exception 'Informe exatamente seis palavras de recuperação.';
  end if;
  if coalesce(trim(p_garden->>'name'), '') = ''
     or coalesce(trim(p_garden->>'country'), '') = ''
     or coalesce(trim(p_garden->>'region'), '') = ''
     or coalesce(trim(p_garden->>'state'), '') = ''
     or coalesce(trim(p_garden->>'city'), '') = ''
     or coalesce(trim(p_garden->>'type'), '') = ''
     or coalesce(trim(p_garden->>'access'), '') = ''
     or coalesce(trim(p_garden->>'description'), '') = '' then
    raise exception 'Preencha os dados obrigatórios da horta.';
  end if;
  if jsonb_typeof(p_garden->'crops') <> 'array'
     or jsonb_array_length(p_garden->'crops') = 0 then
    raise exception 'Selecione pelo menos um cultivo.';
  end if;
  v_members := (p_garden->>'members')::integer;
  if v_members < 0 then raise exception 'O número de participantes não pode ser negativo.'; end if;
  v_photo := nullif(p_garden->>'photo', '');
  if v_photo is not null and char_length(v_photo) > 1800000 then
    raise exception 'A foto excede o limite permitido.';
  end if;

  loop
    v_code := 'HT-' || upper(substr(encode(extensions.gen_random_bytes(6), 'hex'), 1, 12));
    exit when not exists (select 1 from public.gardens where id = v_code);
  end loop;

  insert into public.gardens (
    id, name, country, region, state, city, district, crops, members, type, access, description, photo
  ) values (
    v_code,
    trim(p_garden->>'name'), trim(p_garden->>'country'), trim(p_garden->>'region'),
    trim(p_garden->>'state'), trim(p_garden->>'city'), coalesce(trim(p_garden->>'district'), ''),
    array(select jsonb_array_elements_text(p_garden->'crops')),
    v_members, trim(p_garden->>'type'), trim(p_garden->>'access'), trim(p_garden->>'description'), v_photo
  );

  insert into private.garden_credentials (garden_id, password_hash, recovery_hash)
  values (
    v_code,
    extensions.crypt(p_password, extensions.gen_salt('bf', 12)),
    extensions.crypt(v_words, extensions.gen_salt('bf', 12))
  );

  return v_code;
end;
$$;

create or replace function public.garden_owner_login(p_code text, p_password text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, private, extensions
as $$
declare
  v_garden jsonb;
begin
  if not private.verify_garden_secret(p_code, p_password, 'owner') then return null; end if;
  select to_jsonb(g) - 'published' into v_garden
  from public.gardens g
  where g.id = upper(trim(p_code));
  return v_garden;
end;
$$;

create or replace function public.garden_update(
  p_code text,
  p_password text,
  p_garden jsonb
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, private, extensions
as $$
declare
  v_photo text;
begin
  if not private.verify_garden_secret(p_code, p_password, 'owner') then return false; end if;
  v_photo := nullif(p_garden->>'photo', '');
  if v_photo is not null and char_length(v_photo) > 1800000 then
    raise exception 'A foto excede o limite permitido.';
  end if;

  update public.gardens set
    name = coalesce(nullif(trim(p_garden->>'name'), ''), name),
    country = coalesce(nullif(trim(p_garden->>'country'), ''), country),
    region = coalesce(nullif(trim(p_garden->>'region'), ''), region),
    state = coalesce(nullif(trim(p_garden->>'state'), ''), state),
    city = coalesce(nullif(trim(p_garden->>'city'), ''), city),
    district = coalesce(p_garden->>'district', district),
    crops = case when jsonb_typeof(p_garden->'crops') = 'array'
      then array(select jsonb_array_elements_text(p_garden->'crops')) else crops end,
    members = coalesce(nullif(p_garden->>'members', '')::integer, members),
    type = coalesce(nullif(trim(p_garden->>'type'), ''), type),
    access = coalesce(nullif(trim(p_garden->>'access'), ''), access),
    description = coalesce(nullif(trim(p_garden->>'description'), ''), description),
    photo = coalesce(v_photo, photo),
    updated_at = current_date
  where id = upper(trim(p_code));
  return found;
end;
$$;

create or replace function public.garden_recover_password(
  p_code text,
  p_recovery_words text,
  p_new_password text
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, private, extensions
as $$
begin
  if p_new_password is null or char_length(p_new_password) < 10 then
    raise exception 'Use uma senha com pelo menos 10 caracteres.';
  end if;
  if octet_length(p_new_password) > 72 then
    raise exception 'A senha deve ter no máximo 72 bytes.';
  end if;
  if not private.verify_garden_secret(p_code, p_recovery_words, 'recovery') then return false; end if;

  update private.garden_credentials set
    password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf', 12))
  where garden_id = upper(trim(p_code));
  perform private.clear_attempts(p_code, 'owner');
  perform private.clear_attempts(p_code, 'recovery');
  return found;
end;
$$;

revoke all on function private.is_rate_limited(text, text) from public, anon, authenticated;
revoke all on function private.record_failed_attempt(text, text) from public, anon, authenticated;
revoke all on function private.clear_attempts(text, text) from public, anon, authenticated;
revoke all on function private.verify_garden_secret(text, text, text) from public, anon, authenticated;
revoke all on function public.garden_register(jsonb, text, text) from public, anon, authenticated;
revoke all on function public.garden_owner_login(text, text) from public, anon, authenticated;
revoke all on function public.garden_update(text, text, jsonb) from public, anon, authenticated;
revoke all on function public.garden_recover_password(text, text, text) from public, anon, authenticated;

grant execute on function public.garden_register(jsonb, text, text) to anon, authenticated;
grant execute on function public.garden_owner_login(text, text) to anon, authenticated;
grant execute on function public.garden_update(text, text, jsonb) to anon, authenticated;
grant execute on function public.garden_recover_password(text, text, text) to anon, authenticated;

