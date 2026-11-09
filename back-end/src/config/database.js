import 'dotenv/config';
import mysql from "mysql2/promise";

class Database {
    constructor (){
        this.pool=mysql.createPool({
            host:process.env.DB_HOST || 'localhost',
            user:process.env.DB_USER || 'root',
            password:process.env.DB_PASSWORD || '1234',
            database:process.env.DB_NAME || 'oficina_db_i2hs',
            port:process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    getPool(){
        return this.pool;
    }

    async testConnection(){
        try {
            const conn = await this.pool.getConnection();
            console.log('Conexão com o MySQL estabelecida com sucesso');
            conn.release();
        } catch (error) {
            console.error('Falha ao conectar com o MySQL', error.message);
        }
    }
}

const databaseInstance = new Database();
databaseInstance.testConnection();

export default databaseInstance.getPool();