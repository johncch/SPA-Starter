import { createAction } from "@reduxjs/toolkit"
import { ThunkResult, hasError } from "."
import { AppDispatch } from "../app/store"
import { Workspace } from "../app/types"
import { getWorkspaces } from "../request"

export const requestWorkspaces = createAction("REQUEST_WORKSPACES")
export const receiveWorkspaces =
    createAction<Array<Workspace>>("RECEIVE_WORKSPACES")
export const setCurrentWorkspaceID = createAction<string>(
    "SET_CUR_WORKSPACE_ID"
)

export function fetchWorkspacesIfNeeded(): ThunkResult<Promise<void>> {
    return async (dispatch: AppDispatch, getState): Promise<void> => {
        const state = getState()
        if (state.workspaces.status == "initial") {
            dispatch(fetchWorkspaces())
        }
    }
}

export function fetchWorkspaces(): ThunkResult<Promise<void>> {
    return async (dispatch: AppDispatch) => {
        dispatch(requestWorkspaces())
        try {
            const workspacesResp = await getWorkspaces()
            dispatch(receiveWorkspaces(workspacesResp.workspaces))
            dispatch(setCurrentWorkspaceID(workspacesResp.currentWorkspaceID))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(hasError(e.message))
            }
        }
    }
}
