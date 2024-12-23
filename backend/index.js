import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './db/db.js';
import userApp from './routes/routes.js';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/user', userApp);

const dirname = path.resolve();

app.use(express.static(path.join(dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"));
});

app.listen(8000, () => {
    console.log("server lister on 8000");
})