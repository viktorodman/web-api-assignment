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
            console.log(error.name)
            if (error.name === 'NotFoundError') {
                this.sendErrorResponse(res, error.status, error.name , error.message)     
            } else {
                this.sendErrorResponse(res, 400, 'BadRequestError', 'Something went wrong')
            }
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

    public async updateCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedCatch = await Catch.updateById(req.params.id, {fisher: req.user.username, ...req.body})

            console.log(updatedCatch)

            res.status(204).json("From update")
        } catch (error) {
            res.json('from update catch')
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
            next(new createHttpError.NotFound('Catch does not exist'))
        }
    }

    private sendErrorResponse(res: Response, status: number, error: any , message: string) {
        res.status(status).json({
            status,
            error,
            message
        })
    }
}   