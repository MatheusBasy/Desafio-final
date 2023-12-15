require('dotenv').config();

const multer = require('multer');
const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
const s3 = new aws.S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.KEY_ID,
        secretAccessKey: process.env.APPLICATION_KEY
    }
});

const file = (req,res) =>{
    
}

module.exports = multer({
});