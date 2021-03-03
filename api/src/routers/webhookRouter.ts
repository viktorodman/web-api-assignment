import WebhookController from '../controllers/webhookController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import { authenticateJWT } from '../utils/jwtHandler'

export default class WebhookRouter implements IRouter{
    expressRouter: express.Router = express.Router()
    controller: WebhookController = new WebhookController()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', 
            authenticateJWT, 
            (req, res, next) => this.controller.getAllHooks(req, res, next)
        )

        this.expressRouter.post('/',
            authenticateJWT,
            (req, res, next) => this.controller.registerHook(req, res, next)
        )

        this.expressRouter.get('/:id',
            authenticateJWT,
            (req, res, next) => this.controller.authorizeUser(req, res, next),
            (req, res, next) => this.controller.getHook(req, res, next)
        )

        this.expressRouter.put('/:id',
            authenticateJWT,
            (req, res, next) => this.controller.authorizeUser(req, res, next),
            (req, res, next) => this.controller.updateHook(req, res, next)
        )

        this.expressRouter.delete('/:id',
            authenticateJWT,
            (req, res, next) => this.controller.authorizeUser(req, res, next),
            (req, res, next) => this.controller.deleteHook(req, res, next)
        )
    }
}