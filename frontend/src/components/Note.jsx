import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  const [color, setColor] = useState(note.color || "#007bff");
  const [showColors, setShowColors] = useState(false);
  const noteRef = useRef(null);
    useEffect(() => {
        setColor(note.color || "#007bff");
        }, [note.color]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
            setShowColors(false);
            }
        }

        if (showColors) {
            document.addEventListener("mousedown", handleClickOutside);
        }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showColors]);

  const colors = [
    "#eb4a26",
    "#0fab2c",
    "#284ef5",
    "#f7c80c",
    "#9747b7",
    "#2b2b2b",
    "#74cfeb"
  ];

  const handleColorChange = (newColor) => {
    setColor(newColor);
    api
      .patch(`/notes/update/${note.id}/`, { color: newColor })
      .catch(() => alert("Failed to update color"));
  };

  return (
    <div className="note-container" ref={noteRef}>
      <div
        className={`note-color-bar ${showColors ? "expanded" : ""}`}
        style={{ backgroundColor: color }}
        onClick={() => setShowColors(!showColors)}
      >
        {showColors && (
          <div className="color-menu">
            {colors.map((c) => (
              <span
                key={c}
                className="color-dot"
                style={{
                  backgroundColor: c,
                  border:
                    color === c ? "2px solid #000" : "1px solid #ccc"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorChange(c);
                  setShowColors(false);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>

      <button
        className="delete-button"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Note;
