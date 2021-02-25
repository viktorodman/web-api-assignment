import * as express from 'express'
import IndexRouter from 'routers/indexRouter'
import IRouter from 'interfaces/IRouter'
import AppInit from 'types/appInitializer'

export default class App {
    private app: express.Application = express()

    public constructor(private readonly appInit: AppInit) {
        // Empty
    }

    public run(): void {
        this.setUpMiddlewares()
        this.setUpRouter()
        this.listen()
    }

    private setUpMiddlewares(): void {
        this.appInit.middleWares.forEach(mw => this.app.use(mw))
    }

    private setUpRouter(): void {
        this.appInit.routers.forEach(router => this.app.use(router.baseURL, router.expressRouter))
    }

    private listen(): void {
        this.app.listen(this.appInit.port, () => console.log(`App listening on http://localhost:${this.appInit.port}`))
    }
}