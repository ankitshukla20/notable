import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SignupCredentials } from "../models/user";
import styles from "../styles/utils.module.css";
import apiClient from "../services/api-client";

interface Props {
  onDismiss: () => void;
}

const SignupModal = ({ onDismiss }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>();

  const submit = (data: SignupCredentials) => {
    console.log(data);
    apiClient
      .post("/users/signup", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Welcome to Notes-App</Modal.Title>
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
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-mail"
              isInvalid={!!errors.email}
              {...register("email", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
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
            Sign-up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
