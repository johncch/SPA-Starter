import { User, Workspace, Entry } from "../store/types";

// Param Types

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface GetEntriesParams {
  workspaceId: string;
}

// Response Types

export interface UserResponse {
  user: User;
}

export interface WorkspacesResponse {
  workspaces: Array<Workspace>;
  currentWorkspaceID: string;
}

export interface EntriesResponse {
  entries: Entry[];
}

export interface EntryResponse {
  entry: Entry;
}

export interface AuthResponse extends UserResponse, WorkspacesResponse {
  currentWorkspaceID: string;
}
