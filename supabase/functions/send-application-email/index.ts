
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  type: 'job' | 'partner';
  data: {
    name?: string;
    contactPerson?: string;
    email: string;
    phone?: string;
    company?: string;
    partnerType?: string;
    location?: string;
    jobTitle?: string;
    experience?: string;
    message?: string;
  };
}

const sendEmail = async (to: string, subject: string, html: string) => {
  const smtpHost = Deno.env.get('SMTP_HOST');
  const smtpPort = Deno.env.get('SMTP_PORT');
  const smtpUser = Deno.env.get('SMTP_USER');
  const smtpPass = Deno.env.get('SMTP_PASS');

  console.log('SMTP Config:', { host: smtpHost, port: smtpPort, user: smtpUser });

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error('SMTP configuration is incomplete');
  }

  // Create email content in RFC 2822 format
  const emailContent = [
    `From: ${smtpUser}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/html; charset=utf-8`,
    ``,
    html
  ].join('\r\n');

  // Connect to SMTP server using raw TCP
  try {
    const conn = await Deno.connect({
      hostname: smtpHost,
      port: parseInt(smtpPort),
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Helper function to read response
    const readResponse = async () => {
      const buffer = new Uint8Array(1024);
      const n = await conn.read(buffer);
      return decoder.decode(buffer.subarray(0, n || 0));
    };

    // Helper function to send command
    const sendCommand = async (command: string) => {
      await conn.write(encoder.encode(command + '\r\n'));
      return await readResponse();
    };

    // SMTP conversation
    await readResponse(); // Initial greeting
    await sendCommand(`EHLO ${smtpHost}`);
    await sendCommand('STARTTLS');
    
    // For simplicity, we'll use AUTH PLAIN
    const auth = btoa(`\0${smtpUser}\0${smtpPass}`);
    await sendCommand('AUTH PLAIN ' + auth);
    
    await sendCommand(`MAIL FROM:<${smtpUser}>`);
    await sendCommand(`RCPT TO:<${to}>`);
    await sendCommand('DATA');
    await sendCommand(emailContent + '\r\n.');
    await sendCommand('QUIT');

    conn.close();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('SMTP Error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();
    console.log('Received email request:', { type, data });

    let subject: string;
    let html: string;
    let recipientEmail: string;

    if (type === 'job') {
      subject = `New Job Application - ${data.jobTitle || 'General Application'}`;
      recipientEmail = 'hr@sudeviagrofoods.com'; // Change to your HR email
      
      html = `
        <h2>New Job Application Received</h2>
        <p><strong>Position:</strong> ${data.jobTitle || 'General Application'}</p>
        <p><strong>Applicant Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Experience:</strong> ${data.experience} years</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${data.message || 'No cover letter provided'}</p>
        <hr>
        <p><em>This application was submitted through the Sudevi Agro Foods careers page.</em></p>
      `;
    } else if (type === 'partner') {
      subject = `New Partnership Application - ${data.partnerType}`;
      recipientEmail = 'partnerships@sudeviagrofoods.com'; // Change to your partnerships email
      
      html = `
        <h2>New Partnership Application Received</h2>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Partnership Type:</strong> ${data.partnerType}</p>
        <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'No additional message provided'}</p>
        <hr>
        <p><em>This application was submitted through the Sudevi Agro Foods partners page.</em></p>
      `;
    } else {
      throw new Error('Invalid email type');
    }

    await sendEmail(recipientEmail, subject, html);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-application-email function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
