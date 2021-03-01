import { NextFunction, Request, Response } from "express";
import Catch from "../models/catch";


export default class CatchController {

    public async getAllCatches(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).json("Fishshshsh")
        } catch (error) {
            res.status(error.status).json({
                status: error.status,
                error: error.name,
                message: error.message
            })
        }
    }

    public async createCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body)
            const fishCatch = await Catch.create({
                fisher: req.user.username,
               ...req.body
            })
            res.status(201).json(fishCatch)
        } catch (error) {
            res.json(error)
        }
    }
}   