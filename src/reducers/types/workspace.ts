import { Status } from "."
import { Workspace } from "../../app/types"

export interface WorkspaceState {
    status: Status
    activeId: string
    workspaces: Record<string, Workspace>
}
