// server.js
require('dotenv').config();

const express = require("express");
const S3 = require('@aws-sdk/client-s3')
const app = express();
const PORT = process.env.PORT || 3000;

// S3 Config
const client = new S3.S3Client({
    region: process.env.AWS_S3_REGION,
});

// Multer configuration
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/src'));

// Setup post route
app.post("/upload_files", upload.array("files"), uploadFiles);

async function uploadFiles(req, res) {
    const file = req.files[0];
    const key = Date.now().toString() + '-' + file.originalname;

    const uploadFile = new S3.PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    })

    try {        
        const response = await client.send(uploadFile);
        console.log(response)
        res.statusMessage = `Successfuly uploaded files`
        res.status(200).end();
    } catch (error) {
        res.statusMessage =`${error}`;
        res.status(500).end();
        console.log('Error', error)
        console.error(error);
    }
}

app.listen(PORT, () => {
    console.log(`Server listening on PORT`, PORT);
    console.log(`Access your application at`, `http://localhost:${PORT}`,)
});