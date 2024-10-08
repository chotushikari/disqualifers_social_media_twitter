INSERT INTO country (country_name) VALUES ('India');

INSERT INTO location (city, country_id) VALUES ('Delhi', 1);
INSERT INTO location (city, country_id) VALUES ('Mumbai', 1);
INSERT INTO location (city, country_id) VALUES ('Bangalore', 1);
INSERT INTO location (city, country_id) VALUES ('Jaipur', 1);

INSERT INTO users (username, firstName, lastName, gender, birthDate, bio, city) 
VALUES 
    ('piyush123', 'Piyush', 'Kumar', 'M', '2001-05-15', 'A passionate computer science student.', 'Delhi'),
    ('harsh456', 'Harsh', 'Sharma', 'M', '2002-03-10', 'Love coding and technology.', 'Mumbai'),
    ('ashish789', 'Ashish', 'Pal', 'M', '2001-09-22', 'An aspiring software engineer.', 'Bangalore');

INSERT INTO authentication (email, username, password, sec_que, sec_ans) 
VALUES 
    ('piyush@example.com', 'piyush123', 'hashed_password1', 'First pet name?', 'Tommy'),
    ('harsh@example.com', 'harsh456', 'hashed_password2', 'Mother’s maiden name?', 'Gupta'),
    ('ashish@example.com', 'ashish789', 'hashed_password3', 'Favorite book?', 'Harry Potter');

INSERT INTO follow (follower, following) 
VALUES 
    ('piyush123', 'harsh456'),
    ('harsh456', 'ashish789'),
    ('ashish789', 'piyush123');

INSERT INTO block (username, blocked_user) 
VALUES 
    ('piyush123', 'ashish789');

INSERT INTO tweet (tweetid, tweet_content, username, timestamp_t, city) 
VALUES 
    (DEFAULT, 'Excited for the upcoming hackathon!', 'piyush123', CURRENT_TIMESTAMP, 'Delhi'),
    (DEFAULT, 'Just finished a great book on algorithms.', 'harsh456', CURRENT_TIMESTAMP, 'Mumbai'),
    (DEFAULT, 'Can’t wait for the college fest next month!', 'ashish789', CURRENT_TIMESTAMP, 'Bangalore');

INSERT INTO comments (tweetid, username, comment_content, timestamp_c) 
VALUES 
    (1, 'harsh456', 'Good luck, Piyush!', CURRENT_TIMESTAMP),
    (2, 'piyush123', 'That’s awesome, Harsh!', CURRENT_TIMESTAMP),
    (3, 'harsh456', 'I am looking forward to it too!', CURRENT_TIMESTAMP);

INSERT INTO hashtag (hashtag, tweetid) 
VALUES 
    ('#hackathon', 1),
    ('#books', 2),
    ('#collegefest', 3);

INSERT INTO retweets (tweetid, username, timestamp_r) 
VALUES 
    (1, 'harsh456', CURRENT_TIMESTAMP),
    (2, 'piyush123', CURRENT_TIMESTAMP),
    (3, 'ashish789', CURRENT_TIMESTAMP);

INSERT INTO likes (tweetid, username, timeStamp_l) 
VALUES 
    (1, 'ashish789', CURRENT_TIMESTAMP),
    (2, 'piyush123', CURRENT_TIMESTAMP),
    (3, 'harsh456', CURRENT_TIMESTAMP);

INSERT INTO messages (senderid, receiverid, msg_content, timestamp_m) 
VALUES 
    ('piyush123', 'harsh456', 'Hey, are you joining the hackathon?', CURRENT_TIMESTAMP),
    ('harsh456', 'ashish789', 'Let’s collaborate on our project!', CURRENT_TIMESTAMP);

INSERT INTO login_sessions (username, login_time, logout_time, session_token) 
VALUES 
    ('piyush123', CURRENT_TIMESTAMP, NULL, 'token_piyush'),
    ('harsh456', CURRENT_TIMESTAMP, NULL, 'token_harsh'),
    ('ashish789', CURRENT_TIMESTAMP, NULL, 'token_ashish');
