import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  onDismiss: () => void;
}

const EditNoteModal = ({ onDismiss }: Props) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" placeholder="Text" rows={5} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;
