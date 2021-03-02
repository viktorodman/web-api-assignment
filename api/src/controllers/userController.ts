import { NextFunction, Request, Response } from "express";
import UserRequest from "interfaces/IUserRequest";
import User, { IUser } from '../models/user'



export default class UserController {

    public async getAllUsers(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await User.getAll()

            console.log(req.protocol)
            console.log(req.get('host'))
            console.log(req.originalUrl)

            const data = {
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
                },
                size: users.length,
                _embedded: {
                    user: users.map(user => ({
                        _links: {
                            self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${user.username}` }
                        },
                        username: user.username, 
                        permission: user.permission 
                    }))
                }
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

    private getRequestUsername(req: Request): string {
        return req.body.username
    }

    private getRequestPassword(req: Request): string {
        return req.body.password
    }
}