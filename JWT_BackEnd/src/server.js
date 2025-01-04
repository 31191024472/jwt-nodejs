import express from 'express'
import path from 'path'
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import initApiRouter from './routes/api';
import configCors from './config/cors'
import bodyParser from 'body-parser';
require ('dotenv').config();
// import connection from './config/connectDB';

const app= express();

// config view engine
configViewEngine(app);

//config CORS
configCors(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//test connectionDB
//connection();


//init web routes 
initWebRouter(app);
initApiRouter(app);

const PORT = process.env.PORT|| 8080;
app.listen(PORT, () => {
    console.log(">>> JWT back end is running on the port = http://localhost:" + PORT);
});