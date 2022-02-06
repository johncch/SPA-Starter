import { createReducer } from "@reduxjs/toolkit"
import {
    receiveWorkspaces,
    requestWorkspaces,
    setCurrentWorkspaceID,
} from "../actions"
import { Workspace } from "../app/types"
import { Status, WorkspaceState } from "./types"

export const workspaces = createReducer<WorkspaceState>(
    {
        status: Status.Initial,
        activeId: null,
        workspaces: {},
    },
    (builder) =>
        builder
            .addCase(requestWorkspaces, (state) => {
                return {
                    ...state,
                    status: Status.Loading,
                }
            })
            .addCase(receiveWorkspaces, (state, action) => {
                return {
                    ...state,
                    status: Status.Loaded,
                    workspaces: action.payload.reduce(
                        (map, workspace) => (
                            (map[workspace.id] = workspace), map
                        ),
                        <{ [id: string]: Workspace }>{}
                    ),
                }
            })
            .addCase(setCurrentWorkspaceID, (state, action) => {
                return {
                    ...state,
                    activeId: action.payload,
                }
            })
)
