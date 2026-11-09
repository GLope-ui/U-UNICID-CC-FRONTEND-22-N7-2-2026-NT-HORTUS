-- Allow a garden owner to permanently remove the public profile and its credentials.

create or replace function public.garden_delete(
  p_code text,
  p_password text
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, private, extensions
as $$
declare
  v_code text := private.normalize_garden_code(p_code);
begin
  if not private.verify_garden_secret(v_code, p_password, 'owner') then
    return false;
  end if;

  perform private.clear_attempts(v_code, 'owner');
  perform private.clear_attempts(v_code, 'recovery');

  delete from public.gardens
  where id = v_code;

  return found;
end;
$$;

revoke all on function public.garden_delete(text, text) from public, anon, authenticated;
grant execute on function public.garden_delete(text, text) to anon, authenticated;
