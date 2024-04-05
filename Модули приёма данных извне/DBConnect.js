const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "20033_KursachAnime",
    password: ""
});
module.exports=connection;