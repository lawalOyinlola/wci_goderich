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
CREATE INDEX IF NOT EXISTS idx_testimonies_verified ON testimonies(verified);

-- Function to validate date (handles month-specific day limits and leap years)
CREATE OR REPLACE FUNCTION is_valid_date(month_val INTEGER, day_val INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  test_date DATE;
BEGIN
  -- Validate month range
  IF month_val < 1 OR month_val > 12 THEN
    RETURN FALSE;
  END IF;
  
  -- Validate day range
  IF day_val < 1 OR day_val > 31 THEN
    RETURN FALSE;
  END IF;
  
  -- Use PostgreSQL's date validation to check if the date is valid
  -- Try with a non-leap year first (2001), then a leap year (2000) for February 29
  BEGIN
    -- For February, check both non-leap and leap year
    IF month_val = 2 AND day_val = 29 THEN
      test_date := make_date(2000, month_val, day_val); -- 2000 is a leap year
    ELSE
      test_date := make_date(2001, month_val, day_val); -- 2001 is not a leap year
    END IF;
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN FALSE;
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Birthdays Table
CREATE TABLE IF NOT EXISTS birthdays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  day INTEGER NOT NULL CHECK (is_valid_date(month, day)),
  image TEXT NOT NULL, -- Cloudinary URL
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_birthday UNIQUE (name, month, day)
);

-- Indexes for birthdays
CREATE INDEX IF NOT EXISTS idx_birthdays_month ON birthdays(month);
CREATE INDEX IF NOT EXISTS idx_birthdays_month_day ON birthdays(month, day);
CREATE INDEX IF NOT EXISTS idx_birthdays_verified ON birthdays(verified);
CREATE INDEX IF NOT EXISTS idx_birthdays_featured ON birthdays(featured);

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

-- Policies: Allow public read and insert, restrict update/delete to service role

-- Testimonies: Allow public read and insert, restrict update/delete to authenticated service role
CREATE POLICY "Allow public read access on testimonies"
  ON testimonies FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on testimonies" 
  ON testimonies FOR INSERT
  WITH CHECK (true); -- Visitors can upload testimonies (verified defaults to false)

CREATE POLICY "Allow service role update on testimonies"
  ON testimonies FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); -- Only service role can update (e.g., to verify)

CREATE POLICY "Allow service role delete on testimonies"
  ON testimonies FOR DELETE
  USING (auth.role() = 'service_role'); -- Only service role can delete

-- Birthdays: Allow public read and insert, restrict update/delete to authenticated service role
CREATE POLICY "Allow public read access on birthdays"
  ON birthdays FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on birthdays"
  ON birthdays FOR INSERT
  WITH CHECK (true); -- Visitors can upload birthdays (verified defaults to false)

CREATE POLICY "Allow service role update on birthdays"
  ON birthdays FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); -- Only service role can update (e.g., to verify)

CREATE POLICY "Allow service role delete on birthdays"
  ON birthdays FOR DELETE
  USING (auth.role() = 'service_role'); -- Only service role can delete

