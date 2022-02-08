import * as React from "react"
import { connect, ConnectedProps } from "react-redux"
import Typography from "@mui/material/Typography"
import { RootState } from "../app/store"
import { Entry } from "../app/types"
import EntryView from "../components/entryview"
import { useAppDispatch } from "../app/hook"
import { fetchEntriesIfNeeded } from "../actions"

function Home(props: ConnectedProps<typeof connector>) {
    const { workspaceId, entries } = props
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (entries.length == 0 && workspaceId) {
            dispatch(fetchEntriesIfNeeded(workspaceId))
        }
    }, [entries])

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                sx={{
                    marginBottom: 2,
                }}
            >
                Home
            </Typography>
            {entries.map((entry, index) => (
                <EntryView
                    key={index}
                    title={entry.title}
                    content={entry.content}
                    sx={{
                        padding: 2,
                        marginBottom: 2,
                    }}
                />
            ))}
        </React.Fragment>
    )
}

function mapStateToProps(state: RootState) {
    const { entries, workspaces } = state
    let wsEntries: Entry[] = []
    if (entries && workspaces.activeId) {
        if (entries.workspaces[workspaces.activeId]) {
            wsEntries = entries.workspaces[workspaces.activeId].entries
        }
    }

    return {
        workspaceId: workspaces.activeId,
        entries: wsEntries,
    }
}
const connector = connect(mapStateToProps)
export default connector(Home)
