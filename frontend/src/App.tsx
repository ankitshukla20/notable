import { Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import useNotes from "./hooks/useNotes";
import AddNote from "./components/AddNote";

function App() {
  const { notes } = useNotes();

  return (
    <Container>
      <AddNote />
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
