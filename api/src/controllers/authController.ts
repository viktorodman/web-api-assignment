import { NextFunction, Request, Response } from "express";


export default class AuthController {

    login(req: Request, res: Response, next: NextFunction): void {
        res.json('From auth controller')
    }
}