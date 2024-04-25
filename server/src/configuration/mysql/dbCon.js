import mysql from "mysql2/promise";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";


const MysqlStore = MySQLStoreFactory(session);

const pool = mysql.createPool({
    user: "joseph",
    password: "NANBAKA123",
    database: "projectit15",
});



const sessionStore = new MysqlStore({},pool);

export default sessionStore;