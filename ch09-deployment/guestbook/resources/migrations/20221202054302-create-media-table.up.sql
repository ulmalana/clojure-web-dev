
create table media
  (name text primary key,
  owner text references users(login) on delete set null on update cascade,
  type text not null,
  data bytea not null);
