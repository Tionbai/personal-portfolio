const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
const dotenv = require('dotenv');
const path = require('path');
// const { fileURLToPath } = require('url');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  if (err) console.error(err);
  if (success) console.log('Server is ready to send emails');
});

app.post('/api/send/email', (req, res) => {
  const form = new multiparty.Form();
  const data = {};
  form.parse(req, (err, fields) => {
    if (err) console.error(`There was an error: ${err}`);
    console.log(fields);
    Object.keys(fields).forEach((property) => {
      data[property] = fields[property].toString();
    });

    const email = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.email,
      text: `${data.name} <${data.email}> ${data.message}`,
    };

    transporter.sendMail(email, (err2, data2) => {
      console.log(email);
      if (err2) {
        console.log(err2);
        res.status(500).send(`Email could not be sent: ${err2}`);
      } else if (data2)
        res.status(200).send('Email successfully sent to recipient');
    });
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
