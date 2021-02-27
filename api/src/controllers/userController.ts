import { NextFunction, Request, Response } from "express";

import User, { IUser } from '../models/user'

export default class UserController {

    public getAllUsers(req: Request, res: Response, next: NextFunction): void {
        res.json('From get all users')
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const username = this.getRequestUsername(req)
            const password = this.getRequestPassword(req)

            const user = await User.create({
                username,
                password
            })
            res.json(`Created User: ${user.username}`)
        } catch (error) {
            console.log(res)
            if (error.code === 11000) {
                res.json({
                    status: 409,
                    message: 'User already registered'
                })
            } else if (error.name === 'ValidationError') {
                console.log(error.message)
                res.json({
                    status: 400,
                    message: error.message
                })
            } else {
                console.log(error.name)
                res.json({error})
            }
        }
       
    }

    private getRequestUsername(req: Request): string {
        return req.body.username
    }

    private getRequestPassword(req: Request): string {
        return req.body.password
    }
}