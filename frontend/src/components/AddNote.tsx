import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NoteInput } from "../models/note";
import styles from "../styles/utils.module.css";
import AddNoteModal from "./AddNoteModal";

interface Props {
  onAdd: (note: NoteInput) => void;
}

const AddNote = ({ onAdd }: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        className={`mb-4 ${styles.blockCenter} ${styles.flexCenter}`}
        onClick={handleShow}
      >
        <FaPlus />
        Add Note
      </Button>

      {show && (
        <AddNoteModal
          onSave={(note) => {
            onAdd(note);
            setShow(false);
          }}
          onDismiss={handleClose}
        />
      )}
    </>
  );
};

export default AddNote;
