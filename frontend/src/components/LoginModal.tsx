import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../models/user";
import styles from "../styles/utils.module.css";

interface Props {
  onDismiss: () => void;
  onLogin: (loginCredentials: LoginCredentials) => void;
}

const LoginModal = ({ onDismiss, onLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const submit = (data: LoginCredentials) => {
    onLogin(data);
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome back to Notable</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              isInvalid={!!errors.username}
              {...register("username", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={!!errors.password}
              {...register("password", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className={styles.width100}
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
