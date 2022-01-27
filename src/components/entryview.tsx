import * as React from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface EntryViewProps extends PaperProps {
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
