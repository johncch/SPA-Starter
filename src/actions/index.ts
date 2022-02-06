import { AnyAction, createAction } from "@reduxjs/toolkit"
import { ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export const GET_ENTRIES = "GET_ENTRIES"
export const REQUEST_ENTRIES = "REQUEST_ENTRIES"
export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES"

/**
 * Basic Actions
 * These actions only set specific values inside the data store
 */

export const setInitComplete = createAction("InitComplete")
export const hasError = createAction<string>("HAS_ERROR")
export const clearError = createAction("CLEAR_ERROR")

/* Thunks
 * These are basically async actions that can be dispatched and chained
 * See https://github.com/reduxjs/redux-thunk for why this is useful
 *
 * Types:
 *   ThunkAction<ResultType, StateType, ExtraArgumentType, ActionType extends Action>
 */
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>

export * from "./user"
export * from "./entry"
export * from "./workspace"
