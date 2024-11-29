CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  movieId INTEGER NOT NULL,
  path TEXT,
  url TEXT,
  -- a datetime for when the event starts
  eventStartsAt datetime NOT NULL default current_timestamp,
  -- a datetime for when the event ends
  eventEndsAt datetime NOT NULL default current_timestamp,
  createdAt datetime NOT NULL default current_timestamp,
  price INTEGER,
  priceDescription TEXT,

  FOREIGN KEY (movieId) REFERENCES movies (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS event_users (
  eventId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  attending INTEGER NOT NULL DEFAULT 0,

  FOREIGN KEY (eventId) REFERENCES events (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE(eventId, userId)
);
