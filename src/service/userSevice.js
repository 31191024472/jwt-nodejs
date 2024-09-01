import bcrypt from 'bcryptjs';
import mysql  from 'mysql2/promise';
import Bluebird from 'bluebird';

//kết nối tới database
const Connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt"
  });

  //khai báo biến và cấu hình hình Bcrybt
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  //hàm mã hóa mật khẩu 
const hashUserPassWord =(password)=>{
    let hashPassWord = bcrypt.hashSync(password, saltRounds);
}
//Hàm tạo mới người dùng
const createNewUser = async(email,password,username,)=>{
    let hashPass = hashUserPassWord(password); // mã hóa mật khẩu
    const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
    
        try {
          const [rows,fields] = await conection.execute("INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email,password,username,]);
        } catch (error) {
          console.log(">>>>> Check error create user", error)
        }
}

// Hàm lấy dữ liệu từ database
const getUserList = async (req, res) =>{
  const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
  let users = [];
   try {
    const [rows,fields] = await conection.execute('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.log('>>> Check error', error)
   }
}

//Hàm xóa dữ liệu trong database
const deletUser = async (id) => {
  const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
   try {
    const [rows,fields] = await conection.execute('DELETE FROM users WHERE id=?', [id]);
    return rows;
  } catch (error) {
    console.log('>>> Check error', error)
   }
}

//Hàm lấy dữ liệu theo ID
const getUserById = async (id) =>{
  const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
  let users = [];
   try {
    const [rows,fields] = await conection.execute('SELECT * FROM users WHERE id=?' , [id]);
    return rows;
  } catch (error) {
    console.log('>>> Check error', error)
   }
}


//Hàm up date dữ liệu mới
const upDateUser = async (email,username, id) =>{
  const conection = await mysql.createConnection({host:'localhost', user: 'root', database :'jwt', Promise: Bluebird})
  try {
    const [rows,fields] = await conection.execute('UPDATE users SET email = ?, username= ? WHERE id = ?' , [email, username, id]);
  } catch (error) {
    console.log('>>> Check error', error)
   }
}



module.exports ={
    getUserList, createNewUser, deletUser, hashUserPassWord,getUserById, upDateUser
}