import UserController from '../controllers/catchController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import { authenticateJWT } from '../utils/jwtHandler'
import createHttpError = require('http-errors')

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
            (req, res, next) => this.controller.getAllCatches(req, res, next)
        )

        this.expressRouter.post('/', 
            authenticateJWT, 
            (req, res, next) => this.controller.createCatch(req, res, next)
        )

        this.expressRouter.get('/:id', 
            authenticateJWT,
            (req, res, next) => this.controller.getCatch(req, res, next)
        )

        this.expressRouter.put('/:id',
            authenticateJWT,
            (req, res, next) => this.controller.authorizeUser(req, res, next),
            (req, res, next) => this.controller.updateCatch(req, res, next)
        )

        this.expressRouter.delete('/:id',
            authenticateJWT,
            (req, res, next) => this.controller.authorizeUser(req, res, next),
            (req, res, next) => this.controller.deleteCatch(req, res, next),
        )

        this.expressRouter.use('*', (req, res, next) => next(createHttpError(404)))
    }
}