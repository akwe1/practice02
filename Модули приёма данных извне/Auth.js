const Router = require('express')
const AuthController = require("../controllers/AuthController");
const route = new Router()

route.get('/login', AuthController.auth)
route.post('/login', AuthController.login)

route.get('/reg', AuthController.reg)
route.post('/registration', AuthController.registration)

route.get('/logout', AuthController.logout)
route.get('/lk/:id', AuthController.lk)

route.post('/lk/:id', AuthController.update)

module.exports=route