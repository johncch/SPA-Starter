import { Entry } from "../../app/types"

export interface RDataDir {
    [id: string]: {
        pendingEntries: Entry[]
        entries: Entry[]
        lastUpdated: number
    }
}

export interface WorkspaceEntryState {
    drafts: Entry[]
    entries: Entry[]
    lastUpdated: number
}

export interface EntryState {
    workspaces: Record<string, WorkspaceEntryState>
}
