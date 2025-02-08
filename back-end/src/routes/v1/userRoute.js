import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'

const Router = express.Router()

Router.route('/register')
    .post(userValidation.createNew, userController.createNew)

Router.route('/verify')
    .put(userValidation.verifyAccount, userController.verifyAccount)

Router.route('/login')
    .post(userValidation.login, userController.login)

Router.route('/logout')
    .post(userController.logout)
Router.route('/refresh-token')
    .post(userController.refreshToken)

Router.route('/forgot-password')
    .post(userValidation.forgotPassword, userController.forgotPassword)

Router.route('/reset-password')
    .post(userValidation.resetPassword, userController.resetPassword)

Router.route('/')
    .get(userController.getCustomers)

Router.route('/:id')
    .put(userValidation.updateCustomer, userController.updateCustomer)
    .delete(userController.deleteCustomer)


export const userRoute = Router