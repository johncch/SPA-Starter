import { axiosInstance } from "."
import { AuthResponse, SignInParams, SignUpParams } from "./types"

export function setAuthorizationHeader(token: string) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export async function signUp(params: SignUpParams): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
        axiosInstance
            .post("/auth/signup", params)
            .then((response) => {
                const user = response.data.user
                resolve(user)
            })
            .catch((e) => {
                const errorMsg = e.response?.data?.error
                const error = errorMsg ? new Error(errorMsg) : e
                reject(error)
            })
    })
}

export async function signIn(params: SignInParams): Promise<AuthResponse> {
    return axiosInstance
        .post<AuthResponse>("/auth/signin", params)
        .then((response) => response.data)
        .catch((e) => {
            const errorMsg = e.response?.data?.error
            const error = errorMsg ? new Error(errorMsg) : e
            throw error
        })
}
