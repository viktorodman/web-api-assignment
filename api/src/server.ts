import * as express from 'express'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import App from './app'
import IndexRouter from './routers/indexRouter'
import FishRouter from './routers/fishRouter'


const app = new App({
    port: 3000,
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
