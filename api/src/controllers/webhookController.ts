import { NextFunction, Request, Response } from "express";
import UserRequest from "interfaces/IUserRequest";
import Hook from "../models/hook";



export default class WebhookController {

    public async getAllHooks(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const hooks = await Hook.getAllUserHooks(req.user.username)

            console.log(hooks)
            res.status(200).json('asdföa')
        } catch (error) {
            next(error)
        }
    }

    public async registerHook(req, res: Response, next: NextFunction): Promise<void> {
        try {
            const hook = await Hook.create(this.getRequestHookDetails(req))

            res.json(hook)
        } catch (error) {
            next(error)
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