create table posts
  (id serial primary key,
  name text not null,
  message text not null,
  timestamp timestamp not null default now());
