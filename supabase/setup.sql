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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS emails_sent_at_idx ON emails(sent_at DESC);
CREATE INDEX IF NOT EXISTS emails_recipient_idx ON emails(recipient);

-- Enable Row Level Security
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role can do everything" ON emails
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON emails TO service_role;
