import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import axios from "axios";

const useNotes = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<NoteModel[]>("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { notes, isLoading, error };
};

export default useNotes;
