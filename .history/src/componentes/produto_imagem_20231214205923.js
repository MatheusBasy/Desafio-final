require('dotenv').config();
const aws = require('aws-sdk');
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.KEY_ID,
        secretAccessKey: process.env.APPLICATION_KEY
    }
});

const listarImagens = async (req,res) =>{
    try {
        const arquivos = await s3.listObjects({
            Bucket:process.env.BUCKET_NAME
        }).promise();
        return res.send(arquivos.Contents);
    } catch (error) {
        res.status(400).json({mensagem:error.message});
    }
}

const salvarImagem = async (img) => {
    try {
        const arquivo = await s3.upload({
            Bucket:process
        }).promise();
        return res.send(arquivo.Contents);
    } catch (error) {
        res.status(400).json({mensagem:error.message});
    }
}

const apagarImagem = async (img) => {
    try {
        const arquivos = await s3.listObjects({
            Bucket:process.env.BUCKET_NAME
        }).promise();
        return res.send(arquivos.Contents);
    } catch (error) {
        res.status(400).json({mensagem:error.message});
    }
}

module.exports = {
    listarImagens,
    salvarImagem,
    apagarImagem
}