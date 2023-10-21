import "./App.css";
import { useEffect, useState } from "react";
import { Note } from "./models/note";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    axios
      .get<Note[]>("http://localhost:3000/api/notes")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);

  return (
    <>
      <h4>Hello World!</h4>
      {JSON.stringify(notes)}
    </>
  );
}

export default App;
