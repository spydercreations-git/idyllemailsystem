import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { getEmailTemplate } from '@/lib/email-template';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    
    const recipient = formData.get('recipient') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const attachment = formData.get('attachment') as File | null;

    if (!recipient || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailHtml = getEmailTemplate({
      title: subject,
      content: message
    });

    const emailData: any = {
      from: process.env.FROM_EMAIL || 'noreply@idyllproductions.work',
      to: recipient,
      subject: subject,
      html: emailHtml,
    };

    if (attachment) {
      const bytes = await attachment.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      emailData.attachments = [
        {
          filename: attachment.name,
          content: buffer,
        },
      ];
    }

    const emailResult = await resend.emails.send(emailData);

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error },
        { status: 500 }
      );
    }

    try {
      // Only save to database if Supabase is configured
      if (supabase) {
        const { error: dbError } = await supabase
          .from('emails')
          .insert({
            recipient,
            subject,
            message,
            has_attachment: !!attachment,
            attachment_name: attachment?.name || null,
            resend_id: emailResult.data?.id,
            sent_at: new Date().toISOString(),
            status: 'sent'
          });
        
        if (dbError) {
          // Silently fail - email was sent successfully
        }
      }
    } catch (dbError) {
      // Silently fail - email was sent successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: emailResult.data?.id
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
