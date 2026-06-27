-- Schema for Artificial University

-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  streak_count INT DEFAULT 0,
  stake_locked NUMERIC DEFAULT 0.00,
  stake_status TEXT DEFAULT 'idle', -- 'idle', 'locked', 'forfeited'
  paystack_customer_id TEXT,
  highest_rank INT,
  capital_unlocked TEXT,
  prop_challenge_wins INT DEFAULT 0,
  prop_challenge_total INT DEFAULT 0,
  elo_rating INT DEFAULT 1000,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform stats table (e.g. Community Pool)
CREATE TABLE platform_stats (
  id INT PRIMARY KEY DEFAULT 1,
  community_pool NUMERIC DEFAULT 1430.00
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all users for leaderboard"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view platform stats"
  ON platform_stats FOR SELECT
  USING (true);

-- Trigger to automatically create a public.users row on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (
    new.id,
    new.email,
    COALESCE(
      new.raw_user_meta_data->>'username',
      split_part(new.email, '@', 1)
    )
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

