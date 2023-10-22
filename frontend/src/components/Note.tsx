import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import formatDate from "../util/formateDate";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const footerText =
    note.updatedAt > note.createdAt
      ? `Updated: ${formatDate(note.updatedAt)}`
      : `Created: ${formatDate(note.createdAt)}`;

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
