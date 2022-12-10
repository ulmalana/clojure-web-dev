alter table posts
  add column parent integer references posts(id);
