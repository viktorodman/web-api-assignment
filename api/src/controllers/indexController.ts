import { NextFunction, Request, Response } from "express";


export default class IndexController {

    index(req: Request, res: Response, next: NextFunction): void {
        res.json('From index controller')
    }
}