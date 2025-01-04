import LoginRegisterService from '../service/LoginAndRegister'
import userService from '../service/userSevice';


const handleTestApi =(req, res) =>{
    return res.status(200).json({
        message: 'oke',
        data: 'test api',
    })
}
const handleRegister = async (req,res) =>{
    try {
        if (!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM: "Missing required parameters", // Error message
                EC: "-1", //error code
                DT: "", // data
            })
        }

        // Service : create user
        let data = await  LoginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, //error code
            DT: "", // data
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error form server", // Error message
            EC: "-1", //error code
            DT: "", // data
        })
    }
    
}

const handleLogin = async(req,res) =>{
    try {
        let data = await LoginRegisterService.handleUserLogin(req.body);
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error form server", // Error message
            EC: "-1", //error code
            DT: "", // data
        })
    }
}
module.exports ={
    handleTestApi, handleRegister,handleLogin
};