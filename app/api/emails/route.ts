import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
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
