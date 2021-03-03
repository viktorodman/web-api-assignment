import * as express from 'express'
import IRouter  from "../interfaces/IRouter"
import IndexController from "../controllers/indexController"
import createHttpError = require('http-errors')

export default class IndexRouter implements IRouter{
    controller: IndexController = new IndexController()
    expressRouter: express.Router = express.Router()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.expressRouter.get('/', (req, res, next) => this.controller.index(req, res, next))
        this.expressRouter.get('/v1', (req, res, next) => this.controller.version(req, res, next))
    }
}