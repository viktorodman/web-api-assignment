import IRouter from "interfaces/IRouter";

export default interface AppInit {
    readonly port: number
    readonly routers: Array<IRouter>
    readonly middleWares: Array<any>
}