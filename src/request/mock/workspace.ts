import mock from "."

mock.onOptions("/v1/workspaces").reply(200, {})
mock.onGet("/v1/workspaces").reply(200, {
    workspaces: [
        {
            id: "79194d15-9226-46af-a49d-1a9e822613df",
            name: "Test Workspace",
            created: "",
        },
    ],
    currentWorkspaceID: "79194d15-9226-46af-a49d-1a9e822613df",
})
