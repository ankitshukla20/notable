import { User } from "../models/user";
import utilsStyles from "../styles/utils.module.css";
import NotesGrid from "./NotesGrid";

interface Props {
  user: User | null;
}

const NotesPage = ({ user }: Props) => {
  return (
    <>
      {user ? (
        <NotesGrid />
      ) : (
        <div className={`${utilsStyles.flexCenter} mt-5`}>
          <h4>Please Log-in to see your notes.</h4>
        </div>
      )}
    </>
  );
};

export default NotesPage;
