import { NextFunction, Request, Response } from "express";


export default class FishController {

    index(req: Request, res: Response, next: NextFunction): void {
        res.json('From index controller')
    }

    version(req: Request, res: Response, next: NextFunction): void {
        res.json('version')
    }
}