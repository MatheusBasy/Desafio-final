require('dotenv').config();

const multer = require('multer');
const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
const s3 = new aws.S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.A,
        secretAccessKey
    }
});

module.exports = multer({
});