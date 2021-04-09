const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;
// const { fileURLToPath } = require('url');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const createTransporter = async (emailData, res) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  transporter.sendMail(emailData, (err, data) => {
    if (err) {
      res.status(500).json({ message: `Email could not be sent: ${err}` });
    } else if (data)
      res.status(200).json({ message: 'Email successfully sent to recipient' });
  });

  return transporter;
};

app.post('/api/send/email', (req, res) => {
  const { name, email, message } = req.body;

  if (name === '' || email === '' || message === '') {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const emailData = {
    from: name,
    to: process.env.EMAIL,
    subject: email,
    text: `${name} <${email}> ${message}`,
  };

  return createTransporter(emailData, res);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
