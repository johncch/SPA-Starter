import axios, { AxiosResponse } from "axios";
import {
  SignInParams,
  SignUpParams,
  GetEntriesParams,
  EntriesResponse,
  WorkspacesResponse,
  AuthResponse,
  UserResponse,
  EntryResponse
} from "./types";
import { Entry } from "../store/types";

interface Wrapper<T> {
  data: T;
}

declare var BASEURL: string;
declare var LOCAL: boolean;

if (LOCAL) {
  require("./mock.ts");
}

const axiosInstance = axios.create({
  baseURL: BASEURL
});

export function setAuthorizationHeader(token: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function signUp(params: SignUpParams): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/auth/signup", params)
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(e => {
        const errorMsg = e.response?.data?.error;
        const error = errorMsg ? new Error(errorMsg) : e;
        reject(error);
      });
  });
}

export async function signIn(params: SignInParams): Promise<AuthResponse> {
  return axiosInstance
    .post<AuthResponse>("/auth/signin", params)
    .then(response => response.data)
    .catch(e => {
      const errorMsg = e.response?.data?.error;
      const error = errorMsg ? new Error(errorMsg) : e;
      throw error;
    });
}

export async function getUser(): Promise<UserResponse> {
  return axiosInstance
    .get<UserResponse>("/v1/user")
    .then(response => response.data)
    .catch(e => {
      const errorMsg = e.response?.data?.error;
      const error = errorMsg ? new Error(errorMsg) : e;
      throw error;
    });
}

export async function getEntries(
  params: GetEntriesParams
): Promise<EntriesResponse> {
  return axiosInstance
    .get<EntriesResponse>("/v1/entries", { params })
    .then((response: Wrapper<EntriesResponse>) => response.data);
}

export async function getWorkspaces(): Promise<WorkspacesResponse> {
  return axiosInstance
    .get<WorkspacesResponse>("/v1/workspaces")
    .then((response: Wrapper<WorkspacesResponse>) => response.data);
}
