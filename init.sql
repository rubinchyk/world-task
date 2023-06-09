CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300),
  content TEXT
);

INSERT INTO posts (title, content) VALUES ('Test Post 1', '<h1>Post 1</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 2', '<h1>Post 2</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 3', '<h1>Post 3</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 4', '<h1>Post 4</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 5', '<h1>Post 5</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 6', '<h1>Post 6</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 7', '<h1>Post 7</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 8', '<h1>Post 8</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 9', '<h1>Post 9</h1>');
INSERT INTO posts (title, content) VALUES ('Test Post 10', '<h1>Post 10</h1>');