-- :name save-message! :<! :1
-- :doc creates a new message using the name and message keys
INSERT INTO posts
(author, name, message, parent)
VALUES (:author, :name, :message, :parent)
RETURNING *;

-- :name get-messages :? :*
-- :doc selects all available messages
SELECT * from posts_with_meta

-- :name create-user!* :! :n
-- :doc creates a new user with the provided login and hashed password
INSERT INTO users
(login, password)
VALUES (:login, :password)

-- :name get-user-for-auth* :? :1
-- :doc selects a user for authentication
select * from users
 where login = :login

-- :name get-messages-by-author :? :*
-- :doc selects all messages posted by a user
SELECT * FROM posts_with_meta
WHERE author = :author


-- :name set-profile-for-user* :<! :1
-- :doc sets a profile map for the specified user
update users
set profile = :profile
where :login = login
returning *;

-- :name get-user* :? :1
-- :doc gets a user's publicly available info
select login, created_at, profile from users
where login = :login

-- :name save-file! :! :n
-- saves a file to the database
insert into media
(name, type, owner, data)
values (:name, :type, :owner, :data)
on conflict (name) do update
set type = :type,
    data = :data
where media.owner = :owner

-- :name get-file :? :1
-- gets a file from the database
select * from media
where name = :name

-- :name set-password-for-user!* :! :n
update users
set password = :password
where login = :login

-- :name delete-user!* :! :n
delete from users
 where login = :login

-- :name get-message :? :1
-- :doc selects a message
select * from posts_with_meta
inner join (select id, parent from posts) as p using (id)
inner join reply_count using (id)
 where id = :id

-- :name boost-post! :! :n
-- boost a post or moves a boost to the top of timeline
insert into boosts
(user_id, post_id, poster)
values (:user, :post, nullif(:poster, :user))
on conflict (user_id, post_id) do update
set timestamp = now()
 where boosts.user_id = :user
   and boosts.post_id = :post

-- :name boosters-of-post :? :*
-- get all boosters of a post
select user_id as user from boosts
 where post_id = :post

-- :name get-reboosts :? :*
-- get all boosts descended from a given boost
with recursive reboosts as
 (with post_boosts as
   (select user_id, poster
    from boosts
    where post_id = :post)
   select user_id, poster
   from post_boosts
   where user_id = :user
      union
   select b.user_id, b.poster
   from post_boosts b inner join reboosts r on r.user_id = b.poster)
select user_id as user, poster as source from reboosts

-- :name get-boost-chain :? :*
-- get all boost above the original boost
with recursive reboosts as
(with post_boosts as
(select user_id, poster
from boosts
where post_id = :post)
select user_id, poster
from post_boosts
where user_id = :user
union
select b.user_id, b.poster
from post_boosts b inner join reboosts r on r.poster = b.user_id)
select user_id as user, poster as source from reboosts

-- :name get-timeline :? :*
-- gets the latest post or boost for each post
select * from
(select distinct on (p.id) * from posts_and_boosts as p
order by p.id, p.posted_at desc) as t
 order by t.posted_at asc

-- :name get-timeline-for-poster :? :*
-- get the latest post or boost for each post
select * from
(select distinct on (p.id) * from posts_and_boosts as p
where p.poster = :poster
order by p.id, p.posted_at desc) as t
 order by t.posted_at asc

-- :name get-timeline-post :? :1
-- get the boosted post for updating timelines
select * from posts_and_boosts
 where is_boost = :is_boost
   and poster = :user
   and id = :post
 order by posted_at asc
 limit 1

-- :name get-replies :? :*
select * from posts_with_meta
              inner join (select id, parent from posts) as p using (id)
              inner join reply_count using (id)
 where id in (select id from posts
               where parent = :id)

-- :name get-parents
select * from posts_with_meta
              inner join (select id, parent from posts) as p using (id)
              inner join reply_count using (id)
 where id in (with recursive parents as
                  (select id, parent from posts
                    where id = :id
                          union
                   select p.id, p.parent from posts p
                                              inner join parents pp
                                                  on p.id = pp.parent)
 select id from parents)
