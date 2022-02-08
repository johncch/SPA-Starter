import { WorkspacesResponse } from "."
import { UserResponse } from "./user"

/**
 * Parameter Types
 */
export interface SignUpParams {
    email: string
    password: string
    fullName: string
}

export interface SignInParams {
    email: string
    password: string
}

/**
 * Response Types
 */

export interface AuthResponse extends UserResponse, WorkspacesResponse {
    currentWorkspaceID: string
}
