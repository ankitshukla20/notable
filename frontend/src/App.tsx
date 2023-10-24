import { Container } from "react-bootstrap";
import NotesGrid from "./components/NotesGrid";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";

function App() {
  // const [showSignupModal, setShowSignupModal] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Container>
      <NotesGrid />

      {false && <SignupModal onDismiss={() => {}} />}

      {false && <LoginModal onDismiss={() => {}} />}
    </Container>
  );
}

export default App;
