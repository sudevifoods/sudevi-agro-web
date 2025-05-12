
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

// Database configuration
const dbConfig = {
  host: 'shareddb-k.hosting.stackcp.net',
  user: 'sudevifoods-393712c3',
  password: process.env.DB_PASSWORD, // Stored as environment variable for security
  database: 'sudevifoods-393712c3'
};

// Email configuration
const emailTransporter = nodemailer.createTransport({
  // Email configuration (to be replaced with actual SMTP details)
  host: 'smtp.yourprovider.com',
  port: 587,
  secure: false,
  auth: {
    user: 'inquiry@sudevifoods.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to store lead in database
async function storeLeadInDatabase(leadData) {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    await connection.execute(
      'INSERT INTO leads (name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [leadData.name, leadData.email, leadData.phone || null, leadData.subject || null, leadData.message]
    );
    
    return true;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  } finally {
    await connection.end();
  }
}

// Function to send email notification
async function sendEmailNotification(leadData) {
  const mailOptions = {
    from: 'no-reply@sudevifoods.com',
    to: 'inquiry@sudevifoods.com',
    subject: `New Lead: ${leadData.subject || 'Website Inquiry'}`,
    html: `
      <h2>New Lead from Website</h2>
      <p><strong>Name:</strong> ${leadData.name}</p>
      <p><strong>Email:</strong> ${leadData.email}</p>
      <p><strong>Phone:</strong> ${leadData.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${leadData.subject || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${leadData.message}</p>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Main handler function
exports.handleLead = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const leadData = req.body;
  
  // Validate required fields
  if (!leadData.name || !leadData.email || !leadData.message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Store in database
    const dbResult = await storeLeadInDatabase(leadData);
    
    // Send email notification
    const emailResult = await sendEmailNotification(leadData);

    if (dbResult && emailResult) {
      return res.status(200).json({ message: 'Lead processed successfully' });
    } else {
      return res.status(500).json({ message: 'Error processing lead' });
    }
  } catch (error) {
    console.error('Lead processing error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
