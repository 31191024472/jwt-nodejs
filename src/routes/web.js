// diều hướng trang

const express = require('express');
const path = require('path');
const router = express.Router();
import homeCotroller from '../controller/homeCotroller'


const handleAbout = (req,res) =>{ 
    return res.send('Hi Van Thanh')
}
const initWebRouter = (app) =>{
    router.get("/",homeCotroller.handleHelloWord)  
    router.get("/user", homeCotroller.handleUser)  
    router.post("/users/create-user",homeCotroller.handleCreateUser)
    router.get("/about",handleAbout)
    router.post("/deletUser/:id", homeCotroller.handleDeleteUser) // Xóa data theo ID
    router.get('/user/update-user/:id',homeCotroller.handleGetDateUser)// Lấy data theo ID
    router.post('/user/update-user', homeCotroller.handleUpDateUser) // Cấp nhật data mới
    return app.use("/", router);
}


export default initWebRouter;       