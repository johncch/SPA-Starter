import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import Typography from "@mui/material/Typography";
import { RootState } from "../reducers";
import { Entry } from "../store/types";
import EntryView from "../components/entryview";

function Home(props: ConnectedProps<typeof connector>) {
  const { entries } = props;

  return (
    <React.Fragment>
      <Typography variant="h4" sx={{
        marginBottom: 2,
      }}>
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
  );
}

function mapStateToProps(state: RootState) {
  const { data, currentWorkspaceID } = state;
  let entries: Entry[] = [];
  if (data && currentWorkspaceID) {
    if (data[currentWorkspaceID]) {
      entries = data[currentWorkspaceID].entries;
    }
  }

  return { entries };
}
const connector = connect(mapStateToProps);
export default connector(Home);
