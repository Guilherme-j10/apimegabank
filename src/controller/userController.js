import ModelUser from '../model/userModel';
import cript from 'cript';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import sendMailer from '../service/sendMail';
import fs from 'fs';
import path from 'path';

class userController {  

    LoginUser(req, res){
        const { email, senha } = req.body;

        ModelUser.SelectUserBy(email, 'email_user', (err, response) => {
            if(err) throw err;

            if(response.length == 0) return res.json('Este e-mail não existe');

            if(cript.decString(response[0].password_user) !== senha) return res.json('Senha incorreta');

            res.json({
                token: jwt.sign({ userId: response[0].id_user, typeToken: 'user' }, process.env.SECREET, {
                    'expiresIn': '5h'
                })
            });
        })
    }

    CreateUser(req, res){

        const { nome, email, senha, cargo } = req.body;
        const Dados = {
            nome: nome,
            email: email,
            senha: cript.encString(senha),
            cargo: cargo
        }

        ModelUser.SelectUserBy(email, 'email_user', async (err, response) => {
            if(err) throw err;

            if(response.length > 0) return res.json('Usuário ja existe');

            try {

                const header = {
                    to: email,
                    subject: 'Bem-vindo(a) ao Mega Bank',
                    from: 'Mega Bank'
                };
                const body = {
                    mensagem: `Olá ${nome}, o <strong>Mega Bank</strong> agradece o seu cadastro, caso tenha alguma dúvida sobre a plataforma, aconselhamos que consulte a nossa equipe de desenvolvimento`
                };

                await sendMailer.sender(header, body);

                ModelUser.CreateUser(Dados, (err, response) => {
                    if(err) throw err;
        
                    if(response.affectedRows > 0 ) return res.json(true);
        
                    res.json('Algo deu errado');
                });

            } catch (error) {

                res.json(error);

            }
        })
    }

    getMyData(req, res){
        ModelUser.SelectUserBy(req.userId, 'id_user', (err, response) => {
            if(err) throw err;

            res.json({
                id: response[0].id_user,
                nome: response[0].nome_user,
                email: response[0].email_user,
                senha: cript.decString(response[0].password_user),
                cargo: response[0].cargo_user,
                pathname: `http://localhost:3434/img/${response[0].pathname}`
            });
        })
    }

    UpProfileImagem(req, res){
        ModelUser.UploadProfileImg(req.nameFilePath, req.userId, (err, response) => {
            if(err) throw err;

            if(response.affectedRows > 0) return res.json(true);

            res.json('erro ao enviar dados');
        })
    }     

    verifyToken(req, res){
        ModelUser.SelectUserBy(req.userId, 'id_user', (err, response) => {
            if(err) throw err;

            if(response.length > 0) return res.json(true);
        })
    }

    UploadImage(req, res){
        const { nome, email, senha, cargo } = req.body;

        if(req.nameFilePath){
            ModelUser.SelectUserBy(req.userId, 'id_user', (err, response) => {
                if(err) throw err;

                const file = response[0].pathname;

                fs.unlink(`${path.resolve(__dirname, '..', 'tmp', 'img')}/${file}`, (err) => {
                    if(err) throw err;

                    ModelUser.UploadProfileImg(req.nameFilePath, req.userId, (err, response) => {
                        if(err) throw err;

                        if(response.affectedRows > 0){
                            return res.json(true);
                        }else{
                            return res.json(false);
                        }
                    })
                })
            })
        }else{
            const dataToUpdate = {
                idUser: req.userId,
                name: nome,
                email: email,
                senha: cript.encString(senha),
                cargo: cargo
            };

            ModelUser.UpdateDadosUser(dataToUpdate, (err, response) => {
                if(err) throw err;
                
                if(response.affectedRows > 0){
                    return res.json(true);
                }else{
                    return res.json(false);
                }
            })
        }
    }
}

export default new userController();