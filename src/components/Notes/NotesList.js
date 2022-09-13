import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";

import "./NoteList.css";
import { nanoid } from "nanoid";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let fetchNotes = JSON.parse(localStorage.getItem("notes"));

    if (fetchNotes) {
      setNotes(fetchNotes);
    }
  }, []);

  const addNoteHandler = () => {
    let newNotes = [
      { id: nanoid(), note: " ", date: new Date().toISOString() },
      ...notes,
    ];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const onDeleteNote = (noteToDelete) => {
    let newNotes = notes.filter((note) => note.id !== noteToDelete.id);

    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const changeHandler = (value, note) => {
    setNotes((notes) =>
      notes.map((n) => {
        if (n.id === note.id) {
          return { ...n, note: value };
        }
        return n;
      })
    );
  };

  const onStopEditing = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  return (
    <div className="notes-page">
      <div className="add-section">
        <Fab color="primary" aria-label="add" onClick={addNoteHandler}>
          <AddIcon />
        </Fab>
      </div>

      {notes.length === 0 ? (
        <h3 className="no-notes">No tienes notas</h3>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <Card
              key={note.id}
              note={note}
              deleteNote={onDeleteNote}
              onChange={changeHandler}
              saveChanges={onStopEditing}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
