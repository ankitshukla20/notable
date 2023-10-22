import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  onDismiss: () => void;
}

const AddNoteModal = ({ onDismiss }: Props) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>AddNote</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="add-note">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" placeholder="Text" rows={5} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button form="add-note" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteModal;
