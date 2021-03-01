import { NextFunction, Request, Response } from "express";


export default class CatchController {

    public async getAllCatches(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        
        } catch (error) {
            res.status(error.status).json({
                status: error.status,
                error: error.name,
                message: error.message
            })
        }
    }

    public async createCatch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
}   