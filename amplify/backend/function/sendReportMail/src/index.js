const AWS = require('aws-sdk');
const pdfkit = require('pdfkit');
const ses = new AWS.SES({ region: 'us-east-2' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');

// Your S3 bucket name
const BUCKET_NAME = 'supremesecurity9ca42e3d915f4fd492b9c6ec13e233ca2ffdf-dev';
const REGION = 'us-east-2';
const s3 = new AWS.S3();

// Function to fetch incident details from DynamoDB using the provided id
async function fetchIncidentDetails(incidentId) {
  const params = {
    TableName: 'theIncidents-t5hrmxaoynel5apikrxqtm3bfq-dev',
    Key: { id: incidentId },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    return result.Item; 
  } catch (error) {
    console.error('Error fetching incident details:', error);
    throw error;
  }
}

// Fetch staff details based on staffId
async function fetchStaffDetails(staffId) {
  const params = {
    TableName: 'theStaff-t5hrmxaoynel5apikrxqtm3bfq-dev',
    Key: { id: staffId },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error('Error fetching staff details:', error);
    throw error;
  }
}

// Function to generate PDF
async function generateIncidentPDF(incident, staff, attachmentUrls) {
  return new Promise((resolve, reject) => {
    const doc = new pdfkit();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text('Incident Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Incident ID: ${incident.id}`);
    doc.moveDown(1); // Moves down by one line, you can increase the number if you want more space

    doc.fontSize(14).text(`Title: ${incident.title}`);
    doc.moveDown(1); // Moves down by one line, you can increase the number if you want more space

    doc.fontSize(14).text(`Description: ${incident.description}`);
    doc.moveDown(1); // Moves down by one line, you can increase the number if you want more space

    doc.fontSize(14).text(`Address: ${incident.address}`);
    doc.moveDown(1); // Moves down by one line, you can increase the number if you want more space

    doc.fontSize(14).text(`Date & Time: ${incident.dateTime}`);
    doc.moveDown(1); // Moves down by one line, you can increase the number if you want more space

    doc.fontSize(14).text(`Status: ${incident.status}`);
    doc.moveDown();

    doc.fontSize(16).text('Staff Details:');
    doc.moveDown(1); // Moves down by one line, you can increase the number if you want more space

    doc.fontSize(14).text(`Staff Name: ${staff.fname} ${staff.lname}`);
    doc.fontSize(14).text(`Email: ${staff.email}`);

    if (attachmentUrls && attachmentUrls.length) {
        doc.moveDown();
        doc.fontSize(14).text('Attachments:');
      
        attachmentUrls.forEach((url, idx) => {
          // Set the text color to blue and make the URL clickable
          doc
            .fillColor('blue')
            .text(`${idx + 1}. ${url}`, { link: url, underline: true })
            .fillColor('black'); // Reset the text color to black after the link
      
          // Add a space between each URL by moving down a line
          doc.moveDown(0.5); // You can adjust the number (e.g., 1 for more space)
        });
      }

    doc.end();
  });
}

// Upload PDF to S3
async function uploadToS3(data, key) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: data,
    ContentType: 'application/pdf',
  };

  return s3.upload(params).promise();
}

// Function to construct a public S3 URL for attachments
function constructS3Url(attachmentKey) {
    console.log(    `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/public/${attachmentKey}`);
  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/public/${attachmentKey}`;

}

// Send email with PDF attached
async function sendEmail(mailto, incident, pdfUrl, attachmentUrls) {
  const transporter = nodemailer.createTransport(sesTransport({
    ses,
  }));

  const mailOptions = {
    from: 'info@supremesecurityservices.ca',
    to: mailto,
    subject: `Incident Report: ${incident.title}`,
    html: `
      <p>Hello,</p>
      <p>Please find the attached incident report for Incident ID: ${incident.id}.</p>
      <p><strong>Report Attachments:</strong></p>
      ${attachmentUrls.map((url, idx) => `
        <p>${idx + 1}. <a href="${url}" target="_blank">Download Attachment ${idx + 1}</a></p>
      `).join('')}
      <p>Best regards,</p>
      <p>SUPREME SECURITY</p>
    `,
    attachments: [
      {
        filename: `Incident_Report_${incident.id}.pdf`,
        path: pdfUrl,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', mailto);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

exports.handler = async (event) => {
  console.log('Received event:', event);

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    console.log(body);
    const incidentId = body.selectedItemId;
    const mailto = body.mailto;
    console.log(`Received ID: ${incidentId}`);

    // Fetch Incident Details from DynamoDB
    const incident = await fetchIncidentDetails(incidentId);
    console.log(incident);
    if (!incident) {
      throw new Error(`Incident with ID ${incidentId} not found`);
    }

    // Fetch Staff Details
    const staff = await fetchStaffDetails(incident.staffid);
    if (!staff) {
      throw new Error(`Staff with ID ${incident.staffid} not found`);
    }
    // Fetch S3 attachment URLs
    let attachmentUrls = [];
    if (incident.attachments && Array.isArray(incident.attachments)) {
        console.log("incident.attachments..", incident.attachments);
        // Since attachments are strings, return them directly
        attachmentUrls = incident.attachments.map((attachmentKey) => {
          return constructS3Url(attachmentKey); // Return the constructed URL
        });
      }
    // Generate a PDF report of the incident
    const pdfData = await generateIncidentPDF(incident, staff,  attachmentUrls);
    const s3Key = `incident_reports/Incident_Report_${incidentId}.pdf`;
    // Upload the PDF to S3
    const uploadResult = await uploadToS3(pdfData, s3Key);
    const pdfUrl = uploadResult.Location;
    // Send email with the incident PDF attached
    await sendEmail(mailto, incident, pdfUrl, attachmentUrls);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Incident report sent successfully', incidentId }),
    };
  } catch (error) {
    console.error('Error processing incident:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ message: error.message }),
    };
  }
};
