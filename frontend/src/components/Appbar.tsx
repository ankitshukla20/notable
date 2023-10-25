import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import { Link } from "react-router-dom";

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
          <Navbar.Brand as={Link} to="/">
            Notable
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav>
              <Nav.Link as={Link} to="/privacy">
                privacy
              </Nav.Link>
            </Nav>
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
                  <Button className="me-2" onClick={onSignupClick}>
                    Signup
                  </Button>
                  <Button onClick={onLoginClick}>Login</Button>
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
