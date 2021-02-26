import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import FishController from "controllers/fishController"

export default class FishRouter implements IRouter{
    indexController: FishController = new FishController()
    expressRouter: express.Router = express.Router()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', (req, res, next) => this.indexController.index(req, res, next))
        this.expressRouter.get('/v1', (req, res, next) => this.indexController.version(req, res, next))
    }
}