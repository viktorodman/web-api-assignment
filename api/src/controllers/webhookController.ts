import { NextFunction, Request, Response } from "express";
import createHttpError = require("http-errors");
import UserRequest from "interfaces/IUserRequest";
import Hook, { IHook } from "../models/hook";



export default class WebhookController {

    public async getHook(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const hook = await Hook.getById(req.params.id)

            const data = this.createHookResponseObject(hook, req)

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
    public async getAllHooks(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const hooks = await Hook.getAllUserHooks(req.user.username)
            
            const data = {
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
                }, 
                size: hooks.length,
                _embedded: {
                    user_hooks: hooks.map(hook => this.createHookResponseObject(hook, req))
                }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
    public async updateHook(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedCatch = await Hook.updateById(req.params.id, this.getRequestHookDetails(req))

            res.status(204).json()
        } catch (error) {
            next(error)
        }
    }
    public async registerHook(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const hook = await Hook.create(this.getRequestHookDetails(req))
            
            res.status(201).json({
                hook_id: hook._id,
                created_hook: `${req.protocol}://${req.get('host')}${req.originalUrl}/${hook._id}`,                
            })
        } catch (error) {
            next(error)
        }
    }

    public async authorizeUser(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const hook = await Hook.getById(req.params.id)

            if (req.user.username !== hook.user && req.user.permission !== 'admin') {
                return next(new createHttpError.Forbidden("You are not authorized to show that user"))
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    private createHookResponseObject(hook: IHook, req: any): any {
        const { _id, user, url, catch_event, catch_event_lake_filter, catch_event_species_filter } = hook
        return {
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${hook._id}`} 
            },
            id: _id, 
            user,
            url, 
            catch_event,
            catch_event_lake_filter, 
            catch_event_species_filter 
        }
    }
    
    private getRequestHookDetails(req: any): any {
        const { url, catch_event, catch_event_lake_filter, catch_event_species_filter } = req.body
        return {
            user: req.user.username,
            url, 
            catch_event, 
            catch_event_lake_filter: catch_event_lake_filter || "", 
            catch_event_species_filter: catch_event_species_filter || "" 
        }
    }
}