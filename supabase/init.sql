-- Supabase SQL Initialization Script
-- Table: leads (for storing contact form submissions)

-- Create enum type for profil
DO $$ BEGIN
    CREATE TYPE profil_type AS ENUM ('particulier', 'professionnel');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ,
    nom_complet VARCHAR(255) NOT NULL CHECK (char_length(nom_complet) >= 1),
    email VARCHAR(254) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    profil profil_type NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) <= 5000)
);

-- Add comment to the table
COMMENT ON TABLE leads IS 'Contact form submissions from the website';

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
    CREATE TRIGGER leads_updated_at
        BEFORE UPDATE ON leads
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts only (no read access)
CREATE POLICY "Allow anonymous insert" 
    ON leads 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Policy: Deny all reads for anonymous users
CREATE POLICY "Deny anonymous reads" 
    ON leads 
    FOR SELECT 
    TO anon 
    USING (false);

-- Indexes
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS leads_profil_idx ON leads(profil);
CREATE INDEX IF NOT EXISTS leads_profil_created_idx ON leads(profil, created_at DESC);
