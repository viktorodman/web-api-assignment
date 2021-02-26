import * as express from 'express'
import IRouter  from "../interfaces/IRouter"

export default class AuthRouter implements IRouter{

    expressRouter: express.Router = express.Router()
    baseURL: string
    public constructor (baseURL: string) {
        this.baseURL = baseURL
        this.initializeRoutes()
    }

    public initializeRoutes(): void {
       
    }
}