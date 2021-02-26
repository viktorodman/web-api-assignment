import { NextFunction, Request, Response } from "express";


export default class UserController {

    getAllUsers(req: Request, res: Response, next: NextFunction): void {
        res.json('From get all users')
    }

    createUser(req: Request, res: Response, next: NextFunction): void {
        res.json('From Create User')
    }
}