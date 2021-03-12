import IRouter from "interfaces/IRouter";

export default interface AppInit {
    readonly port: number | string
    readonly routers: Array<IRouter>
    readonly middleWares: Array<any>
}