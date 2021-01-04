import {
  Paper,
  PaperClassKey,
  StandardProps,
  Typography,
} from "@material-ui/core";
import * as React from "react";

interface EntryViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaperClassKey> {
  title: string;
  content: string;
}

function EntryView(props: EntryViewProps) {
  const { title, content, ...rest } = props;
  return (
    <Paper {...rest}>
      <Typography variant="h5">{title}</Typography>
      <Typography paragraph>{content}</Typography>
    </Paper>
  );
}

export default EntryView;
