import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note, NoteInput } from "../models/note";
import apiClient from "../services/api-client";
import styles from "../styles/utils.module.css";
import AddNoteModal from "./AddNoteModal";

interface Props {
  onAdd: (note: Note) => void;
}

const AddNote = ({ onAdd }: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddNote = (noteInput: NoteInput) => {
    apiClient
      .post("/notes", noteInput)
      .then((res) => {
        onAdd(res.data);
      })
      .catch((err) => console.log(err));
  };

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
            handleAddNote(note);
            setShow(false);
          }}
          onDismiss={handleClose}
        />
      )}
    </>
  );
};

export default AddNote;
