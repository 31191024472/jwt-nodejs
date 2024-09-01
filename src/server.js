
import express from 'express'
import path from 'path'
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./routes/web";
import bodyParser from 'body-parser';

const app= express();


// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//init web routes 
initWebRouter(app);

const PORT = 8080;
app.listen(PORT, ()=> {
    console.log(">>> JWT back end is runnig on the port =" +PORT);
});