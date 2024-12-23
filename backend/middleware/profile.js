import multer from 'multer';
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export const upload = multer({
    storage: multer.memoryStorage()
});

let gfs, gridFsBucket;

mongoose.connection.once('open', () => {
    gridFsBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'pic'
    });
    gfs = grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('pic');
});

export const uploadToGridFs = async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            next();
        }
        else {
            let filename = `${Date.now()}-file-${file.originalname}`;
            file.originalname = filename;

            const writeStream = gridFsBucket.openUploadStream(file.originalname, {
                contentType: file.mimeType
            });

            writeStream.end(file.buffer);
            writeStream.on('finish', () => {
                req.file.id = writeStream.id;
                next();
            });

            writeStream.on('error', (err) => {
                return res.status(500).json({ error: err.message });
            })
        }
    } catch (error) {
        console.log('while pic uploading', error);
        return res.status(500).json({ error: error.message });
    }
}