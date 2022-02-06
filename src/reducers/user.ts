import { createReducer } from "@reduxjs/toolkit"
import { setCurrentUser, requestCurrentUser } from "../actions"
import { Status } from "./types"
import { UserState } from "./types/user"

export const user = createReducer<UserState>(
    {
        status: Status.Initial,
        user: null,
    },
    (builder) => {
        builder
            .addCase(requestCurrentUser, (state) => ({
                ...state,
                status: Status.Loading,
            }))
            .addCase(setCurrentUser, (state, action) => ({
                ...state,
                user: action.payload,
                status: Status.Loaded,
            }))
    }
)
