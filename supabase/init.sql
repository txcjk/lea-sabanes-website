-- Supabase SQL Initialization Script
-- Table: leads (for storing contact form submissions)

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    nom_complet TEXT NOT NULL,
    email TEXT NOT NULL,
    profil TEXT NOT NULL CHECK (profil IN ('particulier', 'professionnel')),
    message TEXT NOT NULL
);

-- Add comment to the table
COMMENT ON TABLE leads IS 'Contact form submissions from the website';

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow anonymous inserts only (no read access)
CREATE POLICY "Allow anonymous insert" 
    ON leads 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Create policy: Deny all reads for anonymous users
CREATE POLICY "Deny anonymous reads" 
    ON leads 
    FOR SELECT 
    TO anon 
    USING (false);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
