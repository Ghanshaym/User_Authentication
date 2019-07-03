let express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

let Enum = require('enum');


let role = new Enum(['normal_user','admin']);
// console.log(role);
console.log("value of enum = "+role.normal_user);
if(role.normal_user == 1){
    console.log("enter");
    
}
// console.log("enum = "+Enum);
// for(let i in role){
//     console.log(role[i]);
// }

// let validator = (req, res, next) => {
//     console.log("Enter1")
//     let condition = true;
//     if (condition) {
//         next()
//     } else {
//         res.json({
//             statusCode: 400,
//             message: "error",
//         })
//     }

// }
// let authenticator = async (req, res, next) => {
//     let decoded = jwt.verify(req.header.authorization, 'secret')
//     // find user with id `decoded._id`
//     let user = userModel.findById(decoded._id);
//     if (!user || (user.role != 'admin')) {
//         return res.json({
//             statusCode: 401,
//             message: "anauthorized user"
//         })
//     }
//     next();
        
    
//     // you will get userdata
//     // if no user is found user is unauthorized 
//     // if user doesnot have specific role required for api user is unauthorized
//     // error response code for this is 401
// }
// let handler = (req, res) => {
//     console.log("enter2")
//     res.json({

//         message: "validated! now in main handler0"
//     })
// }


// app.get('/middleware', validator, handler)

// app.use(validator);

app.listen(3000, (req, res) => {
    console.log("running on port no 3000");
})