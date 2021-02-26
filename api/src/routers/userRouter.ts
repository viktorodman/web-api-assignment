import UserController from '../controllers/userController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"

export default class UserRouter implements IRouter{
    expressRouter: express.Router = express.Router()
    controller: UserController = new UserController()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', (req, res, next) => this.controller.getAllUsers(req, res, next))
        this.expressRouter.post('/', (req, res, next) => this.controller.createUser(req, res, next))
    }
}