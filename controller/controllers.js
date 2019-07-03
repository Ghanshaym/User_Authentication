let personData = {};
const userModel = require('../models/models')
const Joi = require('joi');
const service = require('../services/service');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


personData.getSignUp = function (req, res) {
    res.sendFile('signup.html', { root: __dirname });
}

personData.signUp = function (req, res) {
    let obj = req.value;


    Joi.validate(obj, service.schemaData(), (err, value) => {
        if (err) {
            let response = {
                message: "plese fill the all requried fields",
                statusCode: 400,
                data: err
            }
            res.send(response);
        } else {

            obj.password = bcrypt.hashSync(obj.password, 2);
            let saveUserData = new userModel(obj);
            service.userSevedata(saveUserData, res)
        }
    })
}

personData.signIn = function (req, res) {
    res.sendFile('signin.html', { root: __dirname });
}

personData.logIn = async function (req, res) {

    service.logIn(req.body, res)

}

personData.getuser = async (req, res) => {

    service.getUser(req.paginationValue, res)
}

personData.getUserById = async (req, res) => {

    service.getUserById(req.paginationValue, res)
}

personData.updateUser = async (req, res) => {

    let obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    service.updateUser(req.paginationValue, res, obj)
}

personData.deleteUser = async (req, res) => {

    service.deleteUser(req.paginationValue, res)
}


// personData.jwtAuth = async (req, res) => {

//     let token = req.headers.authorization;
//     let decode = jwt.verify(token, "secret");

//     let User = await userModel.findOne({ "email": decode.email });

//     if (User || User.role != admin) {
//         let response = {
//             satausCode: 401,
//             message: " unauthorised user "
//         }
//         res.json(response)
//     }
// }

personData.task = (req, res) => {

    let response = {
        message: "fetched user",
        statusCode: 200,
        data: req.user
    }
    res.json(response);
}

module.exports = personData;