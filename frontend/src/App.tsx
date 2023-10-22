import { Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import AddNote from "./components/AddNote";
import { useEffect, useState } from "react";
import axios from "axios";
import { Note as NoteType } from "./models/note";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<NoteType[]>("http://localhost:3000/api/notes")
      .then((res) => {
        console.log(res);
        setNotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
            <Note note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
