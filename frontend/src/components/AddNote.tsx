import { Button } from "react-bootstrap";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";
import { Note } from "../models/note";
import styles from "../styles/utils.module.css";
import { NoteInput } from "../models/note";
import apiClient from "../services/api-client";

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
      <Button className={`mb-4 ${styles.blockCenter}`} onClick={handleShow}>
        Add Note
      </Button>

      {show && (
        <AddNoteModal
          onSave={(note) => {
            setShow(false);
            handleAddNote(note);
          }}
          onDismiss={handleClose}
        />
      )}
    </>
  );
};

export default AddNote;
