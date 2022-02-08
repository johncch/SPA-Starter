import mock from "."

mock.onPost("/auth/signin").reply(200, {
    user: {
        token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjdjNTQyNTRhLTkxMzQtNGZmMi1hYWY3LTRlMWMxODg5Zjg2MyIsIndzX2lkIjoiNzkxOTRkMTUtOTIyNi00NmFmLWE0OWQtMWE5ZTgyMjYxM2RmIiwiaWF0IjoxNjA5MTI4NTkzfQ.2mHwiyw2e3WHpd8dK96H03ficKRYPyy0UxI-8CRQYhQ",
        id: "7c54254a-9134-4ff2-aaf7-4e1c1889f863",
        url: "",
        fullname: "Test Person",
        email: "",
    },
    workspaces: [
        {
            id: "79194d15-9226-46af-a49d-1a9e822613df",
            name: "Test Workspace",
            created: "",
        },
    ],
    currentWorkspaceID: "79194d15-9226-46af-a49d-1a9e822613df",
})
