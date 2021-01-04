export interface User {
  token: string;
  id: string;
  url: string;
  fullname: string;
  email: string;
}

export interface Workspace {
  id: string;
  name: string;
}

export interface Entry {
  id: string;
  title: string;
  content: string;
  creatorId: string;
}