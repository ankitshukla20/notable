import { Button } from "react-bootstrap";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";

const AddNote = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Button onClick={handleShow}>Add Note</Button>

      {show && <AddNoteModal onDismiss={handleClose} />}
    </>
  );
};

export default AddNote;
