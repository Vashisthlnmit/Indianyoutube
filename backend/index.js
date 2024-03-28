import dotenv from "dotenv"
import { app } from "./app.js"
import dbconnect from "./DBCONNECTION/dbconnection.js"
dotenv.config({
    path:"./env"
})
dbconnect()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("THE SERVER IS STARTED SUCCESSFULLY!!!",process.env.PORT);
    })
})
.catch((error)=>{
    console.log("there is some error while starting with server",error);
})