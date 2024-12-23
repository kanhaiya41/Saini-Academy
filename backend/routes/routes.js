import express from 'express';
import { adminssionForm, contactUs } from '../controller/mailController.js';
import { upload, uploadToGridFs } from '../middleware/profile.js';

const app = express();

app.post('/contact',contactUs);
app.post('/admission',upload.single('pic'),uploadToGridFs,adminssionForm);

export default app;