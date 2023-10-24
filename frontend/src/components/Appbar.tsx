import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";

interface Props {
  user: User | null;
  onLogoutClick: () => void;
  onSignupClick: () => void;
  onLoginClick: () => void;
}

const Appbar = ({
  user,
  onLogoutClick,
  onSignupClick,
  onLoginClick,
}: Props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
        <Container>
          <Navbar.Brand>Notes App</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Navbar.Text className="me-2">
                    Signed in as: {user.username}
                  </Navbar.Text>
                  <Button onClick={onLogoutClick}>Logout</Button>
                </>
              ) : (
                <>
                  <Button onClick={onSignupClick}>Sign up</Button>
                  <Button onClick={onLoginClick}>Log in</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Appbar;
