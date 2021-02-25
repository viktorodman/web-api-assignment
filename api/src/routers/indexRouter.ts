import IRouter  from "../interfaces/IRouter"
import * as express from 'express'
import IndexController from "../controllers/indexController"

export default class IndexRouter implements IRouter{
    indexController: IndexController = new IndexController()
    expressRouter: express.Router = express.Router()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/v1', (req, res, next) => this.indexController.index(req, res, next))
    }
}