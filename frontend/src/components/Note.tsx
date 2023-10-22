import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import formatDate from "../util/formateDate";
import { useMemo } from "react";

interface Props {
  note: NoteModel;
}

const Note = ({ note }: Props) => {
  const footerText = useMemo(() => {
    if (note.updatedAt > note.createdAt)
      return `Updated: ${formatDate(note.updatedAt)}`;
    else return `Created: ${formatDate(note.createdAt)}`;
  }, [note.updatedAt, note.createdAt]);

  return (
    <Card className={styles.noteCard}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{footerText}</Card.Footer>
    </Card>
  );
};

export default Note;
