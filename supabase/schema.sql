-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Testimonies Table
CREATE TABLE IF NOT EXISTS testimonies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL, -- Cloudinary URL
  testimony TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('written', 'video', 'audio')),
  video_url TEXT, -- Only for video type
  audio_url TEXT, -- Only for audio type
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for testimonies
CREATE INDEX IF NOT EXISTS idx_testimonies_type ON testimonies(type);
CREATE INDEX IF NOT EXISTS idx_testimonies_featured ON testimonies(featured);
CREATE INDEX IF NOT EXISTS idx_testimonies_date ON testimonies(date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonies_category ON testimonies(category);

-- Birthdays Table
CREATE TABLE IF NOT EXISTS birthdays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 31),
  image TEXT NOT NULL, -- Cloudinary URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for birthdays
CREATE INDEX IF NOT EXISTS idx_birthdays_month ON birthdays(month);
CREATE INDEX IF NOT EXISTS idx_birthdays_month_day ON birthdays(month, day);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_testimonies_updated_at 
  BEFORE UPDATE ON testimonies 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_birthdays_updated_at 
  BEFORE UPDATE ON birthdays 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE birthdays ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anyone to read, but restrict writes
-- You can modify these policies based on your authentication needs

-- Testimonies: Allow public read, restrict write (you'll need to add auth later)
CREATE POLICY "Allow public read access on testimonies"
  ON testimonies FOR SELECT
  USING (true);

CREATE POLICY "Allow insert on testimonies" 
  ON testimonies FOR INSERT
  WITH CHECK (true); -- You can add authentication check here later

CREATE POLICY "Allow update on testimonies"
  ON testimonies FOR UPDATE
  USING (true); -- You can add authentication check here later

CREATE POLICY "Allow delete on testimonies"
  ON testimonies FOR DELETE
  USING (true); -- You can add authentication check here later

-- Birthdays: Allow public read, restrict write
CREATE POLICY "Allow public read access on birthdays"
  ON birthdays FOR SELECT
  USING (true);

CREATE POLICY "Allow insert on birthdays"
  ON birthdays FOR INSERT
  WITH CHECK (true); -- You can add authentication check here later

CREATE POLICY "Allow update on birthdays"
  ON birthdays FOR UPDATE
  USING (true); -- You can add authentication check here later

CREATE POLICY "Allow delete on birthdays"
  ON birthdays FOR DELETE
  USING (true); -- You can add authentication check here later

