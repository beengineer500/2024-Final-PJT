const mysql = require('mysql2');
let mysqldb;
let mysqldbR;

const setup = async () => {
    // 이미 연결이 설정되어 있는 경우 바로 반환
    if (mysqldb && mysqldbR) {
        return { mysqldb, mysqldbR };
    }

    try {
        // mysqldb 연결
        mysqldb = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        });
        mysqldb.connect(err => {
            if (err) throw new Error("MySQL 접속 실패 (쓰기 DB).");
            console.log("MySQL 접속 성공 (쓰기 DB).");
        });

        // mysqldbR 연결
        mysqldbR = mysql.createConnection({
            host: process.env.MYSQL_HOST_R,
            port: process.env.MYSQL_PORT_R,
            database: process.env.MYSQL_DATABASE_R,
            user: process.env.MYSQL_USER_R,
            password: process.env.MYSQL_PASSWORD_R,
        });
        mysqldbR.connect(err => {
            if (err) throw new Error("MySQL 접속 실패 (읽기 DB).");
            console.log("MySQL 접속 성공 (읽기 DB).");
        });

        return { mysqldb, mysqldbR };
    } catch (err) {
        console.error("DB 접속 실패.", err);
        throw err;
    }
};

module.exports = { setup };
