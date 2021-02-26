import * as express from 'express'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as dotenv from 'dotenv'
import App from './app'
import IndexRouter from './routers/indexRouter'
import FishRouter from './routers/fishRouter'

dotenv.config()

const app = new App({
    port: process.env.PORT,
    routers: [
        new IndexRouter('/'),
        new FishRouter('/v1/fish')
    ],
    middleWares: [
        helmet(),
        logger('dev'),
        express.json(),
        express.urlencoded({ extended: true })
    ]
})

app.run()
