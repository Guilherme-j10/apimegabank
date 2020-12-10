import mysql from 'mysql';

class database {

    DatabaseSettings(){
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'megabank'
        });

        return connection;
    }

    statusDatabase(req, res){
        const db = this.DatabaseSettings();

        db.connect((err) => {
            if(err){
                console.log('erro ao se conectar'+err.stack);
            }

            console.log(db.threadId);
        })
    }

}

export default new database();