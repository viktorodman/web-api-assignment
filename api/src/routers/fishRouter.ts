import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import FishController from "../controllers/fishController"

export default class FishRouter implements IRouter{
    controller: FishController = new FishController()
    expressRouter: express.Router = express.Router()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', (req, res, next) => this.controller.index(req, res, next))
        this.expressRouter.get('/:species', (req, res, next) => this.controller.version(req, res, next))
    }
}