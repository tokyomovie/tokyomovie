CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  movieId INTEGER NOT NULL,
  path TEXT,
  url TEXT,
  -- a datetime for when the event starts
  createdAt datetime NOT NULL default current_timestamp,
  -- a datetime for when the event ends
  eventEndsAt datetime NOT NULL default current_timestamp,

  FOREIGN KEY (movieId) REFERENCES movies (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS event_users (
  eventId INTEGER NOT NULL,
  userId INTEGER NOT NULL,

  FOREIGN KEY (eventId) REFERENCES events (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE(eventId, userId)
);
