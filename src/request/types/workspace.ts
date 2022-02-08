import { Workspace } from "../../app/types"

export interface WorkspacesResponse {
    workspaces: Array<Workspace>
    currentWorkspaceID: string
}
