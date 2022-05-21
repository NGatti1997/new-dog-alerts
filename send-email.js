const nodemailer = require('nodemailer');
let hbs = require('nodemailer-express-handlebars');
let options = {
  viewEngine : {
      extname: '.hbs', // handlebars extension
      layoutsDir:'./',
      defaultLayout:'new-dogs'
      },

  viewPath:'./',
  extName: '.hbs'
  };
const {ERROR_RECIPIENTS,MJ_API_KEY,MJ_SECRET_KEY } = process.env;

const mjTransporter = nodemailer.createTransport(
  {
  host: 'in-v3.mailjet.com',
  port: 587,
  auth: {
    user: MJ_API_KEY,
    pass: MJ_SECRET_KEY
  },
  tls: {
    ciphers:'SSLv3'
}
});
mjTransporter.use('compile',hbs(options))

const mjSend = async mailOptions => {
  await mjTransporter.sendMail(mailOptions)
    .then(message => console.log(message))
    .catch((err) => console.log(err));
};

const createNewDogsEmailOptions = newDogs => ({
  from: {
    name: 'Nick and Bella Dog Finder',
    address: process.env.MJ_FROM_EMAIL
  },
  to: process.env.NEW_DOGS_RECIPIENTS,
  subject: 'NEW DOGS FOUND!',
  template:'new-dogs',
  context:{ newDogs }
  
});

const createErrorEmailOptions = err => ({
  from: {
    name: 'Nick and Bella Dog Finder',
    address: process.env.MJ_FROM_EMAIL
  },
  to: ERROR_RECIPIENTS,
  subject: 'An Error Occurred',
  template: 'error',
  context: { err }
});

module.exports.sendNewDogsEmail = async newDogs => mjSend(createNewDogsEmailOptions(newDogs));

module.exports.sendErrorEmail = async err => mjSend(createErrorEmailOptions(err));