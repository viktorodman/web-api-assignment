import { NextFunction, Request, Response } from "express";
import createHttpError = require("http-errors");
import Catch from "../models/catch";


export default class CatchController {

    public async getCatch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const fishCatch = await Catch.getById(req.params.id)
            
            const data = {
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
                },
                fisher: fishCatch.fisher, 
                fishSpecies: fishCatch.fishSpecies,
                measurement: fishCatch.measurement,
                location: fishCatch.location
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

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
            next(error)
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
            next(error)
        }
    }

    public async updateCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedCatch = await Catch.updateById(req.params.id, {fisher: req.user.username, ...req.body})

            res.status(204).json("From update")
        } catch (error) {
            next(error)
        }
    }
    public async deleteCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedCatch = await Catch.deleteById(req.params.id)

            console.log(deletedCatch)

            res.status(201).json("From update")
        } catch (error) {
            next(error)
        }
    }

    public async authorizeUser(req, res: Response, next: NextFunction) {
        try {
            const fishCatch = await Catch.getById(req.params.id)

            if (req.user.username !== fishCatch.fisher) {
                return next(new createHttpError.Forbidden())
            }
            next()
        } catch (error) {
            /* return next(createHttpError(404)) */
            /* next(new createHttpError.NotFound('Catch does not exist')) */
            next(error)
        }
    }
}   