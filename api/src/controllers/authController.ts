import { NextFunction, Request, Response } from "express";
import User from "../models/user";


export default class AuthController {

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const user = await User.authenticate(req.body.username, req.body.password)
            res.json('From auth controller')
        } catch (error) {
            res.status(error.status).json({
                status: error.status,
                error: error.name,
                message: error.message
            })
        }
    }
}