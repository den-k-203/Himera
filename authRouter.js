const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddlewate = require('./middleware/roleMiddleware')
router.post('/registration', [
    check('username', "Поле з ім`ям користувача пусте!").notEmpty(), 
    check('password', "Довжина паролю повина бути більше 8 символів і менше 20").isLength({min:8, max:20})],
    controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddlewate(["USER"]), controller.getUser)

module.exports = router