import * as express from 'express'

export default interface IRouter {
    expressRouter: express.Router
    baseURL: string
    initializeRoutes: () => void
}