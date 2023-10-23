import { Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import AddNote from "./components/AddNote";
import { useEffect, useState } from "react";
import axios from "axios";
import { Note as NoteType } from "./models/note";
import EditNoteModal from "./components/EditNoteModal";
import { NoteInput } from "./models/noteIntput";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteType | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<NoteType[]>("http://localhost:3000/api/notes")
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
    axios
      .delete("http://localhost:3000/api/notes/" + noteId)
      .then(() => {
        setNotes((prevData) => prevData.filter((note) => note._id !== noteId));
      })
      .catch((err) => console.log(err));
  };

  const handleEditNote = (noteId: string, noteInput: NoteInput) => {
    axios
      .patch<NoteType>("http://localhost:3000/api/notes/" + noteId, noteInput)
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
  const handleCardClick = (note: NoteType) => {
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

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {notes?.map((note) => (
          <Col key={note._id}>
            <Note
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
            handleEditNote(noteId, noteInput);
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
