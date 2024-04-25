import pool from "../../configuration/mysql/dbCon.js";

export default {
    async listAll(){
        try {
            const [rows] = await pool.query("SELECT * FROM session_practice");
            return rows; 
        } catch (error) {
            console.error("Error fetching data from database:", error);
            throw error; 
        }
    },
    async findOne(username){
        try{
            const [rows] = await pool.query("SELECT * FROM session_practice WHERE username = ?",[username]);
            return rows[0];
        } catch (error){
            console.error("Error fetching data from database:", error);
            throw error; 
        }
    },
    async create(data) {
        try {
            const [rows] = await pool.query("INSERT INTO session_practice(username,password,email) VALUES(?,?,?)", [
                data.username,
                data.password,
                data.email
            ]);
    
            const newUser = await this.findOne(data.username);
            console.log(newUser);
    
            return newUser;
        } catch (error) {
            console.error("Error fetching data from database:", error);
            throw error;
        }
    },
    async findAccount(data){
        try{
            const [rows] = await pool.query("SELECT * FROM session_practice WHERE username = ? AND password = ?",[
                data.username,
                data.password
            ]);
            return rows[0]
        }catch(error){
            console.error("Error fetching data from database:", error);
            throw error; 
        }
    }
}