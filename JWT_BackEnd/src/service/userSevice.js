import bcrypt from 'bcryptjs';
import mysql  from 'mysql2/promise';
import Bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize';



// //kết nối tới database
// const Connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "jwt"
//   });

  //khai báo biến và cấu hình hình Bcrybt
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  //hàm mã hóa mật khẩu 
const hashUserPassWord =(password)=>{
    let hashPassWord = bcrypt.hashSync(password, salt);
    return hashPassWord
}
//Hàm tạo mới người dùng
const createNewUser = async(email,password,username,)=>{
    let hashPass = hashUserPassWord(password); // mã hóa mật khẩu
        try {
          await db.User.create({
          username : username,
          email : email,
          password : hashPass,
         })
        } catch (error) {
          console.log(">>>>> Check error create user", error)
        } 
}

// Hàm lấy dữ liệu từ database
const getUserList = async (req, res) =>{
  let users = [];
  users = await db.User.findAll();
  return users;
  // const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})

  //  try {
  //   const [rows,fields] = await conection.execute('SELECT * FROM user');
  //   return rows;
  // } catch (error) {
  //   console.log('>>> Check error', error)
  //  }
}

//Hàm xóa dữ liệu trong database
const deletUser = async (userId) => {
  await db.User.destroy({
    where : {id: userId}
  })
  // const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
  //  try {
  //   const [rows,fields] = await conection.execute('DELETE FROM user WHERE id=?', [id]);
  //   return rows;
  // } catch (error) {
  //   console.log('>>> Check error', error)
  //  }
}

//Hàm lấy dữ liệu theo ID
const getUserById = async (id) =>{
  let user = {};
  user = await db.User.findOne({
    where: { id : id}
  })
  return user.get({plain : true})
  // const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
  // let user = [];
  //  try {
  //   const [rows,fields] = await conection.execute('SELECT * FROM user WHERE id=?' , [id]);
  //   return rows;
  // } catch (error) {
  //   console.log('>>> Check error', error)
  //  }
}


//Hàm up date dữ liệu mới
const upDateUser = async (email,username, id) =>{

    await db.User.update(
      {
          username : username,
          email : email,
      },{
        where:{
         id : id,
        }
      }
  )
  // const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
  // try {
  //   const [rows,fields] = await conection.execute('UPDATE user SET email = ?, username= ? WHERE id = ?' , [email, username, id]);
  // } catch (error) {
  //   console.log('>>> Check error', error)
  //  }
}



module.exports ={
    getUserList, createNewUser, deletUser, hashUserPassWord,getUserById, upDateUser
}