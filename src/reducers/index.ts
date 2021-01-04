import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  requestWorkspaces,
  receiveWorkspaces,
  setCurrentWorkspaceID,
  receiveEntries,
  hasError,
  clearError,
  setCurrentUser,
  requestNewEntry,
  setNewEntry,
  setInitComplete,
} from "../actions";
import { Workspace, User, Entry } from "../store/types";

// Types

export interface RWorkspaceDir {
  [id: string]: Workspace;
}

export interface RWorkspaceMetadata {
  requesting: boolean;
}

export interface RDataDir {
  [id: string]: {
    pendingEntries: Entry[];
    entries: Entry[];
    lastUpdated: number;
  };
}

// Reducers

const currentWorkspaceID = createReducer<string>("", builder => {
  builder.addCase(setCurrentWorkspaceID, (_, action) => {
    return action.payload;
  });
});

const currentUser = createReducer<User>(null, builder => {
  builder.addCase(setCurrentUser, (_, action) => action.payload);
});

const workspaces = createReducer<RWorkspaceDir>(null, builder =>
  builder.addCase(receiveWorkspaces, (state, action) => {
    return Object.assign(
      {},
      state,
      action.payload.reduce(
        (map, workspace) => ((map[workspace.id] = workspace), map),
        <{ [id: string]: Workspace }>{}
      )
    );
  })
);

const workspacesMetadata = createReducer<RWorkspaceMetadata>(
  { requesting: false },
  builder =>
    builder
      .addCase(requestWorkspaces, () => {
        return { requesting: true };
      })
      .addCase(receiveWorkspaces, () => {
        return { requesting: false };
      })
);

const data = createReducer<RDataDir>({}, builder =>
  builder
    .addCase(receiveEntries, (state, action) => {
      const { workspaceId, entries } = action.payload;
      return Object.assign({}, state, {
        [workspaceId]: {
          entries: entries,
          lastUpdated: new Date().getTime()
        }
      });
    })
    .addCase(requestNewEntry, (state, action) => {
      const { requestId, workspaceId, entry } = action.payload;
      entry.id = requestId;
      let pendingEntries = state[workspaceId].pendingEntries || [];
      return Object.assign({}, state, {
        [workspaceId]: {
          ...state[workspaceId],
          pendingEntries: [entry, ...pendingEntries],
          lastUpdated: new Date().getTime()
        }
      });
    })
    .addCase(setNewEntry, (state, action) => {
      const { requestId, entry, workspaceId } = action.payload;
      let pendingEntries = state[workspaceId].pendingEntries;
      let entries = state[workspaceId].entries;
      let newPendingEntries = pendingEntries.filter(e => e.id != requestId);

      return Object.assign({}, state, {
        [workspaceId]: {
          pendingEntries: newPendingEntries,
          entries: [entry, ...entries],
          lastUpdated: new Date().getTime()
        }
      });
    })
);

const errorMessage = createReducer<string>("", builder =>
  builder
    .addCase(hasError, (state, action) => {
      return action.payload;
    })
    .addCase(clearError, () => {
      return "";
    })
);

const initialized = createReducer<boolean>(false, builder =>
  builder.addCase(setInitComplete, () => true)
);

const rootReducer = combineReducers({
  currentWorkspaceID,
  currentUser,
  workspaces,
  workspacesMetadata,
  data,
  errorMessage,
  initialized
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
