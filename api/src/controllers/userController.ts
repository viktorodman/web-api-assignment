import { NextFunction, Request, Response } from "express";
import UserRequest from "interfaces/IUserRequest";
import User, { IUser } from '../models/user'



export default class UserController {

    public async getAllUsers(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await User.getAll()

            res.json({users})
        } catch (error) {
            
            res.json(error)
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
            this.handleUserCreationErrors(res, error)
        }
       
    }

    private handleUserCreationErrors(res: Response, error: any): void {
        if (error.name === 'ConflictError') {
            this.sendErrorResponse(res, error.status, error.name , error.message)     
        } else if (error.name === 'BadRequestError') {
            this.sendErrorResponse(res, error.status, error.name , error.message)
        } else {
            this.sendErrorResponse(res, 400, 'BadRequestError', 'Something went wrong')
        }
    }

    private sendErrorResponse(res: Response, status: number, error: any , message: string) {
        res.status(status).json({
            status,
            error,
            message
        })
    }

    private getRequestUsername(req: Request): string {
        return req.body.username
    }

    private getRequestPassword(req: Request): string {
        return req.body.password
    }

    private isValidationError(error: any): boolean {
        return error.name === 'ValidationError'
    }
}