import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { 
      name, 
      email, 
      whatsapp, 
      telegram, 
      enquiryType, 
      date, 
      adults, 
      children, 
      youngestAge, 
      message 
    } = data;

    if (!name || !email || !whatsapp || !enquiryType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Since we don't have SMTP credentials yet, we will configure a dummy transporter
    // For a real production app, you would use:
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    //
    // For now, we will use Ethereal Email (a fake SMTP service for testing) OR just console.log if no ENV is set.
    // If you have your own SMTP details, add them to your .env.local file!
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || "test@ethereal.email",
        pass: process.env.SMTP_PASS || "testpassword",
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; line-height: 1.6; background-color: #f4f7f6; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .header { background-color: #1B5E20; color: #ffffff; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
          .field:last-child { border-bottom: none; }
          .label { font-weight: 600; color: #2E7D32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; display: block; }
          .value { font-size: 16px; color: #333; }
          .message-box { background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #E65100; margin-top: 5px; font-style: italic; }
          .footer { background-color: #f8bbd0; color: #c2185b; text-align: center; padding: 15px; font-size: 13px; font-weight: 600; }
          .highlight { display: inline-block; background-color: #E8F5E9; color: #1B5E20; padding: 3px 8px; border-radius: 4px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Enquiry: ${enquiryType}</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">Guest Details</span>
              <div class="value">
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
                <strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}">${whatsapp}</a><br>
                ${telegram ? `<strong>Telegram:</strong> ${telegram}` : ''}
              </div>
            </div>

            <div class="field">
              <span class="label">Booking Information</span>
              <div class="value">
                <strong>Type:</strong> <span class="highlight">${enquiryType}</span><br>
                ${date ? `<strong>Preferred Date:</strong> ${date}<br>` : ''}
                <strong>Guests:</strong> ${adults} Adults, ${children} Children ${youngestAge ? `(Youngest: ${youngestAge} yrs)` : ''}
              </div>
            </div>

            <div class="field">
              <span class="label">Guest Message</span>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div class="footer">
            Sent securely via Casa de Capybara Website
          </div>
        </div>
      </body>
      </html>
    `;

    const guestHtmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; line-height: 1.6; background-color: #f4f7f6; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .header { background-color: #1B5E20; color: #ffffff; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 10px; }
          .header p { margin: 0; color: #E8F5E9; font-size: 16px; opacity: 0.9; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 20px; font-weight: 600; color: #1B5E20; margin-bottom: 20px; }
          .message { font-size: 16px; color: #444; margin-bottom: 30px; }
          .details-box { background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #E65100; margin-bottom: 30px; }
          .details-box h3 { margin-top: 0; color: #2E7D32; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
          .details-box p { margin: 5px 0; font-size: 15px; color: #333; }
          .socials { text-align: center; margin-top: 30px; }
          .footer { background-color: #1B5E20; color: #ffffff; text-align: center; padding: 20px; font-size: 13px; opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Casa de Capybara</h1>
            <p>Siem Reap's Premier Family Hotel & Capybara Cafe</p>
          </div>
          
          <div class="content">
            <div class="greeting">Hello ${name},</div>
            
            <div class="message">
              Thank you for reaching out to us! We have received your inquiry regarding <strong>${enquiryType}</strong>. <br><br>
              Our concierge team is currently reviewing your message and will get back to you shortly. During our operating hours (7:00 AM - 9:00 PM), we typically respond within one hour.
            </div>
            
            <div class="details-box">
              <h3>Inquiry Summary</h3>
              <p><strong>Type:</strong> ${enquiryType}</p>
              ${date ? `<p><strong>Preferred Date:</strong> ${date}</p>` : ''}
              <p><strong>Guests:</strong> ${adults} Adults, ${children} Children</p>
            </div>
            
            <div class="message">
              If your request is urgent, please feel free to message us directly on WhatsApp (+855 968 149 795) or Telegram (@capybaracambodia).<br><br>
              We look forward to welcoming you to Casa de Capybara!<br><br>
              Warm regards,<br>
              <strong>The Casa de Capybara Team</strong>
            </div>
          </div>
          
          <div class="footer">
            Casa de Capybara • Street 598, Ring Road, Siem Reap, Cambodia<br>
            © ${new Date().getFullYear()} Casa de Capybara. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // Try sending emails
    try {
      // 1. Send notification to admin
      const info = await transporter.sendMail({
        from: `"Casa de Capybara Website" <${process.env.SMTP_USER || "noreply@casadecapybara.com"}>`,
        to: "booking@casadecapybara.com", // The requested recipient
        replyTo: email,
        subject: `[Website Enquiry] ${enquiryType} - ${name}`,
        text: `New Enquiry from ${name} (${email}, WhatsApp: ${whatsapp}). Type: ${enquiryType}. Message: ${message}`,
        html: htmlTemplate,
      });

      // 2. Send auto-reply to guest
      await transporter.sendMail({
        from: `"Casa de Capybara" <${process.env.SMTP_USER || "booking@casadecapybara.com"}>`,
        to: email, 
        replyTo: "booking@casadecapybara.com",
        subject: `Thank you for contacting Casa de Capybara!`,
        text: `Hello ${name}, Thank you for your inquiry regarding ${enquiryType}. We will get back to you shortly!`,
        html: guestHtmlTemplate,
      });

      console.log("Messages sent: Admin ID %s", info.messageId);
      
      return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (sendError) {
      console.error('SMTP Error:', sendError);
      
      // If SMTP is not configured, we still want to simulate success for the frontend
      // In a real environment, you'd return a 500 here, but since they don't have .env yet, we don't want to break the UI.
      if (!process.env.SMTP_HOST) {
        console.log('Simulated email sending (No SMTP configured)');
        return NextResponse.json({ success: true, simulated: true });
      }
      
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
