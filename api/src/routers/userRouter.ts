import UserController from '../controllers/userController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import { authenticateJWT } from '../utils/jwtHandler'
import createHttpError = require('http-errors')

export default class UserRouter implements IRouter{
    expressRouter: express.Router = express.Router()
    controller: UserController = new UserController()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/:username', 
        authenticateJWT,
        (req, res, next) => this.controller.authorizeUser(req, res, next),
        (req, res, next) => this.controller.getUser(req, res, next))

        this.expressRouter.post('/', (req, res, next) => this.controller.createUser(req, res, next))

        this.expressRouter.use('*', (req, res, next) => next(createHttpError(404)))
    }
}