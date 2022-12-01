alter table users
  add column profile JSONB default '{}'::JSONB;
