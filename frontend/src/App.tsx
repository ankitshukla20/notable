import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Appbar from "./components/Appbar";
import LoginModal from "./components/LoginModal";
import NotesGrid from "./components/NotesGrid";
import SignupModal from "./components/SignupModal";
import { LoginCredentials, SignupCredentials, User } from "./models/user";
import apiClient from "./services/api-client";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    apiClient
      .get("/users/me")
      .then((res) => {
        setLoggedInUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    apiClient
      .post("/users/logout")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setLoggedInUser(null);
  };

  const handleSignup = (userCredentials: SignupCredentials) => {
    apiClient
      .post("/users/signup", userCredentials)
      .then((res) => {
        setLoggedInUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (userCredentials: LoginCredentials) => {
    apiClient
      .post("/users/login", userCredentials)
      .then((res) => {
        setLoggedInUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Appbar
        user={loggedInUser}
        onLogoutClick={handleLogout}
        onSignupClick={() => {
          setShowSignupModal(true);
        }}
        onLoginClick={() => setShowLoginModal(true)}
      />
      <Container>
        {loggedInUser ? <NotesGrid /> : <h1>Log in Please</h1>}
      </Container>

      {showSignupModal && (
        <SignupModal
          onSignup={(signupCredentials) => {
            handleSignup(signupCredentials);
            setShowSignupModal(false);
          }}
          onDismiss={() => {
            setShowSignupModal(false);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onLogin={(loginCredentials) => {
            handleLogin(loginCredentials);
            setShowLoginModal(false);
          }}
          onDismiss={() => {
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
