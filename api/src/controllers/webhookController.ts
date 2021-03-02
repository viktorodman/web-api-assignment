import { NextFunction, Request, Response } from "express";
import UserRequest from "interfaces/IUserRequest";
import User, { IUser } from '../models/user'



export default class WebhookController {

    public async getAllHooks(req, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).json('asdföa')
        } catch (error) {
            next(error)
        }
    }
}