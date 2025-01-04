import bcrypt from 'bcryptjs';
import db from '../models/index';
import { Op, where } from 'sequelize';

 //khai báo biến và cấu hình hình Bcrybt
 const saltRounds = 10;
 const salt = bcrypt.genSaltSync(saltRounds);

 //hàm mã hóa mật khẩu 
const hashUserPassWord =(password)=>{
   let hashPassWord = bcrypt.hashSync(password, salt);
   return hashPassWord
}

const checkEmailExits = async(userEmail) =>{
   let user = await db.User.findOne({
      where: {email: userEmail}
   })
   if(user){
      return true
   } else{
      return false
   }
}
const checkPhoneExits = async(userPhone) =>{
   let user = await db.User.findOne({
      where: {phone: userPhone}
   })
   if(user){
      return true
   } else{
      return false
   }
}
const registerNewUser = async(rawUserData) =>{
   try {
      // check email emailand password 
   let isEmailExits = await checkEmailExits(rawUserData.email);
   if(isEmailExits === true){
      return{
         EM: 'THE Email is already exits',
         EC: 1
      }
   }
   let isPhoneExits = await checkPhoneExits(rawUserData.phone);
   if(isPhoneExits === true){
      return{
         EM: 'THE Phone is already exits',
         EC: 1
      }
   }
   // hash password
   let hashPassWord = hashUserPassWord(rawUserData.password);
   // create new user
   await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      password: hashPassWord,
      username: rawUserData.username
   })
   return{
      EM: 'A user is created successfully'
      , EC: 0
   }
} catch (error) {
   console.log('>>> Check RegisterNewUser', error)
   return {
      EM: 'Some thing wrongs in service...',
      EC: -2
   }
}
}
const checkPassword=(inputPassword, hashPassWord)=>{
   return bcrypt.compareSync(inputPassword, hashPassWord) // true or false
}

const handleUserLogin = async (rawData) => {
   try {
       // Tìm user dựa trên email hoặc số điện thoại
       let user = await db.User.findOne({
           where: {
               [Op.or]: [
                   { email: rawData.valueLogin },
                   { phone: rawData.valueLogin }
               ]
           }
       });

       // Nếu user không tồn tại
       if (!user) {
           console.log(">>> User not found with email/phone:", rawData.valueLogin);
           return {
               EM: 'Account does not exist. Please check your email/phone.',
               EC: 1,
               DT: ''
           };
       }

       // Kiểm tra mật khẩu
       let isCorrectPassword = checkPassword(rawData.password, user.password);
       if (!isCorrectPassword) {
           console.log(">>> Incorrect password for user:", rawData.valueLogin);
           return {
               EM: 'Incorrect password. Please try again.',
               EC: 1,
               DT: ''
           };
       }

       // Đăng nhập thành công
       console.log(">>> User logged in successfully:", user.email || user.phone);
       return {
           EM: 'Login successful!',
           EC: 0,
           DT: {
               id: user.id,
               username: user.username,
               email: user.email,
               phone: user.phone
           }
       };

   } catch (error) {
       console.error('>>> Error in handleUserLogin:', error);
       return {
           EM: 'An error occurred while processing your request.',
           EC: -1,
           DT: ''
       };
   }
};


module.exports={
   registerNewUser, handleUserLogin
}