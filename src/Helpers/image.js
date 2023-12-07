const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: './src/Helpers/Credentials/tianguistraker-28dbbbe1cdb6.json',
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  

module.exports = {
    auth
}