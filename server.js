const express=require("express");
const env=require("dotenv");
const routes=require("./routes/postRoute")
const connectWithDb = require("./db/config");
const errorHandler=require("./middleware/errorHandler");
const cors = require('cors')
const fileUpload = require('express-fileupload');


// default options


const app=express();



app.use(fileUpload(
    {
        useTempFiles: false,
        preserveExtension: false
    }
));

app.use(cors());
//middleware to understand response
app.use(express.json());


//mount all routes 
app.use("/",routes)
app.use("/user",require("./routes/userRoute"))
app.use(errorHandler);

env.config();
app.listen(process.env.PORT,()=>{
    console.log("this is ready to go")
})
connectWithDb();

app.get("/",(request,response)=>{
    response.send('this is homepage')
})
