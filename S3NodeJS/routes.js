const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dotenv = require('dotenv');
dotenv.config();



// Set up multer and AWS S3 storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.AWS_S3_BUCKET_NAME;

// Home page route
router.get('/', (req, res) => {
  res.render('home');
});

// Upload route
router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/upload', upload.single('image'), (req, res) => {
  const fileContent = req.file.buffer;
  const fileName = req.file.originalname;

  // Set up S3 parameters
  const params = {
    Bucket: bucketName,
    Key: `images/${fileName}`,
    Body: fileContent,
  };

  // Upload file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error uploading file.');
    } else {
      res.redirect('/list');
    }
  });
});

// List route
router.get('/list', (req, res) => {
  // Set up S3 parameters
  const params = {
    Bucket: bucketName,
    Prefix: 'images/',
  };

  // List objects in S3 bucket
  s3.listObjects(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error listing files.');
    } else {
      const images = data.Contents.map((obj) => obj.Key.replace('images/', ''));
      res.render('list', { images });
    }
  });
});

  
  //Download
router.get('/download/:filename', function(req, res) {
    var params = {
      Bucket:  bucketName ,
      Key: 'images/' + req.params.filename
    };
    s3.getObject(params, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(400).send('Error: Image not found');
      }
      res.attachment(req.params.filename);
      res.send(data.Body);
    });
  });
  

module.exports = router;
