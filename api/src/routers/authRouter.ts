import * as express from 'express'
import AuthController from '../controllers/authController'
import IRouter  from "../interfaces/IRouter"

export default class AuthRouter implements IRouter{
    controller: AuthController = new AuthController()
    expressRouter: express.Router = express.Router()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.post('/login', (req, res, next) => this.controller.login(req, res, next))
    }
}