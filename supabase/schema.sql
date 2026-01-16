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

-- Prayer Requests Table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  category TEXT NOT NULL,
  request TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'praying', 'answered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer Group Members Table
CREATE TABLE IF NOT EXISTS prayer_group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  prayer_group_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  previous_experience TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for prayer tables
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_category ON prayer_requests(category);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_group_members_status ON prayer_group_members(status);
CREATE INDEX IF NOT EXISTS idx_prayer_group_members_group_id ON prayer_group_members(prayer_group_id);
CREATE INDEX IF NOT EXISTS idx_prayer_group_members_created_at ON prayer_group_members(created_at DESC);

-- Triggers to automatically update updated_at for prayer tables
CREATE TRIGGER update_prayer_requests_updated_at 
  BEFORE UPDATE ON prayer_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prayer_group_members_updated_at 
  BEFORE UPDATE ON prayer_group_members 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for prayer tables
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_group_members ENABLE ROW LEVEL SECURITY;


-- Policies for prayer_requests: Restrict public read to service role (PII protection), allow public insert, restrict update/delete to service role
-- Public reads are restricted to prevent PII exposure (email, phone, and name when is_anonymous=true)
-- The API endpoint uses service_role and sanitizes data before returning
CREATE POLICY "Allow service role read on prayer_requests"
  ON prayer_requests FOR SELECT
  -- USING (true);
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow public insert on prayer_requests" 
  ON prayer_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role update on prayer_requests"
  ON prayer_requests FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on prayer_requests"
  ON prayer_requests FOR DELETE
  USING (auth.role() = 'service_role');

-- Policies for prayer_group_members: Allow public insert, restrict read/update/delete to service role
CREATE POLICY "Allow public insert on prayer_group_members"
  ON prayer_group_members FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role read on prayer_group_members"
  ON prayer_group_members FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role update on prayer_group_members"
  ON prayer_group_members FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on prayer_group_members"
  ON prayer_group_members FOR DELETE
  USING (auth.role() = 'service_role');

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL, -- Cloudinary URL
  alt_text TEXT NOT NULL,
  orientation TEXT NOT NULL CHECK (orientation IN ('portrait', 'landscape', 'square')),
  category TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for gallery
CREATE INDEX IF NOT EXISTS idx_gallery_orientation ON gallery(orientation);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery(display_order DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

-- Trigger to automatically update updated_at for gallery
CREATE TRIGGER update_gallery_updated_at 
  BEFORE UPDATE ON gallery 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies for gallery: Allow public read, restrict insert/update/delete to service role
CREATE POLICY "Allow public read access on gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Allow service role insert on gallery"
  ON gallery FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role update on gallery"
  ON gallery FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on gallery"
  ON gallery FOR DELETE
  USING (auth.role() = 'service_role');

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for contact_messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_subject ON contact_messages(subject);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Trigger to automatically update updated_at for contact_messages
CREATE TRIGGER update_contact_messages_updated_at 
  BEFORE UPDATE ON contact_messages 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for contact_messages: Restrict read to service role (PII protection), allow public insert, restrict update/delete to service role
CREATE POLICY "Allow service role read on contact_messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow public insert on contact_messages" 
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role update on contact_messages"
  ON contact_messages FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role delete on contact_messages"
  ON contact_messages FOR DELETE
  USING (auth.role() = 'service_role');
