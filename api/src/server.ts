import * as express from 'express'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as dotenv from 'dotenv'
import App from './app'
import { connectDB } from './config/mongoose'
import IndexRouter from './routers/indexRouter'
import AuthRouter from './routers/authRouter'
import UserRouter from './routers/userRouter'
import CatchRouter from './routers/catchRouter'
import WebhookRouter from './routers/webhookRouter'

dotenv.config()

const main = async () => {

    await connectDB()
        

    const app = new App({
        port: process.env.PORT,
        routers: [
            new IndexRouter('/'),
            new AuthRouter('/v1/auth'),
            new UserRouter('/v1/users'),
            new CatchRouter('/v1/catches'),
            new WebhookRouter('/v1/hooks')
        ],
        middleWares: [
            helmet(),
            logger('dev'),
            express.json(),
            express.urlencoded({ extended: true })
        ]
    })
    
    app.run()
}

main().catch(console.error)


