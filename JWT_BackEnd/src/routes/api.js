// diều hướng trang

const express = require('express');
const path = require('path');
import apiController from '../controller/apiController' 
const router = express.Router();

const initApiRouter = (app) =>{
    // rest API
    // 
    router.get('/test-api', apiController.handleTestApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    return app.use("/api/v1/", router);

}


export default initApiRouter;       