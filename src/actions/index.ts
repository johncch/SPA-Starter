import { AnyAction, createAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { getEntries, getWorkspaces, getUser } from "../request";
import { AppDispatch } from "../store/configureStore";
import { Workspace, Entry, User } from "../store/types";
import { RootState } from "../reducers";

export const GET_ENTRIES = "GET_ENTRIES";
export const REQUEST_ENTRIES = "REQUEST_ENTRIES";
export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES";

/** 
 * Basic Actions
 * These actions only set specific values inside the data store
 */

export const setInitComplete = createAction("InitComplete");

export const requestWorkspaces = createAction("REQUEST_WORKSPACES");
export const receiveWorkspaces = createAction<Array<Workspace>>(
  "RECEIVE_WORKSPACES"
);
export const setCurrentWorkspaceID = createAction<string>(
  "SET_CUR_WORKSPACE_ID"
);

export const requestUser = createAction<string>("REQUEST_USER");

export const requestCurrentUser = createAction("REQUEST_CUR_USER");
export const setCurrentUser = createAction<User>("SET_CUR_USER");

export const requestEntries = createAction<string>("REQUEST_ENTRIES");
export const receiveEntries = createAction<{
  workspaceId: string;
  entries: Entry[];
}>("RECEIVE_ENTRIES");

export const requestNewEntry = createAction<{
  requestId: string;
  workspaceId: string;
  entry: Entry;
}>("REQUEST_NEW_ENTRY");
export const setNewEntry = createAction<{
  requestId: string;
  workspaceId: string;
  entry: Entry;
}>("SET_NEW_ENTRY");

export const hasError = createAction<string>("HAS_ERROR");
export const clearError = createAction("CLEAR_ERROR");

/* Thunks
 * These are basically async actions that can be dispatched and chained
 * See https://github.com/reduxjs/redux-thunk for why this is useful
 *
 * Types:
 *   ThunkAction<ResultType, StateType, ExtraArgumentType, ActionType extends Action>
 */

// This is a type alias to simplify the type declaration on the functions
type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

// Initialization Thunks

export function initializeWorkspace(): ThunkResult<Promise<void>> {
  return async (dispatch, getState): Promise<void> => {
    return Promise.all([
      dispatch(fetchCurrentUser()),
      dispatch(fetchWorkspaces()),
    ]).then(([]) => {
      const workspaceId = getState().currentWorkspaceID
      dispatch(fetchEntries(workspaceId));
    }).then(() => {
      dispatch(setInitComplete());
    });
  };
}

// User Thunks

export function fetchCurrentUserIfNeeded(): ThunkResult<Promise<void>> {
  return async (dispatch, getState): Promise<void> => {
    const state = getState();
    if (!state.currentUser) {
      return dispatch(fetchCurrentUser());
    }
  };
}

export function fetchCurrentUser(): ThunkResult<Promise<void>> {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(requestCurrentUser());
    return getUser()
      .then(userResp => {
        const user = userResp.user;
        dispatch(setCurrentUser(user));
      })
      .catch((error: Error) => {
        dispatch(hasError(error.message));
      });
  };
}

// Workspace Thunks

export function fetchWorkspacesIfNeeded(): ThunkResult<Promise<void>> {
  return async (dispatch: AppDispatch, getState): Promise<void> => {
    const state = getState();
    if (!state.workspaces && !state.workspacesMetadata.requesting) {
      dispatch(fetchWorkspaces());
    }
  };
}

export function fetchWorkspaces(): ThunkResult<Promise<void>> {
  return async (dispatch: AppDispatch) => {
    dispatch(requestWorkspaces());
    return getWorkspaces()
      .then(workspacesResp => {
        dispatch(receiveWorkspaces(workspacesResp.workspaces));
        dispatch(setCurrentWorkspaceID(workspacesResp.currentWorkspaceID));
      })
      .catch((error: Error) => {
        dispatch(hasError(error.message));
      });
  };
}

// Entry thunks

export function fetchEntries(workspaceId: string): ThunkResult<Promise<void>> {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(requestEntries(workspaceId));
    return getEntries({ workspaceId })
      .then(entriesResp => {
        const entries = entriesResp.entries;
        dispatch(receiveEntries({ workspaceId, entries }));
      })
      .catch((error: Error) => {
        dispatch(hasError(error.message));
      });
  };
}

export function fetchEntriesIfNeeded(
  workspaceId: string
): ThunkResult<Promise<void>> {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<void> => {
    const state = getState();
    let lastUpdated = state.data[workspaceId]?.lastUpdated;
    if (!lastUpdated || new Date().getTime() - lastUpdated >= 900) {
      return dispatch(fetchEntries(workspaceId));
    }
  };
}
