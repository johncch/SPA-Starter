import { createAction } from "@reduxjs/toolkit"
import { hasError, ThunkResult } from "."
import { AppDispatch } from "../app/store"
import { User } from "../app/types"
import { getUser } from "../request"

export const requestCurrentUser = createAction<void>("REQUEST_CUR_USER")
export const setCurrentUser = createAction<User>("SET_CUR_USER")

export function fetchCurrentUserIfNeeded(): ThunkResult<Promise<void>> {
    return async (dispatch, getState): Promise<void> => {
        const state = getState()
        if (state.user.status !== "loading") {
            return dispatch(fetchCurrentUser())
        }
    }
}

export function fetchCurrentUser(): ThunkResult<Promise<void>> {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(requestCurrentUser())
        try {
            const userResp = await getUser()
            const user = userResp.user
            dispatch(setCurrentUser(user))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(hasError(e.message))
            }
        }
    }
}
