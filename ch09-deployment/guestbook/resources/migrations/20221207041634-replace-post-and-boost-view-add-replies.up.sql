create or replace view reply_count as
  select p.id as id, count(c.id) as reply_count
    from posts p left join posts c on c.parent = p.id
   group by p.id
--;;
create or replace view posts_with_replies as
  select * from
             (with recursive posts_with_replies as
                  (with replies as
                       (select p.parent as parent,
                               p.id as id,
                               to_jsonb(pwm) as msg,
                               p.id as post_id
                          from posts p
                               left join posts_with_meta pwm
                                   on p.id = pwm.id)
                  select parent, id, msg, post_id
                    from replies
                           union
                  select r.parent, r.id, r.msg, p.post_id
                    from replies r
                         inner join posts_with_replies p
                             on r.id = p.parent)
             select post_id as id,
                    jsonb_agg(msg) as messages,
                    (array_agg(id))[count(id)] as root_id,
                    count(id) <> 1 as is_reply
               from posts_with_replies
              group by post_id) as pwr
--;;
alter view posts_and_boosts rename to posts_and_boosts_no_replies
--;;
create or replace view posts_and_boosts as
  select *
    from posts_with_replies
         inner join reply_count using (id)
         inner join posts_and_boosts_no_replies using (id)
