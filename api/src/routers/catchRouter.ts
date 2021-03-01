import UserController from '../controllers/catchController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import { authenticateJWT, isAdmin } from '../utils/jwtHandler'

export default class UserRouter implements IRouter{
    expressRouter: express.Router = express.Router()
    controller: UserController = new UserController()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', authenticateJWT, isAdmin, (req, res, next) => this.controller.getAllUsers(req, res, next))
        this.expressRouter.post('/', (req, res, next) => this.controller.createUser(req, res, next))
    }
}