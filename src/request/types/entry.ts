// Param Types

import { Entry } from "../../app/types/entry"

export interface GetEntriesParams {
    workspaceId: string
}

// Response Types

export interface EntriesResponse {
    entries: Entry[]
}

export interface EntryResponse {
    entry: Entry
}
