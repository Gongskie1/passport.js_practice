import userQuery from "../../mysqlQuery/userQueries/msql_query.js";

export default {
    createAccount: async(req,res)=>{
        try{
            const findUser = await userQuery.findOne("Matk");
            if(!findUser) throw new Error("invalid credentials");
            res.send(findUser.password);
        }
        catch(error){
            console.log(`Error occurred during user creation: ${error}`);
            return res.status(500).send(`Internal server error ${error}`);
        }
    }
}