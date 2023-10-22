import Note from "./components/Note";
import useNotes from "./hooks/useNotes";

function App() {
  const { notes } = useNotes();

  return (
    <>
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
}

export default App;
