import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import NotesList from "./components/Notes/NotesList";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<NotesList />} />
        {/* <Route path="/notes/:id" element={<SingleNote />} /> */}
        {/* <Route path="/new" element={<NewNote />} /> */}
      </Routes>
    </div>
  );
}

export default App;
