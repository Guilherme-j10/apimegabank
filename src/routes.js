import { Router } from 'express';
import multer from 'multer';
import configs from './config/multer';
const rotas = Router();

import middlewareValidator from './middleware/validatorMiddleware';
import userController from './controller/userController';

rotas.post('/createUser', userController.CreateUser);
rotas.post('/Login', userController.LoginUser);
 
rotas.use(middlewareValidator.verify);        

rotas.get('/verificateToken', userController.verifyToken);
rotas.get('/getFuldata', userController.getMyData);
rotas.post('/sendImgProfile', multer(configs).single('profileimg'), userController.UpProfileImagem);
rotas.post('/updateDados', multer(configs).single('profileimg'), userController.UploadImage);

export default rotas;