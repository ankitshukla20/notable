import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import NotesGrid from "./components/NotesGrid";
import SignupModal from "./components/SignupModal";
import { User } from "./models/user";
import apiClient from "./services/api-client";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // const [showSignupModal, setShowSignupModal] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    apiClient
      .get("/users/me")
      .then((res) => setLoggedInUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {loggedInUser && <NotesGrid />}

      {false && <SignupModal onDismiss={() => {}} />}

      {false && <LoginModal onDismiss={() => {}} />}
    </Container>
  );
}

export default App;
