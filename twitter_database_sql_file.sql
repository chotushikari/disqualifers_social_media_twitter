CREATE DATABASE twitter;

USE twitter;

CREATE TABLE location (
    city        VARCHAR(50) PRIMARY KEY,
    country     VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    username     VARCHAR(40) PRIMARY KEY,
    first_name   VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50),
    gender       CHAR(1) NOT NULL CHECK (gender IN ('M', 'F')),
    birth_date   DATE NOT NULL,
    bio          VARCHAR(180),
    city         VARCHAR(50),
    FOREIGN KEY (city) REFERENCES location(city)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE authentication (
    email        VARCHAR(100) PRIMARY KEY,
    username     VARCHAR(40) UNIQUE NOT NULL,
    password     VARCHAR(60) NOT NULL,
    sec_question VARCHAR(200) NOT NULL,
    sec_answer   VARCHAR(80) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE follow (
    follower     VARCHAR(40),
    following    VARCHAR(40),
    PRIMARY KEY (follower, following),
    FOREIGN KEY (follower) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (following) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE block (
    username     VARCHAR(40),
    blocked_user VARCHAR(40),
    PRIMARY KEY (username, blocked_user),
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (blocked_user) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tweet (
    tweet_id     INT AUTO_INCREMENT PRIMARY KEY,
    tweet_content VARCHAR(280) NOT NULL,
    username      VARCHAR(40) NOT NULL,
    timestamp_t   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    city          VARCHAR(50),
    FOREIGN KEY (city) REFERENCES location(city)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments (
    comment_id       INT AUTO_INCREMENT PRIMARY KEY,
    tweet_id         INT NOT NULL,
    username         VARCHAR(40) NOT NULL,
    comment_content  VARCHAR(280) NOT NULL,
    timestamp_c      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE hashtag (
    hashtag       VARCHAR(100),
    tweet_id      INT,
    PRIMARY KEY (hashtag, tweet_id),
    FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE retweets (
    tweet_id       INT,
    username       VARCHAR(40),
    timestamp_r    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tweet_id, username),
    FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE retweet_likes (
    tweet_id    INT,
    username      VARCHAR(40),
    timestamp_rl  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tweet_id, username),
    FOREIGN KEY (tweet_id, username) REFERENCES retweets(tweet_id, username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE likes (
    tweet_id      INT,
    username      VARCHAR(40),
    timestamp_l   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tweet_id, username),
    FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE messages (
    message_id    INT AUTO_INCREMENT PRIMARY KEY,
    sender_id     VARCHAR(40) NOT NULL,
    receiver_id   VARCHAR(40) NOT NULL,
    msg_content    VARCHAR(1000) NOT NULL,
    timestamp_m    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE login_sessions (
    session_id     INT AUTO_INCREMENT PRIMARY KEY,
    username       VARCHAR(40) NOT NULL,
    login_time     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    logout_time    TIMESTAMP,
    session_token  VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);
