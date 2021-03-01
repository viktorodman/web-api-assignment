import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import * as jwt from 'jsonwebtoken'
import Payload from "types/payload";


export default class AuthController {

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const user = await User.authenticate(req.body.username, req.body.password)
            
            const payload: Payload = { username: user.username, permission: user.permission }

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
            })

            res
            .status(201)
            .json({
                access_token: accessToken
            })
        } catch (error) {
            res.status(error.status).json({
                status: error.status,
                error: error.name,
                message: error.message
            })
        }
    }
}