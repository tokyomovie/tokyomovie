CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  url TEXT,
  icon TEXT
);
