
import { render } from 'ejs';
import userService from '../service/userSevice';

const handleHelloWord = (req,res)=>{
   return res.render('index.ejs')
}
const handleUser = async (req,res)=>{
    let userList = await userService.getUserList()
    return res.render('user.ejs',{userList})
}
const handleCreateUser = async (req,res) =>{
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    await userService.createNewUser(email,password,username)
    return res.redirect('/user')
    
}
const handleDeleteUser = async (req,res) =>{
    await userService.deletUser(req.params.id);
}

const handleGetDateUser = async (req,res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    if(user && user.length >0 ) {
        userData = user[0]
    }
    return await res.render('user-update.ejs', {userData});
}

const handleUpDateUser = async(req,res) =>{
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id;
    console.log(">>>> Check Id", id)
    await userService.upDateUser(email,username,id)
    return res.redirect('/user')

}



module.exports={
    handleHelloWord, handleUser, handleCreateUser, handleDeleteUser,handleUpDateUser,handleGetDateUser
}