import { dbname } from "../Utils/constanst.js";
import mongoose from "mongoose"
const dbconnect=async()=>{
    try{
        const connection=await mongoose.connect(`${process.env.MONGO_URL}/${dbname}`)
        console.log("THE DATABASE IS CONNECTED SUCCESSFULLY !!!",connection.connection.host);
    }
    catch(error){
        console.log("There is some error while connecting the database!!",error);
        
    }
}
export default dbconnect