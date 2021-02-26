import * as express from 'express'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as dotenv from 'dotenv'
import App from './app'
import IndexRouter from './routers/indexRouter'
import FishRouter from './routers/fishRouter'
import AuthRouter from './routers/authRouter'
import { connectDB } from './config/mongoose'

dotenv.config()

const main = async () => {

    await connectDB()
        

    const app = new App({
        port: process.env.PORT,
        routers: [
            new IndexRouter('/'),
            new FishRouter('/v1/fish'),
            new AuthRouter('/v1/auth')
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


