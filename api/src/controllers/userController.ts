import { NextFunction, Request, Response } from "express";
import createHttpError = require("http-errors");
import UserRequest from "interfaces/IUserRequest";
import User, { IUser } from '../models/user'



export default class UserController {

    public async getUser(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await User.getByUsername(req.params.username)
            
            console.log(req.protocol)
            const data = {
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
                },
                username: user.username, 
                permission: user.permission 
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)   
        }
    } 

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {     
            const user = await User.create({
                username: this.getRequestUsername(req),
                password: this.getRequestPassword(req),
                permission: 'normal'
            })
            res.status(201).json({ username: user.username, message: `Created User: ${user.username}`})
        } catch (error) {
            next(error)
        }
       
    }

    public async authorizeUser(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await User.getByUsername(req.params.username)

            if (req.user.username !== user.username && req.user.permission !== 'admin') {
                return next(new createHttpError.Forbidden("You are not authorized to show that user"))
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    private getRequestUsername(req: Request): string {
        return req.body.username
    }

    private getRequestPassword(req: Request): string {
        return req.body.password
    }
}