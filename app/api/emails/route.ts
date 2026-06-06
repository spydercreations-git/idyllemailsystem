import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  // Check if Supabase is configured
  if (!supabase) {
    return NextResponse.json({ emails: [] });
  }

  try {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) {
      return NextResponse.json({ emails: [] });
    }

    return NextResponse.json({ emails: data || [] });
  } catch (error) {
    return NextResponse.json({ emails: [] });
  }
}
