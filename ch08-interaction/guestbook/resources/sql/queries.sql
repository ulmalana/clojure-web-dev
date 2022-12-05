-- :name save-message! :! :n
-- :doc creates a new message using the name and message keys
INSERT INTO posts
(author, name, message)
VALUES (:author, :name, :message)
RETURNING *;

-- :name get-messages :? :*
-- :doc selects all available messages
SELECT
  p.id as id,
  p.timestamp as timestamp,
  p.message as message,
  p.name as name,
  p.author as author,
  a.profile->>'avatar' as avatar
from posts as p join users as a
on a.login = p.author


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
SELECT
  p.id as id,
  p.timestamp as timestamp,
  p.message as message,
  p.name as name,
  p.author as author,
  a.profile->>'avatar' as avatar
FROM posts as p join users as a
on a.login = p.author
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
select
  p.id as id,
  p.timestamp as timestamp,
  p.message as message,
  p.name as name,
  p.author as author,
  a.profile->>'avatar' as avatar
  from posts as p join users as a
                      on a.login = p.author
 where p.id = :id
