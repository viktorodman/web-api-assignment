import { NextFunction, Request, Response } from "express";
import createHttpError = require("http-errors");
import { notifySubscribers } from "../utils/hookPublisher";
import Catch, { ICatch } from "../models/catch";


export default class CatchController {

    public async getCatch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const fishCatch = await Catch.getById(req.params.id)
            
            const data = this.createCatchResponseObject(fishCatch, req)

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
                    catches: catches.map(c => this.createCatchResponseObject(c, req))
                }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    public async createCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const fishCatch = await Catch.create(this.createCatchRequestObject(req))
            
            const subData = this.createCatchResponseObject(fishCatch, req)
            await notifySubscribers(subData)

            res.status(201).json({
                catch_id: fishCatch._id,
                created_catch: `${req.protocol}://${req.get('host')}${req.originalUrl}/${fishCatch._id}`,                
            })
        } catch (error) {
            next(error)
        }
    }

    public async updateCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedCatch = await Catch.updateById(req.params.id, this.createCatchRequestObject(req))

            res.status(204).json()
        } catch (error) {
            next(error)
        }
    }
    public async deleteCatch(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedCatch = await Catch.deleteById(req.params.id)

            res.status(204).json()
        } catch (error) {
            next(error)
        }
    }

    public async authorizeUser(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const fishCatch = await Catch.getById(req.params.id)

            if (req.user.username !== fishCatch.fisher && req.user.permission !== 'admin') {
                return next(new createHttpError.Forbidden())
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    private createCatchRequestObject(req) {
        const { fishSpecies, length, weight, city, lake, latitude, longitude } = req.body
        return {
            fisher: req.user.username,
            fishSpecies,
            measurement: {
                length,
                weight
            },
            location: {
                city,
                lake,
                latitude: latitude || "",
                longitude: longitude || ""
            } 
        }
    }

    private createCatchResponseObject(fishCatch: ICatch, req) {
        return{ 
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${fishCatch._id}` }
            },
            fisher: fishCatch.fisher, 
            fishSpecies: fishCatch.fishSpecies,
            measurement: fishCatch.measurement,
            location: fishCatch.location
        }
    }
}   