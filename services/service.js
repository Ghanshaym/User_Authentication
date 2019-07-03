const Joi = require('joi');
let services = {}
const userModel = require('../models/models')
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let controllers = require('../controller/controllers')

services.schemaData = (req, res) => {
  let schema = Joi.object().keys({
    firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
    email: Joi.string().email({ minDomainAtoms: 1 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    role: Joi.string().regex(/^[a-zA-Z_]{3,30}$/).min(3).max(30).required()
  });
  return schema;
}

services.userSevedata = (req, res) => {

  let obj = req;
  obj.save((err, value) => {
    if (err) {
      let response = {
        message: "your data will not saved",
        statusCode: 400,
        data: err
      }
      // res.json(response);
      res.send(response)
    }
    else if (value) {
      let response = {
        message: "your data will be saved",
        statusCode: 200,
        data: value
      }
      res.send(response);
    }

  })
}

services.getUser = async (req, res) => {
  // let userData = await userModel.findOne({ "firstName": req.firstName });

  let sortData = await userModel.find().sort({ firstName: 1 }).skip(req.index).limit(req.limit);
  let response = {
    message: "Fetched user data",
    statusCode: 200,
    data: sortData
  }
  res.json(response);

}

services.getUserById = async (req, res) => {
  // req == req.pagination (this req can hold all the data index, limit , params , headers)

  let getData = await userModel.findById(req.param);

  if (getData.role == 'admin' || getData.role == 'normal_user') {

    let response = {
      message: "fetched  user",
      statusCode: 200,
      data: getData
    };
    res.json(response);
  }
  else {
    let response = {
      message: "role of the user has been missing",
      statusCode: 400
    }
    res.json(response);
  }
}

services.updateUser = async (req, res, obj) => {

  console.log("requestData = " + req.param);
  console.log(("object = " + obj.firstName));

  let findUser = await userModel.findById(req.params)

  let updateData = await userModel.findByIdAndUpdate(req.param, { $set: obj });

  let response = {
    message: "your data will be update",
    statusCode: 200,
    data: updateData
  }
  res.json(response);

}

services.deleteUser = async(req,res)=>{
  let findUser = await userModel.findById(req.param)

    let deleteUserData = await userModel.findByIdAndDelete(req.param);

    let response = {
        message: "user data has been deleted",
        satausCode: 200,
        data: deleteUserData
    }
    res.json(response);
}

services.logIn = async(req,res)=>{
  let personInfo = await userModel.findOne({ email: req.email });
  bcrypt.compare(req.password, personInfo.password, function (err, same) {

      if (same) {
          const token = jwt.sign({
              email: personInfo.email,
              _id: personInfo._id,
              role: personInfo.role
          }, 'secret');
          let response = {
              message: "Loged In successfully",
              statusCode: 200,
              token: token
          }
          res.json(response)
      }
      else {
          let response = {
              message: "your email and password does not match",
              satausCode: 400
          }
          res.json(response);
      }
  })

}

module.exports = services;