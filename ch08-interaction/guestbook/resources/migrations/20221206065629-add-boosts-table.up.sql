create table boosts
  (user_id text not null references users(login) on delete cascade on update cascade,
  post_id integer not null references posts(id) on delete cascade on update cascade,
  poster text references users(login) on delete set null on update cascade,
  timestamp timestamp not null default now(),
  primary key(user_id, post_id));
