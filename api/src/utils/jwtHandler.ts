import * as jwt from 'jsonwebtoken'
import createHttpError = require('http-errors')
import Payload from 'types/payload'


export const authenticateJWT = (req, res, next): void => {
    const authorization = req.headers.authorization.split(' ')

    if (authorization[0] !== 'Bearer') {
        next(createHttpError(401))
        return
    }


    try {
        const payload = jwt.verify(authorization[1], process.env.JWT_SECRET) as Payload

        req.user = {
            username: payload.username
        }
        
        next()
    } catch (error) {
        next(createHttpError(403))
    }
}
