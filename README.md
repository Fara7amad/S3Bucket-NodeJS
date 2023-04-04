# S3Bucket-NodeJS
This repo shows a way to use S3 bucket with NodeJS to do the following:
1. Upload pictures from your app to S3 Buckets under a folder called images.
2. List of all files under the images folder.
3. Download the images.
---
To do that:
- First, create your S3 bucket, generate your AWS access key, and initiate your nodeJS project using ```npm init```.
- The main package to use is **aws-sdk** (to access S3 bucket), in addition I used:
   - express (to handle http requests)
   - ejs (template engine)
   - dotEnv (for environment variables)
   - multer (middleware to handle file upload)
   - nodemon (to restart node when changes occur)
 
   Methods used can be found:
     - aws-sdk: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html and https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
     - multer: https://expressjs.com/en/resources/middleware/multer.html#:~:text=Multer%20is%20a%20node.,multipart%2Fform%2Ddata%20).

- The main configurations:
```javascript
// configuring the AWS environment
AWS.config.update({
    accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
```
```javascript
// Set up multer and AWS S3 storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
```
- Other configurations:
```javascript
//configuring EJS with Express
app.set('view engine','ejs');
app.set('views', path.join(__dirname,('views')));
```

- A link to the demo: [here](https://drive.google.com/file/d/1n6ybBQIUkZhHzCEGVdRjx_2EdieCmDR1/view?usp=share_link)
