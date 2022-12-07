drop view if exists posts_and_boosts
--;;
alter view posts_and_boosts_no_replies rename to posts_and_boosts
--;;
drop view if exists posts_with_replies
--;;
drop view if exists reply_count
