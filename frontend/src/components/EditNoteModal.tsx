import { Button, Form, Modal } from "react-bootstrap";
import { Note as NoteType } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../models/noteIntput";

interface Props {
  note: NoteType;
  onDismiss: () => void;
  onSaveChanges: (noteId: string, note: NoteInput) => void;
}

const EditNoteModal = ({ note, onDismiss, onSaveChanges }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteType>({
    defaultValues: { title: note.title, text: note.text },
  });

  const submit = (data: NoteInput) => {
    onSaveChanges(note._id, data);
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="edit-note-form" onSubmit={handleSubmit(submit)}>
          <Form.Group>
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

          <Form.Group>
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
        <Button form="edit-note-form" type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;
