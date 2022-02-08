import { axiosInstance } from "."
import { UserResponse } from "./types"

export async function getUser(): Promise<UserResponse> {
    return axiosInstance
        .get<UserResponse>("/v1/user")
        .then((response) => response.data)
        .catch((e) => {
            const errorMsg = e.response?.data?.error
            const error = errorMsg ? new Error(errorMsg) : e
            throw error
        })
}
