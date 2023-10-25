import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Note, NoteInput } from "../models/note";
import apiClient from "../services/api-client";
import styles from "../styles/utils.module.css";
import AddNote from "./AddNote";
import EditNoteModal from "./EditNoteModal";
import NoteCard from "./NoteCard";

const NotesGrid = () => {
  // Define notes as state variable so we can update the array and rerender the component automatically when they change
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(false);

  // For Edit Note Modal
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  // To get all notes
  useEffect(() => {
    setLoading(true);
    apiClient
      .get<Note[]>("/notes")
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Make a delete note request and change notes state
  const handleDeleteNote = (noteId: string) => {
    apiClient
      .delete("/notes/" + noteId)
      .then(() => {
        setNotes((prevData) => prevData.filter((note) => note._id !== noteId));
      })
      .catch((err) => console.log(err));
  };

  // Make a delete request and change notes state
  const handleEditNote = (noteId: string, noteInput: NoteInput) => {
    apiClient
      .patch<Note>("/notes/" + noteId, noteInput)
      .then((res) => {
        const updatedNote = res.data;
        setNotes((prevData) =>
          prevData.map((note) =>
            note._id !== updatedNote._id ? note : updatedNote
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // To show and hide Edit Note Modal
  const handleCardClick = (note: Note) => {
    setNoteToEdit(note);
  };

  const dismissEditModal = () => setNoteToEdit(null);

  // Return
  if (isLoading) return <>Loading</>;

  return (
    <>
      <AddNote
        onAdd={(newNote) => {
          setNotes([...notes, newNote]);
        }}
      />

      {notes.length > 0 ? (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {notes?.map((note) => (
            <Col key={note._id}>
              <NoteCard
                note={note}
                onDelete={handleDeleteNote}
                onCardClick={handleCardClick}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className={`${styles.flexCenter} mt-5`}>
          <h5>You don't have notes yet.</h5>
        </div>
      )}

      {noteToEdit && (
        <EditNoteModal
          note={noteToEdit}
          onDismiss={dismissEditModal}
          onSaveChanges={(noteId, noteInput) => {
            handleEditNote(noteId, noteInput);
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesGrid;
