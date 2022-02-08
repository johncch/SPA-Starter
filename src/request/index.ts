import axios from "axios"

export interface Wrapper<T> {
    data: T
}

declare let BASEURL: string
declare let LOCAL: boolean

if (LOCAL) {
    require("./mock")
}

export const axiosInstance = axios.create({
    baseURL: BASEURL,
})

export * from "./auth"
export * from "./entry"
export * from "./user"
export * from "./workspace"
