import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import multer from 'multer';
import S3 from 'aws-sdk/clients/s3.js';
import { triggerAsyncId } from 'async_hooks';

dotenv.config();
const router = express.Router();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

// uploads a file to s3
const uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await uploadFileToS3(req.file);
    console.log(result);
    res.send(`/${req.file.path}`);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
