import { Col, Container, Row } from "react-bootstrap";
import NoteCard from "./components/NoteCard";
import AddNote from "./components/AddNote";
import { useEffect, useState } from "react";
import { Note } from "./models/note";
import EditNoteModal from "./components/EditNoteModal";
import { NoteInput } from "./models/note";
import apiClient from "./services/api-client";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

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

  const handleDeleteNote = (noteId: string) => {
    apiClient
      .delete("/notes/" + noteId)
      .then(() => {
        setNotes((prevData) => prevData.filter((note) => note._id !== noteId));
      })
      .catch((err) => console.log(err));
  };

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
    <Container>
      <AddNote
        onAdd={(newNote) => {
          setNotes([...notes, newNote]);
        }}
      />

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

      {noteToEdit && (
        <EditNoteModal
          note={noteToEdit}
          onDismiss={dismissEditModal}
          onSaveChanges={(noteId, noteInput) => {
            setNoteToEdit(null);
            handleEditNote(noteId, noteInput);
          }}
        />
      )}
    </Container>
  );
}

export default App;
