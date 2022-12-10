alter table posts
  add column author text
  references users(login)
  on delete set null
  on update cascade;
