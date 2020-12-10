import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
    dest: path.resolve(__dirname, '..', 'tmp', 'img'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'img'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) throw err;

                const namefile = `${hash.toString('hex')}-${file.originalname}`;
                req.nameFilePath = namefile; 
                cb(null, namefile)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    }
};
