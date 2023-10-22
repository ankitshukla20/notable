import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
