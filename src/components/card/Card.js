import DeleteIcon from "@mui/icons-material/Delete";
import parseISO from "date-fns/parseISO";
import "./Card.css";
import { useEffect, useRef, useState } from "react";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { Fab } from "@mui/material";

const Card = ({ note, deleteNote, onChange, saveChanges }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const fecha = parseISO(note.date).toLocaleDateString();
  const time = parseISO(note.date).toLocaleTimeString();
  const inputRef = useRef();
  const [noteLength, setNoteLength] = useState(note.note.length);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deleteNote(note);
    setOpen(false);
  };

  const editHandler = () => {
    setEditing(true);
    // inputRef.current.focus();
  };

  const onBlurHandler = () => {
    setEditing(false);
    saveChanges();
  };

  const onChangeHandler = (e) => {
    onChange(e.target.value, note);
    setNoteLength(e.target.value.length);
  };

  return (
    <>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-content">
          {!editing && (
            <div onClick={editHandler} className="edit-box">
              <p>{note.note}</p>
            </div>
          )}
          {editing && (
            <>
              <textarea
                rows="8"
                cols="28"
                maxLength="150"
                ref={inputRef}
                value={note.note}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
              <p className="textAreaHint">{noteLength}/150</p>
            </>
          )}
        </div>
        <div className="card-footer">
          <div className="timestamp">
            <p>{fecha}</p>
            <p>{time}</p>
          </div>

          <Fab
            sx={{ transform: "scale(0.5)" }}
            color="error"
            aria-label="add"
            onClick={handleOpen}
          >
            <DeleteIcon />
          </Fab>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};

export default Card;
