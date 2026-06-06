-- Create emails table for storing email history
CREATE TABLE IF NOT EXISTS emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  has_attachment BOOLEAN DEFAULT false,
  attachment_name TEXT,
  resend_id TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on sent_at for faster queries
CREATE INDEX IF NOT EXISTS emails_sent_at_idx ON emails(sent_at DESC);

-- Create index on recipient for faster lookups
CREATE INDEX IF NOT EXISTS emails_recipient_idx ON emails(recipient);

-- Enable Row Level Security (optional)
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert
CREATE POLICY "Service role can insert emails" ON emails
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow service role to read
CREATE POLICY "Service role can read emails" ON emails
  FOR SELECT
  TO service_role
  USING (true);
