const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config();
const express=require('express');
const app=express();

//including routs
app.use(express.static('public'));
app.use('/', require('./routes'));

//configuring EJS with Express
app.set('view engine','ejs');
app.set('views', path.join(__dirname,('views')));

// configuring the AWS environment
AWS.config.update({
    accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });


app.listen(3000);
console.log('Server is listening on port 3000');
console.log('http://localhost:3000');