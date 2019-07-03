const express = require('express');
const app = express();
const router = express.Router();
const controller = require('./controller/controllers');
const middleware = require('./middleware/middlewares');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./')
app.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }))


app.use('/', router);
 
router.get('/signup', controller.getSignUp);

router.post('/signup' , middleware.signUp ,controller.signUp);

app.get('/signin',controller.signIn);

app.post('/signin',controller.logIn);

// app.get('/jwt',middleware.userJwtAuthencation,middleware.adminJwtAuthencation,controller.task);

app.get('/user',middleware.payload,middleware.userJwtAuthencation,controller.getuser);

app.get('/user/:id',middleware.payload,middleware.userJwtAuthencation,controller.getUserById);

app.put('/user/:id',middleware.payload,middleware.adminJwtAuthencation,controller.updateUser);

app.delete('/user/:id',middleware.payload,middleware.adminJwtAuthencation,controller.deleteUser);

app.listen(3000,() =>{
    console.log("Running on port no 3000 ")
})