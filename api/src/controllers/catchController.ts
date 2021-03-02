import { NextFunction, Request, Response } from "express";
import Catch from "../models/catch";


export default class CatchController {

    public async getAllCatches(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const catches = await Catch.getAll()

            const data = {
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
                },
                size: catches.length,
                _embedded: {
                    catches: catches.map(c => ({
                        _links: {
                            self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${c._id}` }
                        },
                        fisher: c.fisher, 
                        fishSpecies: c.fishSpecies,
                        measurement: c.measurement,
                        location: c.location
                    }))
                }
            }
            res.status(200).json(data)
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
            res.status(201).json(fishCatch._id)
        } catch (error) {
            res.json(error)
        }
    }
}   