import Payload from "types/payload";

export default interface UserRequest extends Request {
    user: Payload
}