import { createReducer, combineReducers } from "@reduxjs/toolkit"
import { hasError, clearError } from "../actions"
import { entries } from "./entry"
import { workspaces } from "./workspace"
import { user } from "./user"

const errorMessage = createReducer<string>("", (builder) =>
    builder
        .addCase(hasError, (state, action) => {
            return action.payload
        })
        .addCase(clearError, () => {
            return ""
        })
)

const rootReducer = combineReducers({
    user,
    workspaces,
    entries,
    errorMessage,
})
export default rootReducer
