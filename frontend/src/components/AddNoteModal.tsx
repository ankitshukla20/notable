import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../models/noteIntput";
import axios from "axios";

interface Props {
  onDismiss: () => void;
  onSave: (note: Note) => void;
}

const AddNoteModal = ({ onDismiss, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  const submit = (input: NoteInput) => {
    axios
      .post("http://localhost:3000/api/notes", input)
      .then((res) => {
        onSave(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>AddNote</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="add-note" onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Text"
              rows={5}
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button form="add-note" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteModal;
