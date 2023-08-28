import { List, Paper } from "@mui/material";
import { EntriesCard } from "./EntriesCard";
import { EntryStatus } from "@/interfaces";
import { FC, useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

import styles from "./EntriesList.module.css";
import { useRouter } from "next/router";

interface Props {
  status: EntryStatus;
}

export const EntriesList: FC<Props> = ({ status }) => {
  const { entries, updateEntry }    = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const allowDrop = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent) => {
    const id           = e.dataTransfer.getData("text");
    const entry        = entries.find(e => e._id === id)!;
          entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
          padding: "1px 5px",
        }}
      >
        <>
          <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.3s" }}>
            {entriesByStatus.map((entry, key) => (
              <EntriesCard key={entry._id} myKey={key} entry={entry} />
            ))}
          </List>
        </>
      </Paper>
    </div>
  );
};
