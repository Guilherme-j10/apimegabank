import database from '../database/database';

class userModel {

    constructor(){
        this.conn = database.DatabaseSettings();
    }

    CreateUser(Dados, Callback){
        return this.conn.query(`INSERT INTO user (nome_user, email_user, password_user, cargo_user) VALUES ('${Dados.nome}', '${Dados.email}', '${Dados.senha}', '${Dados.cargo}')`, Callback);
    }

    SelectUserBy(Input, Place, Callback){
        return this.conn.query(`SELECT * FROM user WHERE ${Place} = '${Input}'`, Callback);
    }

    UploadProfileImg(nameFile, userId, Callback){
        return this.conn.query(`UPDATE user SET pathname='${nameFile}' WHERE id_user='${userId}'`, Callback);
    }

    UpdateDadosUser(Dados, Callback){
        return this.conn.query(`UPDATE user SET nome_user='${Dados.name}', email_user='${Dados.email}', password_user='${Dados.senha}', cargo_user='${Dados.cargo}' WHERE id_user='${Dados.idUser}'`, Callback);
    }
}

export default new userModel();