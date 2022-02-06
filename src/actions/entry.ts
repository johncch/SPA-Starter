import { createAction } from "@reduxjs/toolkit"
import { hasError, ThunkResult } from "."
import { AppDispatch, RootState } from "../app/store"
import { Entry } from "../app/types"
import { getEntries } from "../request"

export const requestEntries = createAction<string>("REQUEST_ENTRIES")
export const receiveEntries = createAction<{
    workspaceId: string
    entries: Entry[]
}>("RECEIVE_ENTRIES")

export const requestNewEntry = createAction<{
    requestId: string
    workspaceId: string
    entry: Entry
}>("REQUEST_NEW_ENTRY")

export const setNewEntry = createAction<{
    requestId: string
    workspaceId: string
    entry: Entry
}>("SET_NEW_ENTRY")

export function fetchEntries(workspaceId: string): ThunkResult<Promise<void>> {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(requestEntries(workspaceId))
        return getEntries({ workspaceId })
            .then((entriesResp) => {
                const entries = entriesResp.entries
                dispatch(receiveEntries({ workspaceId, entries }))
            })
            .catch((error: Error) => {
                dispatch(hasError(error.message))
            })
    }
}

export function fetchEntriesIfNeeded(
    workspaceId: string
): ThunkResult<Promise<void>> {
    return async (
        dispatch: AppDispatch,
        getState: () => RootState
    ): Promise<void> => {
        const state = getState()
        const lastUpdated = state.entries.workspaces[workspaceId]?.lastUpdated
        if (!lastUpdated || new Date().getTime() - lastUpdated >= 900) {
            return dispatch(fetchEntries(workspaceId))
        }
    }
}
