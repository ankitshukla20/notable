import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import axios from "axios";

const useNotes = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<NoteModel[]>("http://localhost:3000/api/notes")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setLoading(false);
      });
  }, []);

  return { notes, isLoading };
};

export default useNotes;
