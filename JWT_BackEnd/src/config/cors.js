require ('dotenv').config();

const configCors =(app) =>{
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL); // Cho phép tất cả các domain, có thể thay đổi thành 'http://localhost:3000' nếu muốn chỉ cho phép frontend React.
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Các phương thức được phép
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Các header được phép
        res.setHeader('Access-Control-Allow-Credentails', true); 
     
        // Chuyển sang middleware tiếp theo
        next();
    });
}

module.exports = configCors;