import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { RootState } from "../reducers";
import { Entry } from "../store/types";
import EntryView from "../components/entryview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    entry: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

function Home(props: ConnectedProps<typeof connector>) {
  const { entries } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.header}>
        Home
      </Typography>
      {entries.map((entry, index) => (
        <EntryView
          key={index}
          title={entry.title}
          content={entry.content}
          className={classes.entry}
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
