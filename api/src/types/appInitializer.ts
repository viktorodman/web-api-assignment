import IRouter from "interfaces/IRouter";

export default interface AppInit {
    port: number
    routers: Array<IRouter>
    middleWares: Array<any>
}