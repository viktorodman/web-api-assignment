import WebhookController from '../controllers/webhookController'
import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import { authenticateJWT, isAdmin } from '../utils/jwtHandler'

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
    }
}