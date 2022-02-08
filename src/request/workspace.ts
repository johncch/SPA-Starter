import { axiosInstance, Wrapper } from ".";
import { WorkspacesResponse } from "./types";

export async function getWorkspaces(): Promise<WorkspacesResponse> {
    return axiosInstance
        .get<WorkspacesResponse>("/v1/workspaces")
        .then((response: Wrapper<WorkspacesResponse>) => response.data)
}
