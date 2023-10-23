import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteType } from "../models/note";
import formatDate from "../util/formateDate";
import { useMemo } from "react";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface Props {
  note: NoteType;
  onDelete: (noteId: string) => void;
  onCardClick: (note: NoteType) => void;
}

const Note = ({ note, onDelete, onCardClick }: Props) => {
  const footerText = useMemo(() => {
    if (note.updatedAt > note.createdAt)
      return `Updated: ${formatDate(note.updatedAt)}`;
    else return `Created: ${formatDate(note.createdAt)}`;
  }, [note.updatedAt, note.createdAt]);

  return (
    <Card
      className={styles.noteCard}
      onClick={() => {
        onCardClick(note);
      }}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {note.title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e: React.MouseEvent) => {
              onDelete(note._id);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{footerText}</Card.Footer>
    </Card>
  );
};

export default Note;
