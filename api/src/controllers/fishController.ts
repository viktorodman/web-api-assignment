import { NextFunction, Request, Response } from "express";


export default class FishController {

    index(req: Request, res: Response, next: NextFunction): void {
        res.json('From Fish controller')
    }

    version(req: Request, res: Response, next: NextFunction): void {
        res.json('show me fish with id ' + req.params.id)
    }
}