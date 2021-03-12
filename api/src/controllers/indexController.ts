import { NextFunction, Request, Response } from "express";


export default class IndexController {

    index(req: Request, res: Response, next: NextFunction): void {
        res.status(200).json({
            _links: {
                self: { 
                    method: "GET",
                    href: `${req.protocol}://${req.get('host')}${req.originalUrl}` 
                },
                users: {
                    create_user: {
                        method: "POST",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/users`
                    },
                    show_user_information: {
                        method: "GET",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/users/{username}` 
                    }
                },
                authorization: {
                    sign_in: {
                        method: "POST",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/auth/login`
                    }
                },
                catches: {
                    all_catches: { 
                        method: "GET",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/catches`
                    },
                    show_catch_information: {
                        method: "GET",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/catches/{catch_id}`
                    },
                    create_catch: { 
                        method: "POST",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/catches`
                    },
                    update_catch: { 
                        method: "PUT",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/catches/{catch_id}`
                    },
                    delete_catch: {
                        method: "DELETE",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/catches/{catch_id}`
                    }
                },
                webhooks: {
                    all_user_hooks: {
                        method: "GET",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/hooks` 
                    },
                    show_hook_information: {
                        method: "GET",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/hooks/{hook_id}`
                    },
                    create_hook: { 
                        method: "POST",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/hooks`
                    },
                    update_hook: { 
                        method: "PUT",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/hooks/{hook_id}`
                    },
                    delete_hook: {
                        method: "DELETE",
                        href: `${req.protocol}://${req.get('host')}${req.originalUrl}v1/hooks/{hook_id}`
                    }
                }
            }
        })
    }

    version(req: Request, res: Response, next: NextFunction): void {
        res.status(200).json({
            version: "v1"
        })
    }
}