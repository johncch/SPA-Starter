import { Status } from "."
import { User } from "../../app/types"

export interface UserState {
    status: Status
    user: User
}
