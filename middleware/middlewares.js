const Joi = require('joi');
let jwt = require('jsonwebtoken');
let Enum = require('enum');

const saveData = require('../models/models')
let middleware = {}

middleware.signUp = (req, res, next) => {
    let enumRole = new Enum({ normalUser: 'normal_user', admin: 'admin' });

    // let pagnation = {
    //     index: Number(req.query.index),
    //     limit: Number(req.query.limit),
    //     headers: req.headers.authorization
    // }
    // if (pagnation.headers == null) {
    //     let response = {
    //         message: "plaese enter the valid tokens",
    //         satausCode: 400
    //     }
    //     res.json(response);
    // }

    let obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
   

    if (obj.role != enumRole.normalUser && obj.role != enumRole.admin) {

        let response = {
            message: "you are missign the role key",
            satausCode: 400
        }
        res.json(response);
    }
    if (obj.firstName && obj.lastName && obj.email && obj.password && obj.role == null) {
        let response = {
            message: " All fields are not entered ",
            satausCode: 400,
            data: obj
        }
        res.json(response)
    }
    else {
        req.value = obj;
        // req.paginationValue = pagnation
        next()
    }
}

middleware.payload = (req,res,next)=>{

    let pagnation = {
        index: Number(req.query.index),
        limit: Number(req.query.limit),
        headers: req.headers.authorization,
        param : req.params.id
    }

    
    if (pagnation.headers == null) {
        let response = {
            message: "plaese enter the valid tokens",
            satausCode: 400
        }
        res.json(response);
    }
    else{
        req.paginationValue = pagnation
        next()
    }

}

middleware.userJwtAuthencation = async (req, res, next) => {


    let token = req.paginationValue.headers;
    let decode = jwt.verify(token, "secret");
    let user = await saveData.findOne({ "email": decode.email });
    if (user && user.role != 'normal_user' && user.role != 'admin') {
        let response = {
            satausCode: 401,
            message: "  unauthorized access because your role field is missing  "
        }
        res.json(response)
    }
    else
        req.user = user;
    next();
}

middleware.adminJwtAuthencation = async (req, res, next) => {

    let token = req.paginationValue.headers;
    let decode = jwt.verify(token, "secret");
    let user = await saveData.findOne({ "email": decode.email });
    if (user && user.role != 'admin') {
        let response = {
            satausCode: 401,
            message: " unauthorized access because you are not admin "
        }
        res.json(response)
    }
    else
        req.user = user;
    next();
}

module.exports = middleware