import "./Header.css";
import NoteIcon from "@mui/icons-material/TextSnippet";

const Header = () => {
  return (
    <div className="nav">
      <NoteIcon />
      <h1>Notes</h1>
      <NoteIcon />
    </div>
  );
};

export default Header;
