SELECT * FROM users;

SELECT * FROM tweet WHERE username = 'piyush123';

SELECT tweet_content FROM tweet WHERE tweetid = 1;

SELECT * FROM comments WHERE tweetid = 1;

SELECT * FROM likes WHERE tweetid = 2;

SELECT * FROM follow WHERE follower = 'harsh456';

SELECT * FROM block WHERE username = 'piyush123';

SELECT username, tweet_content FROM tweet INNER JOIN users ON tweet.username = users.username;

SELECT * FROM hashtag WHERE tweetid = 3;

SELECT * FROM retweets WHERE tweetid = 1;

SELECT * FROM messages WHERE receiverid = 'ashish789';

SELECT username, COUNT(*) AS total_likes FROM likes GROUP BY username;

SELECT DISTINCT city FROM location;

SELECT username, COUNT(*) AS tweet_count FROM tweet GROUP BY username;

SELECT * FROM login_sessions WHERE username = 'ashish789';

SELECT * FROM authentication WHERE username = 'piyush123';
