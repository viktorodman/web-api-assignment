import UserController from '../controllers/catchController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import { authenticateJWT, isAdmin } from '../utils/jwtHandler'

export default class CatchRouter implements IRouter{
    expressRouter: express.Router = express.Router()
    controller: UserController = new UserController()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', 
            authenticateJWT, 
            (req, res, next) => this.controller.getAllCatches(req, res, next)
        )
        this.expressRouter.post('/', 
            authenticateJWT, 
            (req, res, next) => this.controller.createCatch(req, res, next)
        )
    }
}