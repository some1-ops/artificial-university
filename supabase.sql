-- Schema for Artificial University

-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  streak_count INT DEFAULT 0,
  stake_locked NUMERIC DEFAULT 29.00,
  highest_rank INT,
  capital_unlocked TEXT,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles / Leaderboard View can just query users table for now
-- E.g. SELECT username, streak_count, capital_unlocked FROM users ORDER BY streak_count DESC;

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all users for leaderboard"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
