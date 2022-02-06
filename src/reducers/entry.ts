import { createReducer } from "@reduxjs/toolkit"
import {
    receiveEntries,
    receiveWorkspaces,
    requestNewEntry,
    setNewEntry,
} from "../actions"
import { EntryState, WorkspaceEntryState } from "./types"

export const entries = createReducer<EntryState>(
    {
        workspaces: {},
    },
    (builder) =>
        builder
            .addCase(receiveWorkspaces, (state, action) => {
                // Initialize all the empty entries
                const workspaces: Record<string, WorkspaceEntryState> = {}
                for (const workspace of action.payload) {
                    workspaces[workspace.id] = {
                        drafts: [],
                        entries: [],
                        lastUpdated: 0,
                    }
                }
                return {
                    workspaces,
                }
            })
            .addCase(receiveEntries, (state, action) => {
                const { workspaceId, entries } = action.payload
                return {
                    workspaces: Object.assign({}, state.workspaces, {
                        [workspaceId]: {
                            entries: entries,
                            lastUpdated: new Date().getTime(),
                        },
                    }),
                }
            })
            .addCase(requestNewEntry, (state, action) => {
                const { requestId, workspaceId, entry } = action.payload
                entry.id = requestId
                const drafts = state.workspaces[workspaceId].drafts
                return {
                    workspaces: Object.assign({}, state.workspaces, {
                        [workspaceId]: {
                            ...state.workspaces[workspaceId],
                            pendingEntries: [entry, ...drafts],
                            lastUpdated: new Date().getTime(),
                        },
                    }),
                }
            })
            .addCase(setNewEntry, (state, action) => {
                const { requestId, entry, workspaceId } = action.payload
                const drafts = state.workspaces[workspaceId].drafts
                const entries = state.workspaces[workspaceId].entries
                const newPendingEntries = drafts.filter(
                    (e) => e.id != requestId
                )

                return {
                    workspaces: Object.assign({}, state.workspaces, {
                        [workspaceId]: {
                            pendingEntries: newPendingEntries,
                            entries: [entry, ...entries],
                            lastUpdated: new Date().getTime(),
                        },
                    }),
                }
            })
)
