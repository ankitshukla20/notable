import { Button } from "react-bootstrap";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";
import { Note as NoteType } from "../models/note";
import styles from "../styles/utils.module.css";

interface Props {
  onAdd: (note: NoteType) => void;
}

const AddNote = ({ onAdd }: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button className={`mb-4 ${styles.blockCenter}`} onClick={handleShow}>
        Add Note
      </Button>

      {show && (
        <AddNoteModal
          onSave={(note) => {
            setShow(false);
            onAdd(note);
          }}
          onDismiss={handleClose}
        />
      )}
    </>
  );
};

export default AddNote;
