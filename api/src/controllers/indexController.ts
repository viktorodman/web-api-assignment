import { NextFunction, Request, Response } from "express";


export default class IndexController {

    index(req: Request, res: Response, next: NextFunction): void {
        res.status(200).json({
            _links: {
                self: { 
                    href: `${req.protocol}://${req.get('host')}${req.originalUrl}` 
                },
                users: {
                    href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/users` 
                },
                catches: {
                    href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/catches`
                },
                webhooks: {
                    href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/hooks` 
                }
            }
        })
    }

    version(req: Request, res: Response, next: NextFunction): void {
        res.json('version')
    }
}